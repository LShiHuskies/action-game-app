
import moment from 'moment';
import { GET_MAIN_ROOM_MESSAGES, SET_MAIN_ROOM_MESSAGE, POST_MESSAGE, POSTED_MESSAGE,
    GET_VERSUS_LOBBY_MESSAGES, SET_VERSUS_LOBBY_MESSAGE, ERROR_FETCHING_LOBBY_MESSAGES,
    POST_VERSUS_LOBBY_MESSAGE, POSTED_VERSUS_LOBBY_MESSAGE,
 } from '../actions/actionTypes';

const defaultState = {
    messages: {},
    main_messages_loading: false,
    chatroom_id: null,
    versus_lobby_messages_loading: false,
    versus_lobby_chatroom_id: null,
    versus_lobby_messages: {},
}

const messagesReducers = (state = defaultState, action) => {
    switch(action.type) {
      case GET_MAIN_ROOM_MESSAGES:
        return {
            ...state, main_messages_loading: true
        };

      case SET_MAIN_ROOM_MESSAGE:
        const { messages, chatroom_id } = action.payload;

        return {
            ...state,
            main_messages_loading: false,
            messages: { ...state.messages, ...messages },
            chatroom_id,
        }

      case POST_MESSAGE:

        return {
            ...state,
            main_messages_loading: true,
        }


      case POST_VERSUS_LOBBY_MESSAGE:

        return {
          ...state,
          versus_lobby_messages_loading: true,
        }

      case POSTED_VERSUS_LOBBY_MESSAGE:
        const lobby_date = `${moment().format('MM')}-${moment().format('DD')}-${moment().format('YYYY')}`;

        return {
          ...state,
          versus_lobby_messages_loading: false,
          versus_lobby_messages: {
            ...state.versus_lobby_messages,
            [lobby_date]: [ ...state.versus_lobby_messages[lobby_date], action.payload ],
          }
        }

      case POSTED_MESSAGE:
        const date = `${moment().format('MM')}-${moment().format('DD')}-${moment().format('YYYY')}`;

        return {
            ...state,
            main_messages_loading: false,
            messages: {
                ...state.messages,
                [date]:
                [...state.messages[date], action.payload ],
            },
        }

      case GET_VERSUS_LOBBY_MESSAGES:

        return {
          ...state,
          versus_lobby_messages_loading: true,
        }


      case SET_VERSUS_LOBBY_MESSAGE:

      const { versus_lobby_messages, versus_lobby_chatroom_id } = action.payload;

        return {
          ...state,
          versus_lobby_messages_loading: false,
          versus_lobby_messages: { ...state.versus_lobby_messages, ...versus_lobby_messages },
          versus_lobby_chatroom_id,
        }

      default:
        return state;
    }
};

export default messagesReducers;
