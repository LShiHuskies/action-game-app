import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, TextField } from '@material-ui/core';
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
                    <div className='login'>
                        <Field
                            label="Email"
                            name="email"
                            component={this.renderField}
                            onChange={this.handleChange}
                            value={this.state.email}
                            type="text"
                            required
                        />
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