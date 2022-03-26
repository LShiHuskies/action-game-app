import { CREATE_GAME, CREATED_GAME, ADD_ACCURACY, ADD_SCORE, ADD_TOTAL_ATTEMPTS, UPDATE_GAME, UPDATED_GAME } from '../actions/actionTypes';



const defaultState = {
  game_loading: false,
  game: {},
  accuracyLanded: 0,
  score: 0,
  totalShotAttempts: 0,
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
              score: 0,
              accuracyLanded: 0,
              totalShotAttempts: 0,
          }

        case ADD_ACCURACY:
          if (state.accuracyLanded === action.payload) {
              return {
                  ...state,
              }
          }
          return {
              ...state,
              accuracyLanded: action.payload
          }

        case ADD_SCORE:

          return {
            ...state,
            score: state.score += action.payload
          }

        case ADD_TOTAL_ATTEMPTS:

          return {
            ...state,
            totalShotAttempts: action.payload,
          }

        case UPDATE_GAME:

          return {
            ...state,
            game_loading: true,
          }

        case UPDATED_GAME:

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
