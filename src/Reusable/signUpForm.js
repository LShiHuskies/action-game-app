import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import { createUser, getUser, undoSignUpError } from '../actions';


class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: ''
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

    onSubmit = async (something) => {
        console.log(something);
        await this.props.createUser(this.state);
        if (!this.props.errorSignUp) {
            this.props.history.push('/activation-pending');
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
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
                    helperText={required ? `Please enter your ${name}` : `Please enter your ${label.toLowerCase()}`}
                    error={touched && !this.state[name] && required ? true : false}
                    onChange={e => onChange(e)}
                    onBlur={onBlur}
                    {...props}
                />
            </Fragment>
      )
    }

    render() {
        const { handleSubmit, loading, token, errorSignUp } = this.props;

        if (loading) {
            return <CircularProgress />
        }

        return (
            <div className='login'>
            {errorSignUp && errorSignUp.length ?
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <Stack justifyContent="center" alignItems="center" spacing={.5} style={{ width: '85%' }}>
            {errorSignUp.map(error => (
                <Alert severity="error" style={{ width: '90%' }}>
                    {error}
                </Alert>
            ))}
            </Stack>
            <CloseIcon onClick={() => this.props.undoSignUpError()} style={{ color: 'red', margin: 'auto' }}/>
             </div> : null }
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <h1 style={{color: "#282c34", textAlign: "center", marginTop: '0px', paddingTop: '15px'}}>
                        Create Account
                    </h1>
                    <Field 
                      type="text"
                      label="First Name"
                      name="first_name"
                      component={this.renderField}
                      onChange={this.handleChange}
                      value={this.state.firstname}
                    />
                    <Field
                      type="text"
                      label="Last Name"
                      name="last_name"
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
                    {/* <button id='demo' type="button" onClick={this.props.handleDemo}>Forgot Username or Password</button> */}
                    <button id='submit' type="submit">Submit</button>
                </form>
             </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducers.user,
        token: state.usersReducers.authToken,
        loading: state.usersReducers.loading,
        errorSignUp: state.usersReducers.errorSignUp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: dispatch(getUser),
        createUser: dispatch(createUser),
        undoSignUpError: dispatch(undoSignUpError),
    }
}


const reForm = reduxForm({
    form: 'SignUpForm',
    touchOnChange: true,
    touchOnBlur: true
})(SignUpForm);


export default connect(mapStateToProps, mapDispatchToProps)(reForm)