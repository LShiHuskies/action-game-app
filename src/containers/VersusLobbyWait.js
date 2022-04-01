import React from 'react';
import { connect } from 'react-redux';

import CreateGameForm from '../components/CreateGameForm';
import VMGamesContainer from './VMGamesContainer';



import { createGame } from '../actions';





const VersusLobbyWait = ({ user, createGame, game_loading, game }) => {

  const handleSubmit = (event, data) => {
    event.preventDefault();

    createGame({ ...data, user_id: user.id });
  }


    return (
      <header className="App-header" style={{ height: '100%', width: '50%', justifyContent: 'normal', minHeight: '0', }}>
        <div className="login" style={{ width: '100%', maxWidth: '450px', height: '465px' }}>
          <CreateGameForm loading={game_loading} handleSubmit={handleSubmit} />
        </div>
       <VMGamesContainer user={user} game={game} />
      </header>
    )
}


const mapStateToProps = (state) => {
  return {
    game_loading: state.gamesReducers.game_loading,
    game: state.gamesReducers.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: dispatch(createGame),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(VersusLobbyWait);
