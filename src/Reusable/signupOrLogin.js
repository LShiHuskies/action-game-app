import React from 'react';

const SignUpOrLogin = ({ handleLogin, accountText, buttonText }) => {
    return (
        <div id="overview">
            <div id="account_create"> {accountText} </div>
            <button id='SIGNUP' type="submit" onClick={handleLogin}> {buttonText} </button>
        </div>
    )
}

export default SignUpOrLogin;
