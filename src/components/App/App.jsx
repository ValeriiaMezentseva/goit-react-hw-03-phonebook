import { Component } from "react";
import { Container, Title } from "./App.styled";
import ContactsForm from "../Form";
import ContactsList from "../Contacts";
import Filter from "../Filter";


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isOpenContacts: false,
    isOpenFilter: false, 
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts); 

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }; 

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

   onSearch = e => {
    const value = e.target.value; 
    this.setState({filter: value})
  }
  
  submitHandler = data => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
    this.toggle('isOpenContacts');
  }


  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

    toggle = component => {
    this.setState(prevState => ({
      [component]: !prevState[component],
    }));
  };



  render() {
    const { contacts, filter, isOpenContacts, isOpenFilter } = this.state;
    const normalizedFilter = filter.toLowerCase(); 
    const filtredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    return (
      <Container> 
        <Title>Phonebook</Title>
        <ContactsForm addContact={this.submitHandler}
          contacts={contacts}
          toggle={this.toggle}
          isOpenContacts={isOpenContacts}
          isOpenFilter={isOpenFilter} /> 
        {isOpenFilter && (<Filter value={filter} onSearch={this.onSearch} />)}
        {isOpenContacts && (<ContactsList contacts={filtredContacts} toggle={this.toggle} onDeleteClick={this.deleteContact} />)}
      </Container>
    )
  }
}
