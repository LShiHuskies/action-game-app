import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";

import './Message.css';



const MessageComp = ({ message }) => {
    let history = useHistory();

    useEffect(() => {
        if (!message) {
            history.push('/');
        }
    }, []);

    return (
      <div data-testid="custom-message" id="custom-message-id">
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
