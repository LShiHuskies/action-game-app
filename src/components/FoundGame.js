import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { useHistory } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const FoundGame = ({ user, game, play, searchGameById }) => {
    let history = useHistory();

  const handleGameReceived = async (data) => {
    if (data && data.users.find(perUser => perUser.id === user.id)) {
        if (data.user_id !== user.id) {
          await searchGameById({
            user,
            game_id: data.id,
          });
        }
    }
  }

  const handleUserGameReceived = async (data) => {
    if (data && game && game.users.find(perUser => perUser.id === user.id)) {
      await searchGameById({
        user,
        game_id: data.game_id,
      });

      if (game.user_games.filter(UG => UG.accepted).length === 2 && game.score === null) {
        history.push(`/VersusBattle/${game.id}`);
      }
    }
  }

    return (
      <div style={{ width: '50%', height: '100%', color: '#C0C0C0' }}>
       <ActionCable
          channel={{ channel: 'GameChannel' }}
          onReceived={handleGameReceived}
        />
       <ActionCable
          channel={{ channel: 'UserGamesChannel' }}
          onReceived={handleUserGameReceived}
        />
        <h1 style={{ textAlign: "center", padding: '5% 0', margin: '0', fontSize: '20px' }}>
          Play Game
        </h1>
        {game && game.name && game.users.length === 2 && !game.score ?
        <header className="App-header" style={{ justifyContent: 'normal', minHeight: '0', marginTop: '80px' }}>
          <Card sx={{ minWidth: 0 }} style={{ backgroundColor: 'rgb(242, 121, 53)',
                width: '70%',
                backgroundColor: '#4BC3B5'}}>
              <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
              <Typography variant="h3" sx={{ fontSize: 20 }} color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px',
                marginBottom: '20px' }}>
                { game.name }
              </Typography>
            { game && game.user_games.length ?
            game.user_games.map(UG => {
                const currentUser = game.users.find(currUser => currUser.id === UG.user_id)
                return <Typography color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '10px'}}>{currentUser.username} - {UG.accepted ? 'ACCEPTED' : 'PENDING'}</Typography>;
            }) :
              null }
              </CardContent>
              <CardActions style={{ backgroundColor: 'rgb(242, 121, 53)', display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" onClick={() => console.log('hello')}>Reject</Button>
                <Button size="small" onClick={() => play(game.user_games.find(ug => ug.user_id === user.id))}>Play</Button>
              </CardActions>
            </Card>
        </header>
        :
        null
        }

      </div>
    )
}

export default FoundGame;
