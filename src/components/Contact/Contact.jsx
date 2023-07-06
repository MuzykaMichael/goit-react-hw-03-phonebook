import { Component } from "react";
import propTypes from 'prop-types'
import {ContactLi,BtnDelete} from './Contact.styled'


export class Contact extends Component{
    deleteContact = id => {
        this.props.onDeleteContact(id);
    };


render() {
    const {name,number,id} = this.props;
    return(
        <ContactLi>
            <p>
                {name}:{number}
            </p>
            <BtnDelete
            type="button"
            onClick={()=>{
                this.deleteContact(id);
            }}
            >Delete</BtnDelete>
        </ContactLi>
    )
}


}


Contact.propTypes = {
    id: propTypes.string.isRequired,
    name:propTypes.string.isRequired,
    number:propTypes.string.isRequired,
    onDeleteContact:propTypes.func.isRequired,
}