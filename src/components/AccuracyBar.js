import React from 'react';
import './AccuracyBar.css';







const AccuracyBar = (props) => {


    return (
      <span style={{ display: 'flex', marginTop: '16px', fontFamily: "Courier" }}>
      <h5 style={{ marginRight: '15px', marginLeft: '15px' }}>Accuracy: </h5>
      <div className="accuracy">
        <span style={{height: `100%`, marginTop: `0%`}}> 100% </span>
      </div>
      </span>
    )
}

export default AccuracyBar;
