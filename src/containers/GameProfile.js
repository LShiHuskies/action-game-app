import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getProfileGame } from '../actions';
import { GAME_DIFFICULTY_LIST } from '../constants';




const GameProfile = ({ game, history, loading, location, match, GETPROFILEGAME }) => {

    useEffect(() => {
      if (!game.id) {
        const { params: { id } } = match;

        GETPROFILEGAME(id);
      }
    }, []);

    if (loading || !game.id) {
      return (
        <div className="App">
          <header className="App-header" style={{ backgroundColor: 'white' }}>
            <CircularProgress />
          </header>
        </div>
      )
    }

    const difficulty = Object.keys(GAME_DIFFICULTY_LIST).find(difficult => GAME_DIFFICULTY_LIST[difficult] === game.difficulty);

    return (
      <div className="App">
        <header className="App-header">
          <div className='login'>
          <Card sx={{ minWidth: 300 }} style={{ flex: '1 1 18%', backgroundColor: 'rgb(242, 121, 53)',
                margin: '5px',
                height: '60%',
                backgroundColor: '#4BC3B5'}}>
              <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
              <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
                    marginBottom: '20px' }} >
                { game.name }
              </Typography>
              <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }} >
                <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Player:</p><p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{game.users[0].username}</p>
              </Typography>
              <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }}>
                <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Score:</p> <p>{game.score}</p>
              </Typography>
              <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }} >
                <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Weapon:</p><p>{game.weapon}</p>
              </Typography>
              <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }} >
                <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Difficulty:</p><p>{difficulty}</p>
              </Typography>
              <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }} >
                <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Backup Supply:</p><p>{game.backup_supply}</p>
              </Typography>
              </CardContent>
              <CardActions style={{ backgroundColor: 'rgb(242, 121, 53)' }}>
                <Button size="small" onClick={() => history.push('/profile')}>Go Back</Button>
              </CardActions>
            </Card>
          </div>
        </header>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    game: state.gamesReducers.profile_game,
    loading: state.gamesReducers.profile_game_loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETPROFILEGAME: dispatch(getProfileGame),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameProfile);

