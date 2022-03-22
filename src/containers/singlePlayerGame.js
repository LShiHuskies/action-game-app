import React, { Component } from 'react';
import CivilianImages from '../Images/Civilian';
import Backgrounds from '../Images/CampaignBackgrounds';
import Character from '../components/Character';
import Civilian from '../components/Civilian';
import SoliderImages from '../Images/Soldier';
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



    render() {
      return (
        <div style={{ backgroundImage: `url(${Backgrounds.Version1.src})`, backgroundPosition: 'center',
                        backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute' }}>
          {Object.keys(this.state.civilianImages).map(civilianImage => {
            const { src, style, alive } = this.state.civilianImages[civilianImage];

            if (!alive) return null;

            return <Civilian handleTargetClick={this.handleClick} name={civilianImage} src={src} style={style} />
          })}
          <Soldier image={SoliderImages} />
          <Character />
        </div>
      )
    }
}

export default SinglePlayerGame;
