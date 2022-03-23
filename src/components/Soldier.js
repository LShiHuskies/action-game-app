import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FireBullet from './FireBullet';
import Pistol from '../Images/Pistol/';


const SOLDIER_INTERVALS = {
    CrawlingLeftSoldier: [],
}


class Soldier extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allCoordinates: props.image.CrawlingLeftSoldier.coordinates.slice(1),
            name: props.image.CrawlingLeftSoldier.name,
            coordinates: props.image.CrawlingLeftSoldier.coordinates[0],
            fireBullet: false,
            health: 100,
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

          const { PLAYER } = characterState;

          if (PLAYER.left >= this.state.coordinates.left && PLAYER.left <= this.state.coordinates.left + (70/window.innerWidth * 100) 
          && (PLAYER.top >= this.state.coordinates.top && PLAYER.top <= this.state.coordinates.top + (40/window.innerHeight) * 100)) {
            // const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
            const newHealth = this.state.health - 25 > 0 ? this.state.health - 25 : 0;
            this.setState({
                health: newHealth,
            });
          }



          return;
      }



      if (this.state.fireBullet || !Object.keys(characterState).length || Object.keys(characterState).length < 2) {
          return;
      }

      const newFireBulletLeftState = this.state.coordinates.left;
      const newFireBulletTopState = 18 / characterState.windowHeightState * 100 + this.state.coordinates.top;

      const newFireTargetTopState = characterState.topState;

      const newFireTargetLeftState = characterState.leftState;

    let fireBulletBelow;
    if (newFireTargetTopState > newFireBulletTopState) {
        fireBulletBelow = true;
    } else {
        fireBulletBelow = false;
    }

      this.setState({
        fireBullet: {
          fireDirection: 'LEFT', fireBulletLeftState: newFireBulletLeftState, fireBulletTopState: newFireBulletTopState, fireBulletBelow,
          fireTargetTopState: newFireTargetTopState, fireTargetLeftState: newFireTargetLeftState, windowWidthState: characterState.windowWidthState,
          windowHeightState: characterState.windowHeightState, uuidGenerated: uuidv4(), style:  { width: '20px', height: '20px', transform: 'rotate(180deg)' },
          src: Pistol.PistolBullet.src, shotTarget: Pistol.ShotTarget
        }
      });

    }

    handleSoldierMovements = () => {
        if (this.state.allCoordinates.length) {
            this.setState({ coordinates: this.state.allCoordinates[0], allCoordinates: this.state.allCoordinates.slice(1) });
        } else {
            this.setState({
                coordinates: this.props.image.CrawlingLeftSoldier.coordinates[this.props.image.CrawlingLeftSoldier.coordinates.length-1], allCoordinates: [...this.props.image.CrawlingLeftSoldier.coordinates].reverse()
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
              <img src={this.props.image.CrawlingLeftSoldier.src} class="health-heart" style={{ width: '20px', height: '20px', padding: '10px' }} />
              <div className="health" style={{ float: 'right', width: '100%' }}>
                <span style={{width: `${this.state.health}%`}}>{this.state.health}% </span>
              </div>
            </div>
            <img src={this.props.image.CrawlingLeftSoldier.src} style={{ width: '70px', height: '40px', position: 'absolute', top: `${this.state.coordinates.top}%`, left: `${this.state.coordinates.left}%` }} />
            { this.state.fireBullet ? <FireBullet { ...this.state.fireBullet } handleUnmountComponent={this.handleUnmountFireBullet} /> : null }
          </Fragment>
        )
    }
}

export default Soldier;


