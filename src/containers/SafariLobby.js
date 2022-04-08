import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ButtonAppBar from '../components/buttonAppBar';




const SafariLobby = () => {

    const message = 'Safari Play currently under development, coming soon!'

    return (
      <div data-testid="custom-message" id="custom-message-id">
      <ButtonAppBar />
        <Stack justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '20%' }}>
          <Alert>{message}</Alert>
        </Stack>
      </div>
    )
}

export default SafariLobby;
