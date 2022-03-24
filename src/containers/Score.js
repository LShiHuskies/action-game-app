import React from 'react';
import { connect } from 'react-redux';



const Score = ({ score }) => {
  return (
      <div style={{ position: 'absolute', marginLeft: '50%', color: 'green', fontFamily: 'Courier' }}>
        <h5 style={{ margin: 0, fontSize: '25px' }}>{ score }</h5>
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
      score: state.gamesReducers.score,
    }
  }

export default connect(mapStateToProps)(Score);
