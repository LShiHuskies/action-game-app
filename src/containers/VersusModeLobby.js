import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';



import ButtonAppBar from '../components/ButtonAppBar';
import VersusChatApp from './VersusChatApp';
import VersusLobbyWait from './VersusLobbyWait';
import { getUser } from '../actions';






const VersusModeLobby = ({ loading, user, history, getCurrentUser }) => {
    useEffect(() => {
      if(!!localStorage.getItem('token')){
        try {
          let userObj = atob(localStorage.getItem('token').split('.')[1]);
          userObj = JSON.parse(userObj);
        
          if (!Object.keys(user).length) {
            getCurrentUser(userObj.id);
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      } else {
        history.push('/');
      }
    }, []);


  if (loading || !Object.keys(user).length) {
    return (
        <div className="App">
          <header className="App-header" style={{ backgroundColor: 'white' }}>
            <CircularProgress />
          </header>
        </div>
    )
  }


  return (
    <div style={{ backgroundColor: "#282c34", height: '100%', position: 'absolute', width: '100%', overflowY: 'scroll' }}>
      <ButtonAppBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        <VersusLobbyWait user={user} />
        <VersusChatApp user={user} />
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    loading: state.usersReducers.loading,
    user: state.usersReducers.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: dispatch(getUser),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(VersusModeLobby);
