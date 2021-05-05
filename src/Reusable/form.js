import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CircularProgress, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { getUser, postUser } from '../actions';


class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        if(!!localStorage.getItem('token')){
            let user = atob(localStorage.getItem('token').split('.')[1]);
            user = JSON.parse(user);

            if (!Object.keys(this.props.user).length) {
                this.props.getUser(user.id);
            }
        }
    }

    onSubmit = (credentials) => {
        this.props.postUser(credentials);
    }

    handleChange = (event) => {
        const { name } = event.target;

        this.setState({
            [name]: event.target.value
        });
    }

    renderField = (props) => {
        const { label, input: { name, onBlur, onChange }, meta: { touched } } = props;
        return (
        <Fragment>
          <label className="form_label">{label}</label>
          <TextField
              name={name}
              variant="outlined"
              id="standard-error-helper-text"
              helperText={`Please enter your ${name}`}
              error={touched && !this.state[name] ? true : false}
              onChange={e => onChange(e)}
              onBlur={onBlur}
              {...props}
          />
        </Fragment>
      )
    }

    render() {
        const { handleSubmit, loading, errorLogin } = this.props;

        if (loading) {
            return (
                <CircularProgress />
            )
        }

        return (
            <div className='login'>
                { errorLogin ? <Alert severity="error">Invalid Credentials Entered</Alert> : '' } 
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <h1 style={{color: "#282c34", textAlign: "center", marginTop: '0px', paddingTop: '15px'}}>
                        Please Sign In
                    </h1>
                    <Field
                      label="Username"
                      name="username"
                      component={this.renderField}
                      onChange={this.handleChange}
                      value={this.state.username}
                      type="text"
                    />
                    <Field
                      label="Password"
                      name="password"
                      component={this.renderField}
                      onChange={this.handleChange}
                      value={this.state.password}
                      type="password"
                    />
                    <br></br>
                    <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
                    <button id='demo' type="button" onClick={this.props.handleDemo}>Forgot Username or Password</button>
                    <button id='submit' type="submit">Submit</button>
                </form>
             </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.usersReducers.user,
        authToken: state.usersReducers.user,
        loading: state.usersReducers.loading,
        errorLogin: state.usersReducers.errorLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postUser: dispatch(postUser),
        getUser: dispatch(getUser)
    }
}

const form = reduxForm({
    form: 'LoginForm',
    touchOnChange: true,
    touchOnBlur: true
})(Form);

export default connect(mapStateToProps, mapDispatchToProps)(form);
