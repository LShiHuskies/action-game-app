import { CREATE_GAME, CREATED_GAME, ADD_ACCURACY, ADD_SCORE,
        ADD_TOTAL_ATTEMPTS, UPDATE_GAME, UPDATED_GAME,
        GET_TOP_SCORES, GOTTEN_TOP_SCORES, SET_PROFILE_GAME,
        GET_PROFILE_GAME, GOTTEN_PROFILE_GAME, GET_AVAILABLE_VERSUS_GAMES,
        GOTTEN_AVAILABLE_VERSUS_GAMES, PLAY_UPDATE, PLAY_UPDATED, FOUND_GAME,
        SEARCH_GAME, GET_USER_GAME, GOTTEN_USER_GAME,
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
  versus_games_loading: false,
  available_versus_games: [],
  user_game: {},
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

        case GET_AVAILABLE_VERSUS_GAMES:

          return {
            ...state,
            versus_games_loading: true,
          }


        case GOTTEN_AVAILABLE_VERSUS_GAMES:

          return {
            ...state,
            versus_games_loading: false,
            available_versus_games: action.payload,
          }

        case PLAY_UPDATE:

          return {
            ...state,
            versus_games_loading: true,
          }

        case PLAY_UPDATED:

          return {
            ...state,
            versus_games_loading: false,
            user_game: action.payload,
          }

        case GET_USER_GAME:

          return {
            ...state,
            versus_games_loading: true,
          }

        case GOTTEN_USER_GAME:
        
          return {
            ...state,
            versus_games_loading: false,
            user_game: action.payload,
          }

        case SEARCH_GAME:

          return {
            ...state,
            versus_games_loading: true,
          }

        case FOUND_GAME:

          return {
            ...state,
            versus_games_loading: false,
            game: action.payload,
          }

        default:
          return {
            ...state,
          }
    }
}

export default gamesReducers;
