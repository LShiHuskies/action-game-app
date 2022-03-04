import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


import Form from './form';
import SignUpForm from './signUpForm';
import SignUpOrLogin from './signupOrLogin';


const DynamicForm = ({ match, authToken, history }) => {
    const isLogin = match && match.url === '/signup' ? false : true;
    const [login, setLogin] = useState(isLogin);
    const [accountText, setAccountText] = useState('Need to Create an Account?');
    const [buttonText, setButtonText] = useState('Sign Up');

    useEffect(() => {
        if (login) {
            setAccountText('Need to Create an Account?');
            setButtonText('Sign Up');
            history.push('/');
        } else {
            setAccountText('Already have an account?');
            setButtonText('Log In');
            history.push('/signup');
        }

        if (authToken && !!localStorage.getItem('token')) {
            history.push('/profile');
        }
    }, [login, authToken]);


    const handleLogin = () => {
        return login ? setLogin(false) : setLogin(true);
    }



    return (
        <div className="App">
            <header className="App-header">
            { login ? <Form history={history} /> : <SignUpForm history={history} /> }
                <SignUpOrLogin handleLogin={handleLogin} accountText={accountText} buttonText={buttonText} />
            </header>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        authToken: state.usersReducers.authToken
    }
}

export default connect(mapStateToProps)(DynamicForm);
