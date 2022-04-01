import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';


import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { ActionCable } from 'react-actioncable-provider';

import './ChatApp.css';
import ChatAppComponent from '../components/ChatAppComponent';

import { getVersusLobbyMessages, postVersusLobbyMessage, postedVersusLobbyMessage } from '../actions';







const VersusChatApp = (props) => {
    const [messageState, setMessageState] = useState('');
    const [previousDayState, setPreviousDayDate] = useState(moment().subtract(1, 'days'));


    useEffect(() => {
        const getVersusLobbyMessages = async ([year, month, dayOfMonth]) => {
            await props.getVersusLobbyMessages(year, month, dayOfMonth);

            scrollToTop();
        }

        getVersusLobbyMessages([moment().format('YYYY'), moment().format('MM'), moment().format('DD')]);

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
            await props.postVersusLobbyMessage({ user: props.user, message: messageState, chatroom_id: props.chatroom_id, });
            setMessageState('');
            scrollToTop();
        }
    }

    const  getVersusLobbyRoomMessagesPrevious = async (previousDay) => {
        await props.getVersusLobbyMessages(previousDay.format('YYYY'), previousDay.format('MM'), previousDay.format('DD'));

        setPreviousDayDate(moment(previousDayState).subtract(1, 'days'));
    }

    const handleChange = (e) => {
        setMessageState(e.target.value);
    }

    const handleMessageReceived = async (data) => {
        // if (data.user_id !== props.user.id) {

            await props.getVersusLobbyMessages(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            // scrollToTop();
        // }
    }

    return (
      <div className="container" style={{ height: '100%' }}>
        <ActionCable
          channel={{ channel: 'MessagesChannel' }}
          onReceived={handleMessageReceived}
        />
        <Button color="primary" style={{ padding: '0' }} onClick={() => getVersusLobbyRoomMessagesPrevious(previousDayState)}>Previous</Button>
        <>
          {Object.keys(props.versus_lobby_messages).sort().map(dayOfMessage =>
            <React.Fragment key={dayOfMessage}>
              <h3 style={{ textAlign: 'center' }}>{ moment(dayOfMessage, 'MM DD YYYY').format('MMM Do YYYY') }</h3>
              <ChatAppComponent messages={props.versus_lobby_messages[dayOfMessage]} user={props.user} />
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
            font: "400 .9em 'Open Sans', sans-serif", padding: '10px', borderRadius: '20px', marginBottom: '15%' }}
        />
      </div>
    )
}


const mapStateToProps = (state) => {

    return {
        main_messages_loading: state.messagesReducers.main_messages_loading,
        versus_lobby_messages: state.messagesReducers.versus_lobby_messages,
        chatroom_id: state.messagesReducers.versus_lobby_chatroom_id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVersusLobbyMessages: dispatch(getVersusLobbyMessages),
        postVersusLobbyMessage: dispatch(postVersusLobbyMessage),
        postedVersusLobbyMessage: dispatch(postedVersusLobbyMessage),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VersusChatApp);










