import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CivilianImages from '../Images/Civilian';
import Backgrounds from '../Images/CampaignBackgrounds';
import Character from '../components/character';
import SoldierImages from '../Images/Soldier';
import Soldier from '../components/Soldier';
import AccuracyBar from '../components/AccuracyBar';
import Civilian from '../components/Civilian';
import Score from './Score';

import { AddTotalShotAttempts } from '../actions';

class SinglePlayerGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            civilianImages: CivilianImages,
            characterState: {},
            playerAttempts: 0,
            playerAttackLanded: 0,
            level: 1,
            difficulty: 2,
        }
    }

    componentDidMount() {
      if (!this.props.game_loading && this.props.game.difficulty) {
        const { difficulty } = this.props.game.difficulty;
        this.setState({
          difficulty
        });
      }
    }

    componentWillUnmount() {
      this.props.AddTotalShotAttempts(this.state.playerAttempts);
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

    setCasualities = (soldier) => {
      this.setState({
        [soldier]: soldier,
      });
    }

    render() {
      if (this.props.game_loading) {
        <div className="App">
          <header className="App-header" style={{ backgroundColor: 'white' }}>
            <CircularProgress />
          </header>
        </div>
      }

      return (
        <div style={{ backgroundImage: `url(${Backgrounds.Version1.src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
          <Score />
          {Object.keys(this.state.civilianImages).map(civilianImage => {
            const { src, style } = this.state.civilianImages[civilianImage];

            return <Civilian key={src} characterState={this.state.characterState} name={civilianImage} src={src} style={style} />
          })}
          {Object.keys(SoldierImages).map(soldier => {
            if (this.state[soldier] || this.state.difficulty < SoldierImages[soldier].difficulty) {
              return null;
            }
            return (
              <Soldier fireDirection={SoldierImages[soldier].fireDirection} image={SoldierImages[soldier]} characterState={this.state.characterState}
                        sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} setCasualities={this.setCasualities}
              />
            )
          })}
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
    game_loading: state.gamesReducers.game_loading,
    game: state.gamesReducers.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddTotalShotAttempts: dispatch(AddTotalShotAttempts),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
