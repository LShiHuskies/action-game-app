
import moment from 'moment';
import { GET_MAIN_ROOM_MESSAGES, SET_MAIN_ROOM_MESSAGE, POST_MESSAGE, POSTED_MESSAGE } from '../actions/actionTypes';

const defaultState = {
    messages: {},
    main_messages_loading: false,
    chatroom_id: null,
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

      default:
        return state;
    }
};

export default messagesReducers;
