import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import FireBullet from './FireBullet';
import Pistol from '../Images/Pistol/';

import { AddAccuracyLanded, AddScore } from '../actions';


const SOLDIER_INTERVALS = {
    CrawlingLeftSoldier: [],
    RightSoldier: [],
}


class Soldier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCoordinates: props.image.coordinates.slice(1),
            name: props.image.name,
            coordinates: props.image.coordinates[0],
            fireBullet: false,
            health: 100,
            playerAttempts: 0,
            playerAttackLanded: 0,
        }
    }

    componentDidMount() {
        SOLDIER_INTERVALS[this.state.name].push(setInterval(() => {
            this.handleSoldierMovements();
        }, 1500));
    }

    componentWillReceiveProps(currProps) {
      const { characterState } = currProps;

      if (characterState && characterState.PLAYER) {

          const { PLAYER, DIRECTION } = characterState;

          if (this.props.fireDirection === "LEFT") {
            if (PLAYER.left >= this.state.coordinates.left && PLAYER.left <= this.state.coordinates.left + (70/window.innerWidth * 100)
            && (PLAYER.top >= this.state.coordinates.top && PLAYER.top <= this.state.coordinates.top + (40/window.innerHeight) * 100)) {
              // const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              let healthDed = 20;
              let newHealth = this.state.health - healthDed > 0 ? this.state.health - healthDed : 0;
              let scoreAdded = 200;
              if (DIRECTION === "UP" || DIRECTION === "DOWN") {
                newHealth = this.state.health - healthDed/4;
                scoreAdded /= 4;
              }
              this.setState({
                health: newHealth,
              });

              this.props.AddAccuracyLanded(this.props.accuracyLanded + 1);
              this.props.AddScore(scoreAdded);
            }
          } else if (this.props.fireDirection === "RIGHT") {
            if (PLAYER.left >= this.state.coordinates.left && PLAYER.left <= this.state.coordinates.left + (70/window.innerWidth * 100)
            && (PLAYER.top >= this.state.coordinates.top && PLAYER.top <= this.state.coordinates.top + (40/window.innerHeight) * 100)) {
              // const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              let healthDed = 20;
              let newHealth = this.state.health - healthDed > 0 ? this.state.health - healthDed : 0;
              let scoreAdded = 200;
              if (DIRECTION === "UP" || DIRECTION === "DOWN") {
                newHealth = this.state.health - healthDed/4;
                scoreAdded /= 4;
              }
              this.setState({
                health: newHealth,
              });

              this.props.AddAccuracyLanded(this.props.accuracyLanded + 1);
              this.props.AddScore(scoreAdded);
            }
          }

          this.setState({
            playerAttempts: this.state.playerAttempts + 1,
          });

          return;
      }


      

      if (this.state.fireBullet || !Object.keys(characterState).length || Object.keys(characterState).length < 2) {
          return;
      }
      let newFireBulletLeftState;
      let newFireBulletTopState;
      let newFireTargetTopState;
      let newFireTargetLeftState;
      let fireBulletBelow;

      switch (this.props.fireDirection) {
          case 'LEFT':
            newFireBulletLeftState = this.state.coordinates.left;
            newFireBulletTopState = 18 / characterState.windowHeightState * 100 + this.state.coordinates.top;
        
            newFireTargetTopState = characterState.topState;
        
            newFireTargetLeftState = characterState.leftState;
        
            if (newFireTargetTopState > newFireBulletTopState) {
                fireBulletBelow = true;
            } else {
                fireBulletBelow = false;
            }

            this.setState({
                fireBullet: {
                fireDirection: this.props.fireDirection, fireBulletLeftState: newFireBulletLeftState, fireBulletTopState: newFireBulletTopState, fireBulletBelow,
                fireTargetTopState: newFireTargetTopState, fireTargetLeftState: newFireTargetLeftState, windowWidthState: characterState.windowWidthState,
                windowHeightState: characterState.windowHeightState, uuidGenerated: uuidv4(), style:  { width: '20px', height: '20px', transform: 'rotate(180deg)' },
                src: Pistol.PistolBullet.src, shotTarget: Pistol.ShotTarget
                }
            });

            return;

          case 'RIGHT':
            newFireBulletLeftState = this.state.coordinates.left;
            newFireBulletTopState = 18 / characterState.windowHeightState * 100 + this.state.coordinates.top;
        
            newFireTargetTopState = characterState.topState;
        
            newFireTargetLeftState = characterState.leftState;

            if (newFireTargetLeftState < newFireBulletLeftState + 20) {
                return;
            }
        
            if (newFireTargetTopState > newFireBulletTopState) {
                fireBulletBelow = true;
            } else {
                fireBulletBelow = false;
            }

            this.setState({
                fireBullet: {
                fireDirection: this.props.fireDirection, fireBulletLeftState: newFireBulletLeftState, fireBulletTopState: newFireBulletTopState, fireBulletBelow,
                fireTargetTopState: newFireTargetTopState, fireTargetLeftState: newFireTargetLeftState, windowWidthState: characterState.windowWidthState,
                windowHeightState: characterState.windowHeightState, uuidGenerated: uuidv4(), style:  { width: '20px', height: '20px' },
                src: Pistol.PistolBullet.src, shotTarget: Pistol.ShotTarget
                }
            });

            return;


          default:
            return;
      }

    }

    handleSoldierMovements = () => {
        if (this.state.allCoordinates.length) {
          this.setState({ coordinates: this.state.allCoordinates[0], allCoordinates: this.state.allCoordinates.slice(1) });
        } else {
          this.setState({
            coordinates: this.props.image.coordinates[this.props.image.coordinates.length-1], allCoordinates: [...this.props.image.coordinates].reverse()
          });
        }
    }

    handleUnmountFireBullet = (e, coordinates) => {
      this.setState({
        fireBullet: false,
      });

      const soldierBulletCoord = { soldierBullet: coordinates };
      this.props.sendSoldierBulletCoordinates(soldierBulletCoord);
    }


    render() {
        return (
          <Fragment>
            <div class="heath-row"  style={{ float: 'right', padding: '0', width: '10%' }}>
              <img src={this.props.image.src} class="health-heart" style={{ width: '20px', height: '20px', padding: '10px' }} />
              <div className="health" style={{ float: 'right', width: '100%' }}>
                <span style={{width: `${this.state.health}%`}}>{this.state.health}% </span>
              </div>
            </div>
            <img src={this.props.image.src} style={{ width: '70px', height: '40px', position: 'absolute', top: `${this.state.coordinates.top}%`, left: `${this.state.coordinates.left}%` }} />
            { this.state.fireBullet ? <FireBullet { ...this.state.fireBullet } handleUnmountComponent={this.handleUnmountFireBullet} /> : null }
          </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      accuracyLanded: state.gamesReducers.accuracyLanded,
    }
  }
  

const mapDispatchToProps = (dispatch) => {
  return {
    AddAccuracyLanded: dispatch(AddAccuracyLanded),
    AddScore: dispatch(AddScore),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Soldier);


