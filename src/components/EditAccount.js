import React, { Component, Fragment } from 'react';

import {TextField, Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';





class EditAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            firstname: props.first_name,
            lastname: props.last_name,
            email: props.email,
        }
    }

    handleReset = () => {
      this.setState({
        username: this.props.username,
        firstname: this.props.first_name,
        lastname: this.props.last_name,
        email: this.props.email,
      });
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        

        this.props.handleUpdate(this.state);
    }

    renderField = (props) => {
        const { label, required, input: { name, onBlur, onChange }, meta: { touched } } = props;
        return (
            <Fragment>
                <label className="form_label">{label}</label>
                <TextField
                    name={name}
                    variant="outlined"
                    id="standard-error-helper-text"
                    // helperText={required ? `Please enter your ${name}` : `Please enter your ${label.toLowerCase()}`}
                    error={touched && !this.state[name] && required ? true : false}
                    onChange={e => onChange(e)}
                    onBlur={onBlur}
                    value={this.state[name]}
                    {...props}
                    style={{ padding: '0px' }}
                />
            </Fragment>
      )
    }



    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <h1 style={{color: "#282c34", textAlign: "center", marginTop: '0px', paddingTop: '15px', fontSize: '30px'}}>
            Update Account
        </h1>
        <Field 
          type="text"
          label="First Name"
          name="firstname"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.firstname}
        />
        <Field
          type="text"
          label="Last Name"
          name="lastname"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.lastname}
        />
        <Field
          label="Username"
          name="username"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          required
        />
        <Field
          label="Email"
          name="email"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          required
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          required
        />
        <br></br>
        <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
          <Button id="demo" style={{ width: '70px', height: '40px', margin: '10px', marginTop: '10px' }}
            onClick={() => this.props.handleEditMode(false)}>
            Back
          </Button>
          <Button id="demo" style={{ width: '70px', height: '40px', margin: '0px', marginTop: '10px' }}
            onClick={this.handleReset}>
            Reset
          </Button>
          <Button id="submit" type="submit" variant="contained" color="primary"
            style={{ margin: '0px', marginRight: '10px', height: '40px', width: '70px', marginTop: '10px' }}>
            Update
          </Button>
    </form>
      )
    }
}





const reForm = reduxForm({
    form: 'EditForm',
    touchOnChange: true,
    touchOnBlur: true
})(EditAccount);


export default reForm;
