import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducers from './usersReducer';
import messagesReducers from './messagesReducers';
import gamesReducers from './gamesReducer';

// const loader = (state = false, action) => {
//     switch(action.type) {
//       case 'SET_LOADING':
//         return true;
//       case 'UNSET_LOADING':
//         return false;
//       default:
//         return state;
//     }
//   }
  



const rootReducer = combineReducers({
    usersReducers,
    form: formReducer,
    messagesReducers,
    gamesReducers,
});

export default rootReducer;
