import React, { Fragment } from 'react';
import ChatAppMessage from './ChatAppMessage';


const ChatAppComponent = ({ messages, user }) => (
    <Fragment>
       {messages.map(message => <ChatAppMessage messageObj={message} userObj={user} />)}
    </Fragment>
);


export default ChatAppComponent;

//    const { user_id, created_at } = message;
//     if (user_id === user.id) {
//         return (
//         <div className="message-orange" key={created_at}>
//           <p className="message-content">{message.message}</p>
//           <div className="message-timestamp-right"><strong>{message.user.username}</strong> {new Date(created_at).toLocaleTimeString()}</div>
//         </div>
//         )
//     } else {
//         return (
//         <div className="message-blue" key={created_at}>
//         <p className="message-content">{message.message}</p>
//         <div className="message-timestamp-left"><strong>{message.user.username}</strong> {new Date(created_at).toLocaleTimeString()}</div>
//     </div>
//     )}
