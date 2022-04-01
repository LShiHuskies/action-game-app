import React, { Component, Fragment } from 'react';
import moment from 'moment';

import { TextField, Button } from '@mui/material';
import { Field, reduxForm } from 'redux-form';



class ViewAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            firstname: props.first_name,
            lastname: props.last_name,
            email: props.email,
            created_at: moment(props.created_at).format('MM-DD-YYYY hh:mm:ss a'),
            activated_at: moment(props.activated_at).format('MM-DD-YYYY hh:mm:ss a'),
        }
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
                    InputProps={{
                      readOnly: true,
                    }}
                    {...props}
                    style={{ padding: '0px' }}
                />
            </Fragment>
      )
    }



    render() {
      return (
        <form>
        <h1 style={{color: "#282c34", textAlign: "center", marginTop: '0px', paddingTop: '15px', fontSize: '30px'}}>
            Account Information
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
          value={this.state.email}
          type="text"
          required
        />
        <Field
          label="Member Since"
          name="created_at"
          component={this.renderField}
          onChange={this.handleChange}
          value={moment(this.props.created_at).format('MM-DD-YYYY hh:mm:ss a')}
          type="text"
        />
        <Field
          label="Activated Since"
          name="activated_at"
          component={this.renderField}
          onChange={this.handleChange}
          value={moment(this.props.activated_at).format('MM-DD-YYYY hh:mm:ss a')}
          type="text"
        />
        <br></br>
        <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
          <Button id="demo" style={{ width: '70px', height: '40px', margin: '10px', marginTop: '10px' }}
            onClick={() => this.props.goBackToProfile()}>
            Back
          </Button>
          <Button id="submit" type="submit" variant="contained" color="primary" onClick={() => this.props.handleEditMode(true)}
            style={{ margin: '0px', marginRight: '10px', height: '40px', width: '70px', marginTop: '10px' }}>
            Edit
          </Button>
    </form>
      )
    }
}





const reForm = reduxForm({
    form: 'EditForm',
    touchOnChange: true,
    touchOnBlur: true
})(ViewAccount);


export default reForm;