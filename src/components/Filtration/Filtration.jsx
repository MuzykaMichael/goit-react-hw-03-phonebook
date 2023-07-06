import { Component } from "react";
import propTypes from 'prop-types'
import { Input, Label } from "components/Form/Form.styled";

export class Filtration extends Component{
    handleChange = evt =>{
        const {value} = evt.target;
        this.props.onChange(value);
    };

    render() {
        const {filtration} = this.props;
        return(
            <>
            <Label>Find Contacts By Name
                <Input
                type="text"
                id="input-search"
                onChange={this.handleChange}
                name="filtration"
                value={filtration}
                />
            </Label>
            </>
        )
    }
}

Filtration.propTypes = {
    filtration: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
}