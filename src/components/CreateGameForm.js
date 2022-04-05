import React, { Component, Fragment } from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button } from '@mui/material';
import { Field, reduxForm } from 'redux-form';





class CreateGameForm extends Component {

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

    // handleSubmit = (e) => {
    //     e.preventDefault();

    //     this.props.handleUpdate(this.state);
    // }

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
                    style={{ padding: '0px', margin: '0 20px 20px' }}
                />
            </Fragment>
      )
    }
  render() {

    if (this.props.loading) {
      return <CircularProgress />
    }


    return (
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state)} style={{ width: '100%' }}>
        <h1 style={{color: "#282c34", textAlign: "center", marginTop: '20.1px', paddingTop: '0px', fontSize: '30px'}}>
            Versus Game
        </h1>
        <Field 
          type="text"
          label="Name"
          name="name"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.name}
          required
        />
        <Field
          label="Second Player Username"
          name="username"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          required
        />
        <Field
          label="Second Player Email"
          name="email"
          component={this.renderField}
          onChange={this.handleChange}
          value={this.state.email}
          type="text"
          required
        />
        <br></br>
        <p id='line' style={{marginTop: '0px', maxWidth: '408px', marginLeft: '20px', marginRight: '20px'}} >_______________________________________</p>
          <Button id="submit" type="submit" variant="contained" color="primary"
            style={{ margin: '20px 20px 20px 0px', height: '40px', width: '70px' }}>
            Create
          </Button>
    </form>
    )
  }
}

const reForm = reduxForm({
    form: 'CreateGameForm',
    touchOnChange: true,
    touchOnBlur: true
})(CreateGameForm);


export default reForm;
