import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, TextField, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Field, reduxForm } from 'redux-form';

import { getUser, sendRecover } from '../actions';


class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }
  }

  componentDidMount() {
    if(!!localStorage.getItem('token')) {
        this.props.history.push('/profile');
        let user = atob(localStorage.getItem('token').split('.')[1]);
        user = JSON.parse(user);

        if (!Object.keys(this.props.user).length) {
            // get user 
            this.props.getUser(user.id);
        }
    }
  }


  renderField = (event) => {
    const { label, required, input: { name, onBlur, onChange }, meta: { touched } } = event;
    return (
        <Fragment>
            <label className="form_label">{label}</label>
            <TextField
                name={name}
                variant="outlined"
                id="standard-error-helper-text"
                helperText={required ? `Please enter your ${name}` : `Please enter your ${label.toLowerCase()}`}
                error={touched && !this.state.email && required ? true : false}
                onChange={onChange}
                onBlur={onBlur}
                {...event}
            />
        </Fragment>
    )
  }

  handleChange = (event) => {
    // setEmailState(event.target.value);
    this.setState({
        email: event.target.value,
    });
  }


  sendEmail = (e) => {
    e.preventDefault();

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.state.email).toLowerCase())) {
        this.props.sendRecover({email: this.state.email});
    } else {
        // this is where we want to alert a professional message
    }
  }

  goBack = () => {
    this.props.history.push('/');
  }


  render() {
    if (this.props.loading) {
        return (
            <div className="App">
                <header className="App-header" style={{ backgroundColor: 'white' }}>
                    <CircularProgress />
                </header>
            </div>
        )
    }

    return (
      <div className="App">
        <header className="App-header">
          <h5 style={{ marginBottom: '0px', marginTop: '0px', width: '100%', marginRight: '150px' }} variant="contained"> Forgot Your Username or Password? </h5>
          <p style={{ fontSize: '13px', margin: '5px', marginLeft: '0px' }}>Provide your email address and we'll send you instructions to reset your account.</p>
          <div className='login' style={{ paddingTop: '10px' }}>
            <form onSubmit={this.sendEmail}>
              <Field
                label="Email"
                name="email"
                component={this.renderField}
                onChange={this.handleChange}
                value={this.state.email}
                type="text"
                required
              />
              <Button id="demo" style={{ width: '100px', height: '40px', margin: '10px', marginTop: '0px' }}
                startIcon={<ArrowBackIcon />} onClick={this.goBack}>
                Back
              </Button>
              <Button id="submit" type="submit" variant="contained" color="primary" style={{ margin: '0px', marginRight: '10px', height: '40px', width: '100px' }}
                endIcon={<ArrowForwardIcon />}>
                Send
              </Button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.usersReducers.loading,
    user: state.usersReducers.user
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getUser: dispatch(getUser),
    sendRecover: dispatch(sendRecover),
  }
}

const emailFormRedux = reduxForm({
  form: 'EmailForm',
  touchOnChange: true,
  touchOnBlur: true
})(EmailForm);

export default connect(mapStateToProps, mapDispatchtoProps)(emailFormRedux);