import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducer = (state = 0, action) => {
    switch(action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }
  



const rootReducer = combineReducers({
    reducer: reducer,
    form: formReducer
});

export default rootReducer;
