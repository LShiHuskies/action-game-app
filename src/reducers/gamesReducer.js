import { CREATE_GAME, CREATED_GAME, ADD_ACCURACY, ADD_SCORE,
        ADD_TOTAL_ATTEMPTS, UPDATE_GAME, UPDATED_GAME,
        GET_TOP_SCORES, GOTTEN_TOP_SCORES, SET_PROFILE_GAME,
        GET_PROFILE_GAME, GOTTEN_PROFILE_GAME,
    } from '../actions/actionTypes';



const defaultState = {
  game_loading: false,
  scores_loading: false,
  profile_game_loading: false,
  game: {},
  accuracyLanded: 0,
  score: 0,
  totalShotAttempts: 0,
  topScores: [],
  profile_game: {},
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

        case GET_TOP_SCORES:

          return {
            ...state,
            scores_loading: true,
          }

        case GOTTEN_TOP_SCORES:

          return {
            ...state,
            scores_loading: false,
            topScores: action.payload,
          }

        case SET_PROFILE_GAME:

          return {
            ...state,
            profile_game: action.payload,
          }

        case GET_PROFILE_GAME:

          return {
            ...state,
            profile_game_loading: true,

          }

        
        case GOTTEN_PROFILE_GAME:

          return {
            ...state,
            profile_game_loading: false,
            profile_game: action.payload,
          }

        default:
          return {
            ...state,
          }
    }
}

export default gamesReducers;
