import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import ChatBubble from 'react-chat-bubble';
import { connect } from 'react-redux';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import Button from '@mui/material/Button';


import { getMainRoomMessages, postMessage } from '../actions';
import './chatApp.css';
import ChatAppComponent from '../components/ChatAppComponent';



const ChatApp = (props) => {
    const [messageState, setMessageState] = useState('');
    const [previousDayState, setPreviousDayDate] = useState(moment().subtract(1, 'days'));


    useEffect(() => {
        const getMainRoomMessages = async ([year, month, dayOfMonth]) => {
            await props.getMainRoomMessages(year, month, dayOfMonth);

            var elem = document.getElementsByClassName('container')[0];
            elem.scrollTop = elem.scrollHeight;
        }

        getMainRoomMessages([moment().format('YYYY'), moment().format('MM'), moment().format('DD')]);

    }, []);

    if (props.main_messages_loading) {
      return <div class="container">
        <CircularProgress />
      </div>
    }

    const handleEnterMessage = async (e) => {
        if (e.keyCode === 13 && messageState.trim()) {
            await props.postMessage({ user: props.user, message: messageState, chatroom_id: props.chatroom_id, });
            setMessageState('');
            var elem = document.getElementsByClassName('container')[0];
            elem.scrollTop = elem.scrollHeight;
        }
    }

    const handleChange = (e) => {
        setMessageState(e.target.value);
    }

    const getMainRoomMessagesPrevious = async (previousDay) => {
        await props.getMainRoomMessages(previousDay.format('YYYY'), previousDay.format('MM'), previousDay.format('DD'));

        setPreviousDayDate(moment(previousDayState).subtract(1, 'days'));
    }
    

    return <div class="container">
    <Button color="primary" style={{ padding: '0' }} onClick={() => getMainRoomMessagesPrevious(previousDayState)}>Previous</Button>
    <>
    {Object.keys(props.main_messages).sort().map(dayOfMessage =>
        <React.Fragment>
            <h3 style={{ textAlign: 'center' }}>{ moment(dayOfMessage).format('MMM Do YYYY') }</h3>
            <ChatAppComponent messages={props.main_messages[dayOfMessage]} user={props.user} />
        </React.Fragment>
    )}
    </>
    <TextareaAutosize
      class="textareautosize"
      aria-label="Enter Message"
      placeholder="Enter Message"
      value={messageState}
      onChange={handleChange}
      onKeyDown={handleEnterMessage}
      style={{ marginLeft: '18%', width: '80%', border: 'solid 1px black', height: '100px',
            font: "400 .9em 'Open Sans', sans-serif", padding: '10px', borderRadius: '20px' }}
    />
</div>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);