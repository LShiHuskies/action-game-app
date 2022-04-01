import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Alert from '@mui/material/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


import ButtonAppBar from '../components/ButtonAppBar';
import ViewAccount from '../components/ViewAccount';
import EditAccount from '../components/EditAccount';

import { getUser, undoUpdateUserError, updateUser, resetUpdateMessage } from '../actions';





const MyAccount = ({
    user, history, getUser, errorUpdateUser,
    undoUpdateUserError, updateUser, message,
    resetUpdateMessage, loading,
}) => {

    const [ editModeState, setEditModeState ] = useState(false);

    useEffect(() => {
     const handleOperation = async () => {
        if(!!localStorage.getItem('token')){
            try {
              let storageUser = atob(localStorage.getItem('token').split('.')[1]);
              storageUser = JSON.parse(storageUser);
        
              if (!Object.keys(user).length) {
                await getUser(storageUser.id);
              }
            } catch (error) {
              localStorage.removeItem('token');
            }
          } else {
            history.push('/');
          }
     }

     handleOperation();
    }, []);

    useEffect(() => {
        if (message) {
          setTimeout(() => {
            resetUpdateMessage();
          }, 7000);
        }
        if (errorUpdateUser) {
            setTimeout(() => {
              undoUpdateUserError();
            }, 7000);
        }
    }, [message, errorUpdateUser]);

    const handleEditMode = (val) => {
      setEditModeState(val);
    }

    const goBackToProfile = () => {
      history.push('/profile');
    }

    const handleUpdate = async (attributes) => {
        const obj = { ...attributes, first_name: attributes.firstname,
                        last_name: attributes.last_name,
                    };
        delete obj.firstname;
        delete obj.lastname;

        await updateUser(user, attributes);
        handleEditMode(false);
    }

    if (loading) {
      return <div className="App">
        <header className="App-header" style={{ backgroundColor: 'white' }}>
          <CircularProgress />
        </header>
      </div>
    }


    return (
      <div className="App" style={{ overflowY: 'hidden' }}>
        <ButtonAppBar />
        <header className="App-header">
        { message ? <Alert style={{ width: '468px', marginBottom: '5px' }}>{message}</Alert> : null }
        { errorUpdateUser
          ? <Alert severity="error" style={{ width: '468px', marginBottom: '5px' }}>{errorUpdateUser}</Alert>
          : null }
          <div className="login">
        { editModeState
            ? <EditAccount { ...user } handleEditMode={handleEditMode} handleUpdate={handleUpdate} />
            : <ViewAccount { ...user } goBackToProfile={() => goBackToProfile()} handleEditMode={handleEditMode} /> }
          </div>
        </header>
      </div>
    )
}

const mapDispatchToProps = (dispatch) => {

  return {
    getUser: dispatch(getUser),
    undoUpdateUserError: dispatch(undoUpdateUserError),
    updateUser: dispatch(updateUser),
    resetUpdateMessage: dispatch(resetUpdateMessage),
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducers.user,
    errorUpdateUser: state.usersReducers.errorUpdateUser,
    message: state.usersReducers.message,
    loading: state.usersReducers.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
