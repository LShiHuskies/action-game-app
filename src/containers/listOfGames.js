import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


import listOfGamesData from '../constants/listOfGamesData';









const ListOfGames = () => {


    return <div style={{ textAlign: 'center', width: '50%', backgroundColor: '#282c34', color: 'white' }}>
    <h2 style={{ color: 'rgba(242, 121, 53, 1)' }}>List Of Games</h2>
    <MenuList
      autoFocusItem={true}
      id="composition-menu"
      aria-labelledby="composition-button"
      onKeyDown={() => console.log('hihi')}
    >
      {listOfGamesData.map(game => (
        <MenuItem onClick={() => console.log('hhello')} style={{ color: 'rgba(242, 121, 53, 1)', margin: '3%' }}>{game}</MenuItem>
      ))}
      </MenuList>
    </div>
}


export default ListOfGames;
