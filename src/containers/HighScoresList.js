import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useHistory } from "react-router-dom";

import { getTopScores, setProfileGame } from '../actions';








const HighScoresList = ({ TOPSCORES, loading, GETCURRENTSCORES, SETPROFILEGAME }) => {
    let history = useHistory();

    const [ gameTypeState, setGameTypeState ] = useState('single');

    useEffect(() => {
      const getTopScoresForGames = async () => {
          await GETCURRENTSCORES(gameTypeState)
      }

      getTopScoresForGames();
    }, []);

    const handleClick = async (game) => {
        await SETPROFILEGAME(game);

        history.push(`games/${game.id}`);
    }


  if (loading) {
    return (
      <div className="App">
        <header className="App-header" style={{ backgroundColor: 'white' }}>
          <CircularProgress />
        </header>
      </div>
    )
  }

  return (
    <div style={{ height: '40%' }}>
      <Card style={{ backgroundColor: 'black', marginTop: '5px', marginLeft: '15%', width: '70%', textAlign: 'center' }}>
        <h2 style={{ color: 'rgb(242, 121, 53)', marginTop: '1.25%', marginBottom: '1.25%' }}>
          Top Scores
        </h2>
      </Card>
        <div style={{ overflow: 'scroll', display: 'flex', flexWrap: 'wrap' }}>
          {TOPSCORES.map(game => {
            return (
              <Card sx={{ minWidth: 150 }} style={{ flex: '1 1 18%', backgroundColor: 'rgb(242, 121, 53)',
                margin: '5px',
                height: '150px',
                overflowY: 'scroll',
                backgroundColor: '#4BC3B5'}}
              >
                <CardContent style={{ padding: '12px', backgroundColor: 'rgb(242, 121, 53)' }}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{ textAlign: 'center' }} >
                    { game.name }
                  </Typography>
                  <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }}>
                    <p>Score:</p> <p>{game.score}</p>
                  </Typography>
                  <Typography color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0' }} >
                  <p>Player:</p><p>{game.users[0].username}</p>
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end', backgroundColor: 'rgb(242, 121, 53)' }} >
                  <Button size="small" onClick={() => handleClick(game)}>More Details</Button>
                </CardActions>
              </Card>
            )
          })}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    loading: state.gamesReducers.scores_loading,
    TOPSCORES: state.gamesReducers.topScores,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETCURRENTSCORES: dispatch(getTopScores),
    SETPROFILEGAME: dispatch(setProfileGame),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScoresList);
