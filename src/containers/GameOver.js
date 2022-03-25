import React from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';


// PATCH TO THE GAME


// Score
// PlayerHealth
// Level
// Accuracy
// Option to Email


const GameOver = ({ game_loading, game }) => {

    if (game_loading) {
      return (
        <div className="App">
          <header className="App-header" style={{ backgroundColor: 'white' }}>
            <CircularProgress />
          </header>
        </div>
      )
    }


  return (
    <div>
      hello
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    game_loading: state.gamesReducers.game_loading,
    game: state.gamesReducers.game,
  }
}

export default connect(mapStateToProps)(GameOver);
