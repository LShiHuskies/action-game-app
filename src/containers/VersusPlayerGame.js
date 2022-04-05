import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ActionCable } from 'react-actioncable-provider';

import Backgrounds from '../Images/CampaignBackgrounds';
import UserGameCharacter from '../components/UserGameCharacter';




class VersusPlayerGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
          characterState: {},
          playerAttempts: 0,
          playerAttackLanded: 0,
          level: 3,
          difficulty: 1,
          characterCoordinatesForSniper: {},
          otherUserGameBulletCoordinates: {},
        }
    }

    componentDidMount() {
      // we want to get all the game info
    }

    coordinatesToHandleCollision = (coordinateObj) => {
        if (coordinateObj.USERGAMEID !== this.props.user_game.id) {
          this.setState({
            otherUserGameBulletCoordinates: coordinateObj,
          }, () => {
              this.setState({
                otherUserGameBulletCoordinates: {},
              });
          });
        }
      }

    handleGameChannel = (data) => {
      if (data.score === 1 && data.users.find(user => user.id === this.props.user.id)) {
        this.props.history.push('/game-over');
      }
    }


    render() {
      return (
        <div style={{ backgroundImage: `url(${Backgrounds[3].src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
        <ActionCable
          channel={{ channel: 'GameChannel' }}
          onReceived={this.handleGameChannel}
        />
        { this.props.game.user_games.map(userGame => {

          return <UserGameCharacter
                    selfUserGame={this.props.user_game} currentUser={this.props.user} userGame={userGame}
                    otherUserGameBulletCoordinates={this.state.otherUserGameBulletCoordinates}
                    sendPlayerBulletCoordinates={this.coordinatesToHandleCollision}
                />
        }) }
        </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
      game_loading: state.gamesReducers.game_loading,
      game: state.gamesReducers.game,
      user_game: state.gamesReducers.user_game,
      user: state.usersReducers.user,
    }
  }

export default connect(mapStateToProps)(VersusPlayerGame);
