import React from 'react';

import Health from '../Images/Health/';

import './healthbar.css';


const HealthBar = ({ ammoIcon, IMG, ammoLeft, healthBar }) => {

    return (
        <div id="top-health">
        <div style={{ display: 'flex' }}>
        <img src={Health.HealthIcon.src} style={{ width: '30px', height: '30px', padding: '10px' }} />
          <div className="health">
            <span style={{width: `${healthBar}%`}}>{healthBar}% </span>
          </div>
        </div>
          {/* <div> */}
          <span style={{ display: 'flex', paddingLeft: '10px', maxWidth: '420px' }}>
            <h5>Ammos Left:</h5> <h5 style={{ marginLeft: '10px' }}>{ammoLeft}</h5>
            <h5 style={{ marginLeft: '30px' }}> Ammo Round: </h5> <h5 style={{ marginLeft: '10px' }}>{ ammoIcon.map(icon => (
              <img src={IMG.src} style={{ ...IMG.style }} />
          )) }</h5>
          </span>
        </div>
    )
}

export default HealthBar;
