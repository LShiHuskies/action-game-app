import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, TextField, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Field, reduxForm } from 'redux-form';

import { getUser } from '../actions';



class EmailForm extends Component {

    state = {
        email: ''
    }

    componentDidMount() {
        if(!!localStorage.getItem('token')){
            this.props.history.push('/profile');
            let user = atob(localStorage.getItem('token').split('.')[1]);
            user = JSON.parse(user);

            if (!Object.keys(this.props.user).length) {
                // get user 
                this.props.getUser(user.id);
            }
        }
    }

    renderField = (some) => {
        const { label, required, input: { name, onBlur, onChange }, meta: { touched } } = some;
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
                    {...some}
                />
            </Fragment>
      )
    }

    handleChange = (event) => {

        this.setState({
            email: event.target.value
        });
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
                <h5 style={{ marginBottom: '0px', marginTop: '0px', width: '100%', marginRight: '280px' }} variant="contained"> Forgot Your Password? </h5>
                    <p style={{ fontSize: '13px', margin: '5px' }}>Provide your email address and we'll send you instructions to reset your password.</p>
                        <div className='login' style={{ paddingTop: '5px' }}>
                            <Field
                                label="Email"
                                name="email"
                                component={this.renderField}
                                onChange={this.handleChange}
                                value={this.state.email}
                                type="text"
                                required
                            />
                            <Button variant="contained" color="primary" style={{ float: 'left' }} startIcon={<ArrowBackIcon />}> Back </Button>
                            <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}
                            endIcon={<ArrowForwardIcon />}> Send </Button>
                        </div>
                </header>
            </div>
        )
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
        getUser: dispatch(getUser)
    }
}

const emailFormRedux = reduxForm({
    form: 'EmailForm',
    touchOnChange: true,
    touchOnBlur: true
})(EmailForm);

export default connect(mapStateToProps, mapDispatchtoProps)(emailFormRedux);