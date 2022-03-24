import React, { Component } from 'react';
import { connect } from 'react-redux';
import CivilianImages from '../Images/Civilian';
import Backgrounds from '../Images/CampaignBackgrounds';
import Character from '../components/character';
import SoldierImages from '../Images/Soldier';
import Soldier from '../components/Soldier';
import AccuracyBar from '../components/AccuracyBar';
import Civilian from '../components/Civilian';
import Score from './Score';

class SinglePlayerGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            civilianImages: CivilianImages,
            characterState: {},
            playerAttempts: 0,
            playerAttackLanded: 0,
        }
    }

    sendPlayerCoordinates = (coordinates) => {
      this.setState({
        characterState: coordinates
      }, () => {
        this.setState({
          characterState: {}
        });
      });
    }

    coordinatesToHandleCollision = (coordinateObj) => {
      if (coordinateObj.PLAYER) {
        this.setState({
          playerAttempts: this.state.playerAttempts + 1,
          characterState: coordinateObj
        }, () => {
          this.setState({
            characterState: {},
          });
        });
      } else {
        this.setState({
          characterState: coordinateObj
        }, () => {
          this.setState({
            characterState: {},
          });
        });
      }
    }

    render() {
      return (
        <div style={{ backgroundImage: `url(${Backgrounds.Version1.src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
          <Score />
          {Object.keys(this.state.civilianImages).map(civilianImage => {
            const { src, style } = this.state.civilianImages[civilianImage];

            return <Civilian key={src} characterState={this.state.characterState} name={civilianImage} src={src} style={style} />
          })}
          <Soldier fireDirection={"LEFT"} image={SoldierImages.CrawlingLeftSoldier} characterState={this.state.characterState} sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} />
          <Soldier fireDirection={"RIGHT"} image={SoldierImages.RightSoldier} characterState={this.state.characterState} sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} />
          <Character sendPlayerCoordinates={this.sendPlayerCoordinates} sendPlayerBulletCoordinates={this.coordinatesToHandleCollision} characterState={this.state.characterState} />
          <AccuracyBar playerAttempts={this.state.playerAttempts} playerAttackLanded={this.props.accuracyLanded} />
        </div>
      )
    }
}


const mapStateToProps = (state) => {
  return {
    accuracyLanded: state.gamesReducers.accuracyLanded,
    score: state.gamesReducers.score,
  }
}

export default connect(mapStateToProps)(SinglePlayerGame);
