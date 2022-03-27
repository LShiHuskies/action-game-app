import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// import ChatBubble from 'react-chat-bubble';

import { getUser } from '../actions';

import ButtonAppBar from '../components/ButtonAppBar';
import ChatApp from './chatApp';
import ListOfGames from './ListOfGames';
import HighScoresList from './HighScoresList';



const Profile = (props) => {
    useEffect(() => {

        if(!!localStorage.getItem('token')){
            try {
                let user = atob(localStorage.getItem('token').split('.')[1]);
                user = JSON.parse(user);
    
                if (!Object.keys(props.user).length) {
                    props.getUser(user.id);
                }
            } catch (error) {
                localStorage.removeItem('token');
            }
        } else {
            props.history.push('/');
        }
    });

    if (props.loading) {
        return (
            <div className="App">
              <header className="App-header" style={{ backgroundColor: 'white' }}>
                <CircularProgress />
              </header>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'gray' }}>
            <ButtonAppBar />
            <div style={{ display: 'flex', justifyContent: 'space-between', minHeight: '300px', maxHeight: '50%' }}>
              <ListOfGames />
              <ChatApp />
            </div>
            {/* <ChatBubble messages={[{
        "type" : 0,
        "image": "cat.jpg",
        "text": "Hello! Good Morning!"
    }, {
        "type": 1,
        "image": "dog.jpg",
        "text": "Hello! Good Afternoon!"
    }]} /> */}
          {/* <div>Hello</div> */}
          <HighScoresList />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.usersReducers.loading,
        user: state.usersReducers.user
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        getUser: dispatch(getUser)
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
