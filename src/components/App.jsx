import { Component } from "react";
import { Form } from "./Form/Form";
import { ListContacts } from "./ListContacts/ListContacts";
import { Filtration } from "./Filtration/Filtration";
import {Container,
  FirstTitle,
  SecondTitle,
  Breaker,
  Message,} from './App.styled'

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }
  
  formSubmitHandle = newContact =>{
    const sameContact = this.state.contacts.find(
      ({name})=>name.toLowerCase()===newContact.name.toLowerCase()
    );
    if (sameContact) {
      alert(`${newContact.name} is already exists.`)
      return
    }
    this.setState(prevState=>{
      return{ contacts: [...prevState.contacts,newContact]}
    });
  };
  
  filterHandle = nameQuery => {
    this.setState({filter:nameQuery});
  };

  contactsDeleteHandler = idToDelete => {
    this.setState(prevState=>{
      const updContactsArr = [...prevState.contacts].filter(
        ({id}) => id!==idToDelete
      );
      return {contacts:updContactsArr};

    });
  }

  componentDidMount = () =>{
    const contact = JSON.parse(localStorage.getItem('contacts'));
    console.log(contact)
    if (this.state.contacts === []) {
      this.setState({contacts:[...contact]})
    }
  }

  componentDidUpdate = (prevProps,prevState) =>{
    localStorage.setItem('contacts',JSON.stringify([...prevState.contacts]))

  }



  render() {
    const filteredContacts = this.state.contacts.filter(({name})=>{
      return name.toLowerCase().includes(this.state.filter.toLowerCase())
    });

    return(
      <Container>
        <FirstTitle>Phonebook</FirstTitle>
        <Form onSubmit={this.formSubmitHandle}/>
        <SecondTitle>Contacts</SecondTitle>
        <Breaker>
          {this.state.contacts.length > 0 ? (
            <>
              <Filtration
              filtration={this.state.filter}
              onChange={this.filterHandle}
              />
              {filteredContacts.length > 0?(
                <ListContacts
                contacts={filteredContacts}
                handleDelete={this.contactsDeleteHandler}
                />
            
          ):(
            <Message>
              Sorry, we didn't find any contacts matching your query
            </Message>
          )}
          </>
          ):(
            <Message>You don't have any contacts yet</Message>
          )}
        </Breaker>
      </Container>
    );
  }
};

