import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useHistory } from "react-router-dom";


import listOfGames from '../constants/listOfGamesData';
import './ListOfGames.css';







const ListOfGames = () => {
    let history = useHistory();

    const selectGame = (game) => {
        // history()
        console.log(game);
        history.push(`${game.path}`);
    }


    return <div style={{ textAlign: 'center', width: '50%', backgroundColor: '#282c34', color: 'white' }}>
    <h2 style={{ color: 'rgba(242, 121, 53, 1)' }}>List Of Games</h2>
    <MenuList
      autoFocusItem={true}
      id="composition-menu"
      aria-labelledby="composition-button"
      onKeyDown={() => console.log('hihi')}
    >
      {listOfGames.map(game => (
        <MenuItem id="List-Of-Games" key={game.name} onClick={() => selectGame(game)} style={{ color: 'rgba(242, 121, 53, 1)', margin: '3%' }}>{game.name}</MenuItem>
      ))}
      </MenuList>
    </div>
}


export default ListOfGames;
