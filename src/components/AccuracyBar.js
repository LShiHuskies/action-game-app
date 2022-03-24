import React from 'react';
import './AccuracyBar.css';







const AccuracyBar = ({ playerAttackLanded, playerAttempts }) => {
  let outOfAmt = playerAttackLanded/playerAttempts;

  if (!outOfAmt) {
    outOfAmt = 0;
  }


    return (
      <span style={{ display: 'flex', marginTop: '16px', fontFamily: "Courier" }}>
      <h5 style={{ marginRight: '15px', marginLeft: '15px' }}>Accuracy: </h5>
      <div className="accuracy">
        <span style={{height: `${outOfAmt * 100}%`, marginTop: `${(1 - outOfAmt) * 100}%`}}> {outOfAmt * 100}% </span>
      </div>
      </span>
    )
}

export default AccuracyBar;
