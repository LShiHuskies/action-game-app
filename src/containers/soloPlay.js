import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useHistory } from "react-router-dom";
import ButtonAppBar from '../components/buttonAppBar';
import '../App.css';
// import Instructions from '../components/instructions';

const GAME_DIFFICULTY_LIST = [
    'Novice', 'Intermediate', 'Expert',
];

const GAME_WEAPON_LIST = [
    'Pistol', 'Shotgun', 'Assault Rifle'
];

const BACK_UP_SUPPLY = [
    'Food', 'MedPack', 'Ammunition',
];


const SoloPlay = () => {

    let history = useHistory()

    const [ difficultyState, setDifficultyState ] = useState('Novice');
    const [ weaponState, setWeaponState ] = useState('Pistol');
    const [ supplyState, setSupplyState ] = useState('Food');


    const handleCloseDifficulty = (popOverState, difficulty) => {
        setDifficultyState(difficulty);
        popOverState.close();
    }

    const handleCloseWeapon = (popOverState, weapon) => {
        setWeaponState(weapon);
        popOverState.close();
    }

    const handleCloseSupply = (popOverState, supply) => {
        setSupplyState(supply);
        popOverState.close();
    }

    const handleInstructions = () => {
        history.push('/instructions');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(difficultyState);
    }

    return <div style={{ backgroundColor: "#282c34", height: '100%', position: 'absolute', width: '100%', color: 'rgba(242, 121, 53, 1)', overflowY: 'hidden' }}>
        <ButtonAppBar />
        <div className="App-header">
            <div className="login" style={{ height: '415px', color: "#282c34", textAlign: 'center' }}>
                <h5 style={{ margin: '25px 0' }}>Welcome to Campaign Mode</h5>
                <form style={{ padding: '0px 25px 0px', paddingBottom: '0px' }} onSubmit={() => console.log('hello')}>
                <p id='line' style={{ marginLeft: '0px', marginTop: '25px', width: '450px', marginBottom: '25px' }} >_______________________________________</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6 style={{ margin: '7px 0' }}>Game Difficulty</h6>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} style={{ width: '40%', backgroundColor: '#282c34', fontSize: '0.67em' }}>
                        {difficultyState}
                    </Button>
                    <Menu {...bindMenu(popupState)} style={{ width: '210px' }} className="MaterialGameDifficulty">
                        {GAME_DIFFICULTY_LIST.map(difficulty => {
                            return <MenuItem onClick={() => handleCloseDifficulty(popupState, difficulty)}>{difficulty}</MenuItem>
                        })}
                    </Menu>
                    </React.Fragment>
                )}
              </PopupState>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                <h6 style={{ margin: '7px 0' }}>Select Weapon</h6>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} style={{ width: '40%', backgroundColor: '#282c34', fontSize: '0.67em' }}>
                        {weaponState}
                    </Button>
                    <Menu {...bindMenu(popupState)} style={{ width: '210px' }} className="MaterialGameDifficulty">
                        {GAME_WEAPON_LIST.map(weapon => {
                            return <MenuItem onClick={() => handleCloseWeapon(popupState, weapon)}>{weapon}</MenuItem>
                        })}
                    </Menu>
                    </React.Fragment>
                )}
              </PopupState>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                <h6 style={{ margin: '7px 0' }}> Backup Supply </h6>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} style={{ width: '40%', backgroundColor: '#282c34', fontSize: '0.67em' }}>
                        {supplyState}
                    </Button>
                    <Menu {...bindMenu(popupState)} style={{ width: '210px' }} className="MaterialGameDifficulty">
                        {BACK_UP_SUPPLY.map(supply => {
                            return <MenuItem onClick={() => handleCloseSupply(popupState, supply)}>{supply}</MenuItem>
                        })}
                    </Menu>
                    </React.Fragment>
                )}
              </PopupState>
              </div>
                <p id='line' style={{ marginLeft: '0px', marginTop: '25px', width: '450px', marginBottom: '25px' }}>_______________________________________</p>
                    <button id='demo' type="button" onClick={() => handleInstructions('solo')} style={{ marginLeft: 0, marginTop: 0 }}>Instructions</button>
                    <button id='submit' type="submit" style={{ marginRight: 0, marginTop: 0 }} onClick={handleSubmit}>Start Game</button>
                </form>
            </div>
        </div>
    </div>
}

export default SoloPlay;
