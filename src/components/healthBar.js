import React from 'react';
import Health from '../Images/Health/';
import './healthbar.css';


const HealthBar = ({ ammoIcon, IMG, ammoLeft, healthBar, selfUserGame, userGame, iconImage }) => {
  // const style = (!selfUserGame || !userGame) || userGame.user_id === selfUserGame.user_id ? { width: '100%', justifyContent: 'flex-end' } : {};

  // const addlStyle = (!selfUserGame || !userGame) || userGame.user_id === selfUserGame.user_id ? { position: 'absolute', top: '0' } : {};

    return (
        <div id="top-health">
          <div class="heath-row">
            <img src={iconImage.src} class="health-heart" />
            <div className="health">
              <span style={{width: `${healthBar}%`}}>{healthBar}% </span>
            </div>
          </div>
          <span style={{ display: 'flex', paddingLeft: '10px', maxWidth: '45%', height: '30px' }}>
            <h5 style={{ marginRight: '0px', height: '15px', marginTop: '16px', marginLeft: '5px', marginBottom: '0px' }}>Ammos Left:</h5>
            <h5 style={{ margin: '10px', marginBottom: '0px', marginLeft: '5px', height: '15px', marginTop: '16px' }}>{ammoLeft}</h5>
            <h5 style={{ marginTop: '16px', marginLeft: '20px', height: '15px', marginBottom: '0px' }}> Ammo Round: </h5>
            <h5 style={{ marginLeft: '5px', marginTop: '10px' }}>{ammoIcon.map(() => <img src={IMG.src} style={{ ...IMG.style }} />)}</h5>
          </span>
        </div>
    )
}

export default HealthBar;
