import React from 'react';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const messageComp = ({ message }) => {

    return <div style={{ height: '100%', width: '100%', backgroundColor: 'rgba(128,128, 128,1)', position: 'absolute' }}>
        <Stack justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '20%' }}>
        <Alert>{message}</Alert>
  </Stack>
  </div>
}

const mapStatetoProps = (state) => {
    return {
        message: state.usersReducers.message,
    }
}


export default connect(mapStatetoProps)(messageComp);
