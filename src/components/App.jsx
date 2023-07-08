import { Component } from "react";
import { Form } from "./Form/Form";
import { ListContacts } from "./ListContacts/ListContacts";
import { Filtration } from "./Filtration/Filtration";
import {Container,
  FirstTitle,
  SecondTitle,
  Breaker,
  Message,} from './App.styled';
// import { nanoid } from "nanoid";

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
    if (contact) {
      this.setState({contacts:[...contact]})
    }
  }

  // addContact = (text) =>{
  //   const contact ={
  //     id: nanoid(),
  //     text,
  //   };

  //   this.setState((prevState)=>({
  //     contacts: [...prevState.contacts,contact]
  //   }))

  // }

  // deleteContact = (id) =>{
  //   this.setState((prevState)=>({
  //     contacts: prevState.contacts.filter((contact)=> contact.id !== id)
  //   }))
  // }

  componentDidUpdate = (_,prevState) =>{
    const {contacts} = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts',JSON.stringify(contacts))
    }

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

