import { CREATE_GAME, CREATED_GAME } from '../actions/actionTypes';



const defaultState = {
  game_loading: false,
  game: {},
}



const gamesReducers = (state = defaultState, action) => {
    switch(action.type) {

        case CREATE_GAME:
            return {
                ...state,
                game_loading: true,
            }

        case CREATED_GAME:
          return {
              ...state,
              game_loading: false,
              game: action.payload,
          }

        default:
          return {
              ...state,
          }


    }
}

export default gamesReducers;
