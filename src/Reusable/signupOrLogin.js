import React, { Component } from 'react';



class SignUpOrLogin extends Component {



    render() {
        return (
            <div id="overview">
                <div id="account_create"> Need to Create an Account? </div>
                <button id='SIGNUP' type="submit" onClick={console.log}> Sign Up
                </button>
            </div>
        )
    }


}

export default SignUpOrLogin;
