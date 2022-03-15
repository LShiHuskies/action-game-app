import React from 'react';
import ButtonAppBar from './ButtonAppBar';



const Instructions = () => {
    return <div style={{ backgroundColor: '#282c34', position: 'absolute', width: '100%',
    height: '100%', overflowY: 'hidden' }}>
    <ButtonAppBar/>
                <div className="App-header">
                  <div className="login" style={{ height: '400px', color: "white", textAlign: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${'https://images6.alphacoders.com/570/thumb-350-570413.jpg'})`, width: '600px' }}>
                    <h4 style={{ margin: '25px 0px' }}>Game Instructions</h4>
                    <p style={{ fontSize: '0.67em', fontWeight: 'bold' }}>Welcome to Campaign Mode!</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '50%' }}>
                        <h6 style={{ margin: 0 }}>Game Objectives</h6>
                        <p style={{ fontSize: '.6em', fontWeight: 'bold', marginTop: '10px', marginLeft: '20px', textAlign: 'left' }}>
                            Reach the final round and assasinate Joseph Stalin to end his terror. <br/>
                            <br />
                            You must:
                                <ol>
                                    <li>Avoid killing civilians</li>
                                    <li>Complete the mission on time</li>
                                    <li>Complete the mission with the supplies allocated</li>
                                    <li>Stay alive</li>
                                </ol>
                        </p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <h6 style={{ margin: 0 }}>Game Controls</h6>
                        <p style={{ fontSize: '.6em', fontWeight: 'bold', marginTop: '10px', marginLeft: '20px', textAlign: 'left' }}>
                            <ul>
                                <li>To move: A-S-W-D (keys) </li>
                                    <ol>
                                        <li>Keydown to keep moving</li>
                                        <li>Press twice to run</li>
                                    </ol>
                                <li>Direction to look: Arrow keys </li>
                                <li>Space Bar to reload</li>
                            </ul>
                        </p>
                   </div>
                    </div>
                  </div>
                </div>
    </div>
};

export default Instructions;
