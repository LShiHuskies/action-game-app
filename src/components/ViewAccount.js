import React from 'react';
import moment from 'moment';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';











const ViewAccount = ({ user, goBackToProfile, handleEditMode }) => {



    return (
      <Card sx={{ minWidth: 300 }} style={{ flex: '1 1 18%', backgroundColor: '#C0C0C0',
        margin: '5px',
        height: '60%',
        backgroundColor: '#4BC3B5'}}>
      <CardContent style={{ padding: '12px', backgroundColor: '#C0C0C0' }}>
      <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
            marginBottom: '20px' }}>
        Account Information
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }} >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Username:</p><p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{user.username}</p>
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }}>
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>First Name:</p> <p>{user.first_name}</p>
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }} >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Last Name:</p><p>{user.last_name}</p>
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }} >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Email:</p><p>{user.email}</p>
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }} >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Member Since:</p><p> {moment(user.created_at).format('MM-DD-YYYY hh:mm:ss a')} </p>
      </Typography>
      <Typography color="text.secondary" style={{ display: 'flex', height: '40px', justifyContent: 'space-between', lineHeight: '0' }} >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Activated Since:</p><p> {moment(user.activated_at).format('MM-DD-YYYY hh:mm:ss a')} </p>
      </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: '#C0C0C0', display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" onClick={goBackToProfile}>Back to Profile</Button>
        <Button size="small" onClick={() => handleEditMode(true)}>Edit</Button>
        </CardActions>
      </Card>
    )
}

export default ViewAccount;
