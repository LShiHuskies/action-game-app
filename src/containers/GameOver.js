import React from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { resetGame } from '../actions';


import { GAME_DIFFICULTY_LIST } from '../constants';



// PATCH TO THE GAME


// Score
// PlayerHealth
// Level
// Accuracy
// Option to Email


const GameOver = ({ game_loading, game, history, resetGame }) => {

    if (game_loading) {
      return (
        <div className="App">
          <header className="App-header" style={{ backgroundColor: 'white' }}>
            <CircularProgress />
          </header>
        </div>
      )
    }


    const goBackToProfile = () => {
        resetGame();
        history.push('/profile');
    }

    console.log(game);

    const difficulty = Object.keys(GAME_DIFFICULTY_LIST).find(difficult => GAME_DIFFICULTY_LIST[difficult] === game.difficulty);




    const cardContent = game.users.length === 1 ?
        <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
            <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
                marginBottom: '20px' }} >
            Thanks for playing {game.users[0].username}!
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
        </CardContent> :
            <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
                <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
                    marginBottom: '20px' }} >
                    Thanks for playing {game.users[0].username} and {game.users[1].username}!
                </Typography>
            </CardContent> 
        ;

        




  return (
    <div className="App">
      <header className="App-header">
      
        <div class="login">
            <Card sx={{ minWidth: 300 }} style={{ flex: '1 1 18%', backgroundColor: 'rgb(242, 121, 53)',
                margin: '5px',
                height: '60%',
                backgroundColor: '#4BC3B5'}}>
              {/* <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
              <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
                    marginBottom: '20px' }} >
                Thanks for playing {game.users[0].username}!
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
              </CardContent> */}
              {cardContent}
              <CardActions style={{ backgroundColor: 'rgb(242, 121, 53)' }}>
                <Button size="small" onClick={goBackToProfile}>Back to Profile</Button>
              </CardActions>
            </Card>
        </div>
      </header>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    resetGame: dispatch(resetGame),
  }
}

const mapStateToProps = (state) => {
  return {
    game_loading: state.gamesReducers.game_loading,
    game: state.gamesReducers.game,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
