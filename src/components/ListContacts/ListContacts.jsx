import { Component } from "react";
import propTypes from 'prop-types'
import { ContactsList } from "./ListContacts.styled";
import { Contact } from "components/Contact/Contact";

export class ListContacts extends Component{
    render() {
        const {contacts} = this.props;
        return(
            <ContactsList>
                {contacts.map(({name,number,id}) =>{
                    return(
                        <Contact
                        key={id}
                        id={id}
                        name={name}
                        number={number}
                        onDeleteContact={this.props.handleDelete}
                        />
                    );
                })}
            </ContactsList>
        )
    }
}


ListContacts.propTypes = {
    contacts: propTypes.arrayOf(
        propTypes.shape({
            name: propTypes.string.isRequired,
            number: propTypes.string.isRequired,
            id: propTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    handleDelete: propTypes.func.isRequired,
}