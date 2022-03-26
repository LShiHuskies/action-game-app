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
import Sniper from '../components/Sniper';

import { AddTotalShotAttempts, updateGame } from '../actions';

class SinglePlayerGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
          civilianImages: CivilianImages,
          characterState: {},
          playerAttempts: 0,
          playerAttackLanded: 0,
          level: 1,
          difficulty: 1,
          characterCoordinatesForSniper: {},
        }
    }

    componentDidMount() {
      if (!this.props.game_loading && this.props.game.difficulty) {
        const { difficulty } = this.props.game;

        this.setState({
          difficulty,
        });
      }
    }

    // componentWillUnmount() {
    //   this.props.AddTotalShotAttempts(this.state.playerAttempts);
    // }

    handleEndOfGame = () => {
      // await this.props.AddTotalShotAttempts(this.state.playerAttempts);
      // console.log(this.props.totalShotAttempts);
      // await this.props.updateGame(this.props.game, this.props.score);
      if (!this.state.endGame) {
        this.setState({
          endGame: true,
        }); 
      }
    }

    componentDidUpdate() {
      if (this.state.endGame === true) {
        this.props.AddTotalShotAttempts(this.state.playerAttempts);
        this.props.updateGame(this.props.game, this.props.score);
        this.props.history.push('/game-over');
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

    setCasualities = (soldier) => {
      const soldierArr = Object.keys(SoldierImages);

      this.setState({
        [soldier]: soldier,
      }, () => {
        const soldiersOut = soldierArr.filter(soldier => {
          return this.state[soldier] || !SoldierImages[soldier].difficulty[this.state.difficulty];
        });

        if (soldiersOut.length === soldierArr.length) {
          const newObj = {};
          soldierArr.forEach(soldier => {
            newObj[soldier] = false;
          });
          if (this.state.level < 6) {
            this.setState({
              ...this.state,
              ...newObj,
              level: this.state.level + 1,
            });
          } else {
            this.setState({
              endGame: true,
            });
          }
        }
      });
    }

    sendCoordinatesToSniper = (coordinates) => {
      this.setState({
        characterCoordinatesForSniper: coordinates,
      }, () => {
        this.setState({
          characterCoordinatesForSniper: {},
        });
      });
    }

    render() {
      if (this.props.game_loading) {
        return (
          <div className="App">
            <header className="App-header" style={{ backgroundColor: 'white' }}>
              <CircularProgress />
            </header>
          </div>
        )
      }

      return (
        <div style={{ backgroundImage: `url(${Backgrounds[this.state.level].src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
          <Score />
          {Object.keys(this.state.civilianImages).map(civilianImage => {
            if (this.state.level === 1) {
              return null;
            }

            const { src, style } = this.state.civilianImages[civilianImage];

            return <Civilian key={src} characterState={this.state.characterState} name={civilianImage} src={src} style={style} />
          })}
          {Object.keys(SoldierImages).map(soldier => {
            if (this.state[soldier] || !SoldierImages[soldier].difficulty[this.state.difficulty]) {
              return null;
            }
            return (
              <Soldier fireDirection={SoldierImages[soldier].fireDirection} image={SoldierImages[soldier]} characterState={this.state.characterState}
                        sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} setCasualities={this.setCasualities} difficulty={this.state.difficulty}
              />
            )
          })}
          { this.state.difficulty === 3 || this.state.level > 3
              ? <Sniper playerCoordinates={this.state.characterCoordinatesForSniper} sendSniperBulletCoordinates={this.coordinatesToHandleCollision} />
              : null }
          <Character sendPlayerCoordinates={this.sendPlayerCoordinates} sendPlayerBulletCoordinates={this.coordinatesToHandleCollision}
                     characterState={this.state.characterState} handleEndOfGame={this.handleEndOfGame} game={this.props.game} sendCoordinatesToSniper={this.sendCoordinatesToSniper} />
          <AccuracyBar playerAttempts={this.state.playerAttempts} playerAttackLanded={this.props.accuracyLanded} />
        </div>
      )
    }
}


const mapStateToProps = (state) => {
  return {
    accuracyLanded: state.gamesReducers.accuracyLanded,
    totalShotAttempts: state.gamesReducers.totalShotAttempts,
    score: state.gamesReducers.score,
    game_loading: state.gamesReducers.game_loading,
    game: state.gamesReducers.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddTotalShotAttempts: dispatch(AddTotalShotAttempts),
    updateGame: dispatch(updateGame),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
