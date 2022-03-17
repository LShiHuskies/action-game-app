import React from 'react';


const ChatAppMessage = ({ messageObj, userObj }) => (
  <div className={messageObj.user_id === userObj.id ? "message-orange" : "message-blue"} key={messageObj.created_at}>
    <p className="message-content">{messageObj.message}</p>
    <div className={messageObj.user_id === userObj.id ? "message-timestamp-right" : "message-timestamp-left" }><strong>{messageObj.user.username}</strong> {new Date(messageObj.created_at).toLocaleTimeString()}</div>
  </div>
);

export default ChatAppMessage;
