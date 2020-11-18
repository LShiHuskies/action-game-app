import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';



class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onSubmit = (something) => {
        console.log(something);
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
        const { handleSubmit } = this.props;
        return (
            <div className='login'>
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


export default reduxForm({
    form: 'LoginForm',
    touchOnChange: true,
    touchOnBlur: true
})(Form);
