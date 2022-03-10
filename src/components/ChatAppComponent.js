import React from 'react';



const ChatAppComponent = (props) => {
    return <React.Fragment>
       {props.messages.map(message => {
            if (message.user_id === props.user.id) {
                return (
                <div className="message-orange" key={message.created_at}>
                  <p className="message-content">{message.message}</p>
                  <div className="message-timestamp-right"><strong>{message.user.username}</strong> {new Date(message.created_at).toLocaleTimeString()}</div>
                </div>
                )
            } else {
                return (
                <div className="message-blue" key={message.created_at}>
                <p className="message-content">{message.message}</p>
                <div className="message-timestamp-left"><strong>{message.user.username}</strong> {new Date(message.created_at).toLocaleTimeString()}</div>
            </div>
            )}
        })}
    </React.Fragment>
};

export default ChatAppComponent;
