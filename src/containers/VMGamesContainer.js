import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';


import { getAvailableVersusGames, searchGameById, playUserGame, getUserGame } from '../actions';

import SearchGame from '../components/SearchGame';
import FoundGame from '../components/FoundGame';



const VMGamesContainer = ({ versus_games_loading, available_versus_games,
    getAvailableVersusGames, user, searchGameById, game, playUserGame }) => {

    useEffect(() => {
        getAvailableVersusGames();
    },[]);

    const play = async (user_game) => {
      await playUserGame(user_game);
    }

    return (
      <div className="login" style={{ width: '100%', height: '50%', backgroundColor: "#282c34", display: 'flex' }}>
        <SearchGame user={user} searchGameById={searchGameById} />
        <FoundGame user={user} game={game} play={play} searchGameById={searchGameById} />
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    versus_games_loading: state.gamesReducers.versus_games_loading,
    available_versus_games: state.gamesReducers.available_versus_games,
    user_game: state.gamesReducers.user_game,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableVersusGames: dispatch(getAvailableVersusGames),
    searchGameById: dispatch(searchGameById),
    playUserGame: dispatch(playUserGame),
    getUserGame: dispatch(getUserGame),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VMGamesContainer);
