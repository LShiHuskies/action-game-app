import axios from 'axios';


import {
    CREATE_USER, CREATED_USER, GET_USER, GOTTEN_USER, LOGIN_FORM, SIGNUP_FORM, WRONG_INFO,
    UNDOWRONG_INFO, SEND_RECOVER, UNDO_SIGNUP_ERROR, GET_MAIN_ROOM_MESSAGES, SET_MAIN_ROOM_MESSAGE,
    ERROR_FETCHING_MAIN_MESSAGES, POST_MESSAGE, POSTED_MESSAGE,
} from './actionTypes';





export const createUser = dispatch => async data => {

    dispatch({
        type: CREATE_USER
    });

    let response;
    let err;
    try {
        response = await axios.post('http://localhost:3000/api/users', { user: data });

        // localStorage.setItem('token', response.data.token);
    } catch(error) {
        err = error;
        console.error(error);
    }
    if (response) {
        const { message } = response.data;
        dispatch({
            type: CREATED_USER,
            payload: { message, errorSignUp: !message ? response.data : false }
        });
    } else {
        dispatch({
            type: SIGNUP_FORM,
            payload: true
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

        if (!response.data.message) {
            localStorage.setItem('token', response.data.token);
        }
    } catch(error) {
        console.error(error);
    }

    if (response) {
        if (response.data && response.data.token) {
            dispatch({
                type: GOTTEN_USER,
                payload: response.data.user
            });
        } else {
            const { message } = response.data;
            dispatch({
                type: CREATED_USER,
                payload: { message }
            });
        }
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

export const sendRecover = dispatch => async email => {
    dispatch({
        type: SEND_RECOVER
    });

    let response;

    try {
        response = await axios.post('http://localhost:3000/recover', email);
    } catch (error) {
        console.error(error);
    }

    console.log('completed this step');
}

export const undoSignUpError = dispatch => () => {

    dispatch({
        type: UNDO_SIGNUP_ERROR
    });
}


export const getMainRoomMessages = dispatch => async (year, month, dayOfMonth) => {

    dispatch({
        type: GET_MAIN_ROOM_MESSAGES,
    });

    let response;

    try {
        response = await axios.get(`http://localhost:3000/main_room?year=${year}&month=${month}&day=${dayOfMonth}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

    } catch (error) {
        console.error(error);
    }

    if (response) {
        dispatch({
            type: SET_MAIN_ROOM_MESSAGE,
            payload: { messages: { [`${month}-${dayOfMonth}-${year}`]: response.data }, chatroom_id: response.data.find(mes => mes.chatroom_id) },
        });
    } else {
        dispatch({
            type: ERROR_FETCHING_MAIN_MESSAGES,
        });
    }

};

export const postMessage = dispatch => async ({ user, message, chatroom_id: { chatroom_id } }) => {

    dispatch({
      type: POST_MESSAGE,
    });

    let response;

    try {
        response = await axios.post('http://localhost:3000/api/messages', {
            message: { user_id: user.id, message, chatroom_id  }
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        });
    } catch (error) {
        console.error(error);
    }


    if (response) {
        dispatch({
          type: POSTED_MESSAGE,
          payload: response.data,
        })
    } else {

    }

}