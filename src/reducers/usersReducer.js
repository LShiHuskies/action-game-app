import { CREATE_USER, CREATED_USER, GET_USER, GOTTEN_USER, WRONG_INFO, UNDOWRONG_INFO } from '../actions/actionTypes';


const defaultState = {
    loading: false,
    user: {},
    authToken: null,
    errorSignUp: false,
    errorLogin: false
}




const usersReducers = (state = defaultState, action) => {
    switch(action.type) {
      case CREATE_USER:
        return {
            ...state, loading: true
        }
      case CREATED_USER:
        return {
            ...state, loading: false,
            user: action.payload,
            authToken: action.payload.token
        }

      case GET_USER:
        return {
            ...state, loading: true
        }

      case GOTTEN_USER:
        return {
            ...state, loading: false,
            user: action.payload,
            authToken: localStorage.getItem('token')
        }

      case WRONG_INFO:
        return {
            ...state, loading: false,
            errorLogin: true
        }

      case UNDOWRONG_INFO:
        return {
            ...state, errorLogin: false
        }

      default:
        return state;
    }
}

export default usersReducers;