import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";



const MessageComp = ({ message }) => {
    let history = useHistory();

    useEffect(() => {
        if (!message) {
            history.push('/');
        }
    }, []);

    return (
      <div data-testid="custom-message" testing style={{ height: '100%', width: '100%', backgroundColor: 'rgba(128,128, 128,1)', position: 'absolute' }}>
        <Stack justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '20%' }}>
          <Alert>{message}</Alert>
        </Stack>
      </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        message: state.usersReducers.message,
    }
}


export default connect(mapStatetoProps)(MessageComp);
