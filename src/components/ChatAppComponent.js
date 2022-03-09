import React from 'react';



const ChatAppComponent = (props) => {
    return <React.Fragment>
       {props.messages.map(message => {
            if (message.user_id === props.user.id) {
                return (
                <div class="message-orange">
                  <p class="message-content">{message.message}</p>
                  <div class="message-timestamp-right"><strong>{message.user.username}</strong> {new Date(message.created_at).toLocaleTimeString()}</div>
                </div>
                )
            } else {
                return (
                <div class="message-blue">
                <p class="message-content">{message.message}</p>
                <div class="message-timestamp-left"><strong>{message.user.username}</strong> {new Date(message.created_at).toLocaleTimeString()}</div>
            </div>
            )}
        })}
    </React.Fragment>
};

export default ChatAppComponent;
