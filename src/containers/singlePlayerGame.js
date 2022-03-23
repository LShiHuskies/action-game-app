import React, { Component } from 'react';
import CivilianImages from '../Images/Civilian';
import Backgrounds from '../Images/CampaignBackgrounds';
import Character from '../components/character';
import Civilian from '../components/Civilian';
import SoldierImages from '../Images/Soldier';
import Soldier from '../components/Soldier';

let CIVILIAN_INTERVALS = {
    NativeAmericanNurse: [],
    CarlJohnson: [],
}

class SinglePlayerGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            civilianImages: CivilianImages,
            characterState: {},
        }
    }


    componentDidMount() {
        // for (const keyInterval in CIVILIAN_INTERVALS) {
        //     CIVILIAN_INTERVALS[keyInterval].push(setInterval(() => {
        //         this.handleCivilian(keyInterval);
        //     }, 2000));
        // }
        // window.addEventListener('click', this.handleClick);
    }

    handleClick = (stuff) => {
        console.log(stuff);

    }

    sendPlayerCoordinates = (coordinates) => {
      this.setState({
        characterState: coordinates
      });
    }

    coordinatesToHandleCollision = (coordinateObj) => {
      this.setState({
        characterState: coordinateObj
      });
    }



    render() {
      return (
        <div style={{ backgroundImage: `url(${Backgrounds.Version1.src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
          {Object.keys(this.state.civilianImages).map(civilianImage => {
            const { src, style, alive } = this.state.civilianImages[civilianImage];

            if (!alive) return null;

            return <Civilian key={src} handleTargetClick={this.handleClick} name={civilianImage} src={src} style={style} />
          })}
          <Soldier fireDirection={"LEFT"} image={SoldierImages.CrawlingLeftSoldier} characterState={this.state.characterState} sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} />
          <Soldier fireDirection={"RIGHT"} image={SoldierImages.RightSoldier} characterState={this.state.characterState} sendSoldierBulletCoordinates={this.coordinatesToHandleCollision} />
          <Character sendPlayerCoordinates={this.sendPlayerCoordinates} sendPlayerBulletCoordinates={this.coordinatesToHandleCollision} characterState={this.state.characterState} />
        </div>
      )
    }
}

export default SinglePlayerGame;
