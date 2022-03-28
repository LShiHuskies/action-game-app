import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import ChatBubble from 'react-chat-bubble';
import { connect } from 'react-redux';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import Button from '@mui/material/Button';
import { ActionCable } from 'react-actioncable-provider';


import { getMainRoomMessages, postMessage, postedMessage } from '../actions';
import './ChatApp.css';
import ChatAppComponent from '../components/ChatAppComponent';



const ChatApp = (props) => {
    const [messageState, setMessageState] = useState('');
    const [previousDayState, setPreviousDayDate] = useState(moment().subtract(1, 'days'));


    useEffect(() => {
        const getMainRoomMessages = async ([year, month, dayOfMonth]) => {
            await props.getMainRoomMessages(year, month, dayOfMonth);

            scrollToTop();
        }

        getMainRoomMessages([moment().format('YYYY'), moment().format('MM'), moment().format('DD')]);

    }, []);

    const scrollToTop = () => {
        let elem = document.getElementsByClassName('container')[0];
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    }

    // if (props.main_messages_loading) {
    //   return <div className="container">
    //     <CircularProgress />
    //   </div>
    // }

    const handleEnterMessage = async (e) => {
        if (e.keyCode === 13 && messageState.trim()) {
            await props.postMessage({ user: props.user, message: messageState, chatroom_id: props.chatroom_id, });
            setMessageState('');
            scrollToTop();
        }
    }

    const handleChange = (e) => {
        setMessageState(e.target.value);
    }

    const getMainRoomMessagesPrevious = async (previousDay) => {
        await props.getMainRoomMessages(previousDay.format('YYYY'), previousDay.format('MM'), previousDay.format('DD'));

        setPreviousDayDate(moment(previousDayState).subtract(1, 'days'));
    }

    const handleMessageReceived = async (data) => {
        // if (data.user_id !== props.user.id) {

            await props.getMainRoomMessages(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            // scrollToTop();
        // }
    }

    return (
      <div className="container">
        <ActionCable
          channel={{ channel: 'MessagesChannel' }}
          onReceived={handleMessageReceived}
        />
        <Button color="primary" style={{ padding: '0' }} onClick={() => getMainRoomMessagesPrevious(previousDayState)}>Previous</Button>
        <>
          {Object.keys(props.main_messages).sort().map(dayOfMessage =>
            <React.Fragment key={dayOfMessage}>
              <h3 style={{ textAlign: 'center' }}>{ moment(dayOfMessage, 'MM DD YYYY').format('MMM Do YYYY') }</h3>
              <ChatAppComponent messages={props.main_messages[dayOfMessage]} user={props.user} />
            </React.Fragment>
          )}
        </>
        <TextareaAutosize
          className="textareautosize"
          aria-label="Enter Message"
          placeholder={"Enter Message"}
          value={messageState}
          onChange={handleChange}
          onKeyDown={handleEnterMessage}
          style={{ marginLeft: '18%', width: '80%', border: 'solid 1px black', height: '100px',
            font: "400 .9em 'Open Sans', sans-serif", padding: '10px', borderRadius: '20px',
            marginTop: `${ 24 - Object.values(props.main_messages).flat().length * 12 >= 0 ? 24 - Object.values(props.main_messages).flat().length * 12 : 0}%` }}
        />
      </div>
    )
}


const mapStateToProps = (state) => {

    return {
        user: state.usersReducers.user,
        main_messages_loading: state.messagesReducers.main_messages_loading,
        main_messages: state.messagesReducers.messages,
        chatroom_id: state.messagesReducers.chatroom_id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMainRoomMessages: dispatch(getMainRoomMessages),
        postMessage: dispatch(postMessage),
        postedMessage: dispatch(postedMessage),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);