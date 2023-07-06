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
    contacts: [    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
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
    this.setState({contact})
  }

  componentDidUpdate = () =>{
    localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
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

