import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FireBullet from './FireBullet';



import SniperImages from '../Images/Sniper';



const SNIPER_INTERVAL = [];


class Sniper extends Component {
  constructor(props){
    super(props);

    this.state = {
      fireDirection: 'LEFT',
      fireBullet: false,
      display: false,
      targetTopState: 0,
      targetLeftState: 0,
      bulletLeftState: 0,
      bulletTopState: 0,
      top: 0,
      left: 0,
      targetImage: SniperImages.SniperTarget,
      sniperImage: SniperImages.SniperLeft.src,
    }
  }


  componentWillReceiveProps(currProps) {

    const { playerCoordinates } = currProps;
    console.log(playerCoordinates);

    // if character is less than 50 left, displaay left image


    // if character is more, display right image





    if (this.state.fireBullet || !Object.keys(playerCoordinates).length || Object.keys(playerCoordinates).length < 2) {
        return;
    }

    const topCoord = Math.random() * 70 + 10;
    let leftCoord;
    let fireDirection;

    let newFireBulletLeftState;
    let newFireBulletTopState;
    let newFireTargetTopState;
    let newFireTargetLeftState;
    let fireBulletBelow;



    if (playerCoordinates.leftState < 50) {

        fireDirection = "LEFT";
        leftCoord = 95;
        // const topCoord = Math.random() * 100;
    //   this.setState({
    //     fireDirection: 'LEFT',
    //   });

        // newFireBulletLeftState = this.state.left;
        // newFireBulletTopState = 18 / playerCoordinates.windowHeightState * 100 + this.state.top;

        // newFireTargetTopState = playerCoordinates.topState;

        // newFireTargetLeftState = playerCoordinates.leftState;

        // if (newFireTargetTopState > newFireBulletTopState) {
        //     fireBulletBelow = true;
        // } else {
        //     fireBulletBelow = false;
        // }

  this.setState({
    fireDirection: fireDirection,
    top: topCoord,
    left: leftCoord,
    display: true,
    sniperImage: SniperImages.SniperLeft.src,
  }, () => {

    newFireBulletLeftState = this.state.left;
    newFireBulletTopState = 18 / playerCoordinates.windowHeightState * 100 + this.state.top;

    newFireTargetTopState = playerCoordinates.topState;

    newFireTargetLeftState = playerCoordinates.leftState;

    if (newFireTargetTopState > newFireBulletTopState) {
        fireBulletBelow = true;
    } else {
        fireBulletBelow = false;
    }


    this.setState({
        fireBullet: {
        fireDirection: fireDirection, fireBulletLeftState: newFireBulletLeftState, fireBulletTopState: newFireBulletTopState, fireBulletBelow,
        fireTargetTopState: newFireTargetTopState, fireTargetLeftState: newFireTargetLeftState, windowWidthState: playerCoordinates.windowWidthState,
        windowHeightState: playerCoordinates.windowHeightState, uuidGenerated: uuidv4(), style:  { width: '20px', height: '20px', transform: 'rotate(180deg)' },
        src: SniperImages.SniperBullet.src, shotTarget: this.state.targetImage
        },
    }, () => {
        setTimeout(() => {
            this.setState({
                display: false,
            });
        }, 1000);
    }); 
});
       


    } else if (playerCoordinates.leftState >= 50) {
        fireDirection = "RIGHT";
        leftCoord = 20;

        this.setState({
          fireDirection: fireDirection,
          top: topCoord,
          left: leftCoord,
          display: true,
          sniperImage: SniperImages.SniperRight.src,
        }, () => {

            newFireBulletLeftState = this.state.left;
            newFireBulletTopState = 18 / playerCoordinates.windowHeightState * 100 + this.state.top;
        
            newFireTargetTopState = playerCoordinates.topState;
        
            newFireTargetLeftState = playerCoordinates.leftState;
        
            if (newFireTargetTopState > newFireBulletTopState) {
                fireBulletBelow = true;
            } else {
                fireBulletBelow = false;
            }


            this.setState({
                fireBullet: {
                fireDirection: fireDirection, fireBulletLeftState: newFireBulletLeftState, fireBulletTopState: newFireBulletTopState, fireBulletBelow,
                fireTargetTopState: newFireTargetTopState, fireTargetLeftState: newFireTargetLeftState, windowWidthState: playerCoordinates.windowWidthState,
                windowHeightState: playerCoordinates.windowHeightState, uuidGenerated: uuidv4(), style:  { width: '20px', height: '20px' },
                src: SniperImages.SniperBullet.src, shotTarget: this.state.targetImage
                },
            }, () => {
                setTimeout(() => {
                  this.setState({
                    display: false,
                  });
                }, 1000);
            });
        });


    }


  }


  
  handleUnmountFireBullet = (e, coordinates) => {
    this.setState({
      fireBullet: false,
    }, () => {
          const sniperBulletCoord = { sniperBullet: coordinates };
          this.props.sendSniperBulletCoordinates(sniperBulletCoord);
    });
  }




  render() {
    return (
      <Fragment>
        <img src={this.state.targetImage.src}
          style={{ position: 'absolute', width: '0px', height: '0px', display: 'none',
          top: `${this.state.targetTopState}%`, left: `${this.state.targetLeftState}%` }}
        />
        { this.state.display ? <img src={this.state.sniperImage}
          style={{ position: 'absolute', width: '40px', height: '70px', top: `${this.state.top}%`, left: `${this.state.left}%` }}
        /> : null }
        { this.state.fireBullet ? <FireBullet { ...this.state.fireBullet } handleUnmountComponent={this.handleUnmountFireBullet} /> : null }
      </Fragment>
    )
  }

}


export default Sniper;
