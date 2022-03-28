import axios from 'axios';


import {
    CREATE_USER, CREATED_USER, GET_USER, GOTTEN_USER, LOGIN_FORM, SIGNUP_FORM, WRONG_INFO,
    UNDOWRONG_INFO, SEND_RECOVER, UNDO_SIGNUP_ERROR, GET_MAIN_ROOM_MESSAGES, SET_MAIN_ROOM_MESSAGE,
    ERROR_FETCHING_MAIN_MESSAGES, POST_MESSAGE, POSTED_MESSAGE, CREATE_GAME, CREATED_GAME, ADD_ACCURACY,
    ADD_SCORE, ADD_TOTAL_ATTEMPTS, UPDATE_GAME, UPDATED_GAME, GET_TOP_SCORES, GOTTEN_TOP_SCORES, SET_PROFILE_GAME, GET_PROFILE_GAME,
    GOTTEN_PROFILE_GAME, UNDO_UPDATE_USER_ERROR, UPDATE_USER, UPDATED_USER, RESET_UPDATE_MESSAGE,
    WRONG_UPDATE_USER,
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


export const updateUser = dispatch => async (userObj, data) => {

    dispatch({
      type: UPDATE_USER,
    });

    let response;

    try {
      response = await axios.patch(`http://localhost:3000/api/users/${userObj.id}`, { user: data }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
    } catch(error) {
      console.error(error);
    }

    if (response) {
      dispatch({
        type: UPDATED_USER,
        payload: response.data,
      });
    } else {
      dispatch({
        type: WRONG_UPDATE_USER,
      });
    }


}



export const resetUpdateMessage = dispatch => () => {

    dispatch({
      type: RESET_UPDATE_MESSAGE,
    });

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


export const undoUpdateUserError = dispatch => () => {

    dispatch({
      type: UNDO_UPDATE_USER_ERROR,
    });

}

export const getMainRoomMessages = dispatch => async (year, month, dayOfMonth) => {

    dispatch({
        type: GET_MAIN_ROOM_MESSAGES,
    });

    let response;
    let chatroom_response;

    try {
        // response = await axios.get(`http://localhost:3000/main_room?year=${year}&month=${month}&day=${dayOfMonth}`, {
        //     headers: {
        //         'Authorization': localStorage.getItem('token')
        //     }
        // });
        response = await axios.get(`http://localhost:3000/main_room?year=${year}&month=${month}&day=${dayOfMonth}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

        if (!response.data.length) {
            chatroom_response = await axios.get('http://localhost:3000/main_room_chatroom', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            chatroom_response.data.chatroom_id = chatroom_response.data.id;
        }

    } catch (error) {
        console.error(error);
    }

    if (response && response.data.length) {
        dispatch({
            type: SET_MAIN_ROOM_MESSAGE,
            payload: { messages: { [`${month}-${dayOfMonth}-${year}`]: response.data }, chatroom_id: response.data.find(mes => mes.chatroom_id) },
        });
    } else if (chatroom_response) {
        dispatch({
            type: SET_MAIN_ROOM_MESSAGE,
            payload: { messages: { [`${month}-${dayOfMonth}-${year}`]: [] }, chatroom_id: chatroom_response.data },
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
            message: { user_id: user.id, message, chatroom_id: chatroom_id  }
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
        });
    } else {

    }

}

export const postedMessage = dispatch => (data) => {

    dispatch({
        type: POSTED_MESSAGE,
        payload: data,
    });

}


export const createGame = dispatch => async (data) => {
    dispatch({
      type: CREATE_GAME
    });

    let response;

    try {
        response = await axios.post('http://localhost:3000/api/games', {
            game: data
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        });

    } catch (error) {
        console.error(error);
    }
    dispatch({
      type: CREATED_GAME,
      payload: response.data,
    });
}


export const AddAccuracyLanded = dispatch => (num) => {

    dispatch({
      type: ADD_ACCURACY,
      payload: num,
    });

}

export const AddScore = dispatch => (num) => {

  dispatch({
    type: ADD_SCORE,
    payload: num,
  });

}

export const AddTotalShotAttempts = dispatch => (num) => {

    dispatch({
      type: ADD_TOTAL_ATTEMPTS,
      payload: num,
    });

}

export const updateGame = dispatch => async (game, dataObj) => {
    if (!game || !game.id) {
        return;
    }

    dispatch({
      type: UPDATE_GAME
    });
    let response;

    try {
        response = await axios.patch(`http://localhost:3000/api/games/${game.id}`, {
          game: dataObj,
        }, {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        });

    } catch (error) {
        console.error(error);
    }

   if (response && response.data) {
    dispatch({
      type: UPDATED_GAME,
      payload: response.data
    });
   } else {
       // error updating game
   }

}

export const getTopScores = dispatch => async (game_type, top = 10) => {

    dispatch({
      type: GET_TOP_SCORES,
    });

    let response;

    try {
        response = await axios.get(`http://localhost:3000/top_scores?game_type=${game_type}&top=${top}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        });

    } catch (error) {
        console.error(error);
    }

    if (response && response.data) {
      dispatch({
        type: GOTTEN_TOP_SCORES,
        payload: response.data,
      });
    }

}


export const setProfileGame = dispatch => (game) => {

    dispatch({
      type: SET_PROFILE_GAME,
      payload: game,
    });

}


export const getProfileGame = dispatch => async (id) => {

  dispatch({
    type: GET_PROFILE_GAME,
  });

  let response;

    try {
      response = await axios.get(`http://localhost:3000/api/games/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      });

    } catch (error) {
        console.error(error);
    }

    if (response && response.data) {
      dispatch({
        type: GOTTEN_PROFILE_GAME,
        payload: response.data
      });
    }

}