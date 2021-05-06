import axios from 'axios';


import {
    CREATE_USER, CREATED_USER, GET_USER, GOTTEN_USER, LOGIN_FORM, SIGNUP_FORM, WRONG_INFO,
    UNDOWRONG_INFO
} from './actionTypes';





export const createUser = dispatch => async data => {

    dispatch({
        type: CREATE_USER
    });

    let response;
    let err;
    try {
        response = await axios.post('http://localhost:3000/api/users', { user: data });

        localStorage.setItem('token', response.data.token);
    } catch(error) {
        err = error;
        console.error(error);
    }
    if (response) {
        dispatch({
            type: CREATED_USER,
            payload: response.data
        });
    } else {
        dispatch({
            type: LOGIN_FORM,
            payload: err
        });
    }
}

export const getUser = dispatch => async id => {

    dispatch({
        type: GET_USER
    });

    let response;
    let err;

    try {
        response = await axios.get(`http://localhost:3000/api/users/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

    } catch(error) {
        err = error;
        console.error(error);
    }

    if (response) {
        dispatch({
            type: GOTTEN_USER,
            payload: response.data
        });
    } else {
        dispatch({
            type: SIGNUP_FORM,
            payload: err
        });
    }

}

export const postUser = dispatch => async credentials => {
    dispatch({
        type: GET_USER
    });

    let response;


    try {
        response = await axios.post('http://localhost:3000/login', credentials);

        localStorage.setItem('token', response.data.token);
    } catch(error) {
        console.error(error);
    }

    if (response) {
        dispatch({
            type: GOTTEN_USER,
            payload: response.data
        });
    } else {
        dispatch({
            type: WRONG_INFO
        });

        setTimeout(() => {
            dispatch({
                type: UNDOWRONG_INFO
            })
        }, 10000)
    }


}