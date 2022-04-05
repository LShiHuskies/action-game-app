import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ActionCable } from 'react-actioncable-provider';

import Pistol from '../Images/Pistol/';
import AssaultRifle from '../Images/AssaultRifle';
import Shotgun from '../Images/Shotgun';
import HealthBar from './HealthBar';
import FireBullet from './FireBullet';

import { moveUserGamePlayer, fireBulletUserGamePlayer, handleEndOfGame } from '../constants/adapter';


let PLAYERCOORDINATE_INTERVAL = [];

class UserGameCharacter extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            allImages: Pistol,
            image: Pistol[props.userGame.direction],
            keyCodeState: null,
            topState: props.userGame.top,
            leftState: props.userGame.left,
            targetTopState: 40,
            targetLeftState: 60,
            windowHeightState: window.innerHeight,
            windowWidthState: window.innerWidth,
            fireBullet: false,
            fireBulletLeftState: (40 / window.innerWidth * 100) + 10,
            fireBulletTopState: (18 / window.innerHeight * 100) + 40,
            fireTargetTopState: 0,
            fireTargetLeftState: 0,
            BulletAmmoIcon: Pistol.BulletAmmoIcon,
            AmmoRound: Array.from({ length: Pistol.BulletAmmoIcon.AmmoRound }),
            playerHealth: props.userGame.health,
            AmmoLeft: 10000,
            accuracyBar: null,
            fireBullets: [],
            Food: 1,
            PerAmmoRound: Pistol.BulletAmmoIcon.AmmoRound,
        }
    }

    componentDidMount() {
        if (this.props.selfUserGame.id === this.props.userGame.id) {
            window.addEventListener('keydown', this.handleKeyDown);
            window.addEventListener('mousemove', this.handleMouseEvent);
            window.addEventListener('resize', this.handleWindowResize);
            window.addEventListener('click', this.handleClick);
        }
        // PLAYERCOORDINATE_INTERVAL.push(setInterval(() => {
        //     this.props.sendPlayerCoordinates(this.state);
        // }, 8000/(this.props.game.difficulty || 1)));

        // PLAYERCOORDINATE_INTERVAL.push(setInterval(() => {
        //   // send playercoordinates to sniper
        //   this.props.sendCoordinatesToSniper(this.state);
        // }, 6000));

        // const { backup_supply, weapon } = this.props.game;


        // switch(weapon) {
        //   case "Shotgun":
        //     switch(backup_supply) {
        //       case "Ammunition":
        //         this.setState({
        //           AmmoLeft: Shotgun.ShotgunAmmoIcon.AmmoLeft * 2,
        //           image: Shotgun.RightImage,
        //           AmmoRound: Array.from({ length: Shotgun.ShotgunAmmoIcon.AmmoRound }),
        //           PerAmmoRound: Shotgun.ShotgunAmmoIcon.AmmoRound,
        //           allImages: Shotgun,
        //         });
        //         return;

        //       case "MedPack":
        //         this.setState({
        //           AmmoLeft: Shotgun.ShotgunAmmoIcon.AmmoLeft,
        //           image: Shotgun.RightImage,
        //           playerHealth: this.state.playerHealth * 1.5,
        //           AmmoRound: Array.from({ length: Shotgun.ShotgunAmmoIcon.AmmoRound }),
        //           PerAmmoRound: Shotgun.ShotgunAmmoIcon.AmmoRound,
        //           allImages: Shotgun,
        //         });
        //         return;

        //       case "Food":
        //         this.setState({
        //           AmmoLeft: Shotgun.ShotgunAmmoIcon.AmmoLeft,
        //           image: Shotgun.RightImage,
        //           Food: 1.5,
        //           AmmoRound: Array.from({ length: Shotgun.ShotgunAmmoIcon.AmmoRound }),
        //           PerAmmoRound: Shotgun.ShotgunAmmoIcon.AmmoRound,
        //           allImages: Shotgun,
        //         });
        //         return;
        //     }
        //     return;

        //   case "Assault Rifle":
        //     switch(backup_supply) {
        //         case "Ammunition":
        //           this.setState({
        //             AmmoLeft: AssaultRifle.BulletAmmoIcon.AmmoLeft * 2,
        //             image: AssaultRifle.RightImage,
        //             AmmoRound: Array.from({ length: AssaultRifle.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: AssaultRifle.BulletAmmoIcon.AmmoRound,
        //             allImages: AssaultRifle,
        //           });
        //         return;

        //         case "MedPack":
        //           this.setState({
        //             AmmoLeft: Pistol.BulletAmmoIcon.AmmoLeft,
        //             image: AssaultRifle.RightImage,
        //             playerHealth: this.state.playerHealth * 1.5,
        //             AmmoRound: Array.from({ length: AssaultRifle.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: AssaultRifle.BulletAmmoIcon.AmmoRound,
        //             allImages: AssaultRifle,
        //           });
        //         return;

        //         case "Food":
        //           this.setState({
        //             AmmoLeft: AssaultRifle.BulletAmmoIcon.AmmoLeft,
        //             image: AssaultRifle.RightImage,
        //             Food: 1.5,
        //             AmmoRound: Array.from({ length: AssaultRifle.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: AssaultRifle.BulletAmmoIcon.AmmoRound,
        //             allImages: AssaultRifle,
        //           });
        //         return;
        //     }
        //     return;

        //   case "Pistol":
        //     switch(backup_supply) {
        //         case "Ammunition":
        //           this.setState({
        //             AmmoLeft: Pistol.BulletAmmoIcon.AmmoLeft * 2,
        //             image: Pistol.RightImage,
        //             AmmoRound: Array.from({ length: Pistol.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: Pistol.BulletAmmoIcon.AmmoRound,
        //             allImages: Pistol,
        //           });
        //         return;

        //         case "MedPack":
        //           this.setState({
        //             AmmoLeft: Pistol.BulletAmmoIcon.AmmoLeft,
        //             image: Pistol.RightImage,
        //             playerHealth: this.state.playerHealth * 1.5,
        //             AmmoRound: Array.from({ length: Pistol.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: Pistol.BulletAmmoIcon.AmmoRound,
        //             allImages: Pistol,
        //           });
        //         return;

        //         case "Food":
        //           this.setState({
        //             AmmoLeft: Pistol.BulletAmmoIcon.AmmoLeft,
        //             image: Pistol.RightImage,
        //             Food: 1.5,
        //             AmmoRound: Array.from({ length: Pistol.BulletAmmoIcon.AmmoRound }),
        //             PerAmmoRound: Pistol.BulletAmmoIcon.AmmoRound,
        //             allImages: Pistol,
        //           });
        //         return;
        //     }
        //     return;

        //   default:
        //     return;
        // }

    }

    componentWillReceiveProps(currProps) {
        const { characterState, otherUserGameBulletCoordinates } = currProps;

        if (characterState && characterState.soldierBullet) {
            const { soldierBullet } = characterState;
            if (soldierBullet.left >= this.state.leftState && soldierBullet.left <= this.state.leftState + (40/window.innerWidth * 100) 
            && (soldierBullet.top >= this.state.topState && soldierBullet.top <= this.state.topState + (70/window.innerHeight) * 100)) {
            //   const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              const newPlayerHealth = this.state.playerHealth - 10/this.state.Food > 0 ? this.state.playerHealth - 10/this.state.Food : 0;
              this.setState({
                playerHealth: newPlayerHealth,
                // leftState: newLeftState,
              });
            }
            
  
            return;
        } else if (characterState && characterState.soldierExplosion) {
            const { soldierExplosion } = characterState;

            const widthPercent = 180/window.innerWidth * 100;
            const heightPercent = 180/window.innerHeight * 100;


            if ((this.state.leftState + (40/window.innerWidth * 100) <= soldierExplosion.left + widthPercent && this.state.leftState >= soldierExplosion.left)
            && (this.state.topState >= soldierExplosion.top && this.state.topState + (70/window.innerHeight * 100) <= soldierExplosion.top + heightPercent)) {
                const newPlayerHealth = this.state.playerHealth - 25/this.state.Food > 0 ? this.state.playerHealth- 25/this.state.Food : 0;
                const newLeftState = this.state.leftState + 10 > 0 ? this.state.leftState + 10 : 0;
                const newTopState = this.state.topState + 10 > 0 ? this.state.topState + 10 : 0;
                this.setState({
                  playerHealth: newPlayerHealth,
                  leftState: newLeftState,
                  topState: newTopState,
                }, () => {
                  setTimeout(() => {
                    const newLeftState = this.state.leftState - 10 > 0 ? this.state.leftState - 10 : 0;
                    const newTopState = this.state.topState - 10 > 0 ? this.state.topState - 10 : 0;

                    this.setState({
                        leftState: newLeftState,
                        topState: newTopState,
                    });
                  }, 1000);
                });
            }

            return;
        } else if (characterState && characterState.sniperBullet) {
            const { sniperBullet } = characterState;
            if (sniperBullet.left >= this.state.leftState && sniperBullet.left <= this.state.leftState + (40/window.innerWidth * 100) 
            && (sniperBullet.top >= this.state.topState && sniperBullet.top <= this.state.topState + (70/window.innerHeight) * 100)) {
            //   const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              const newPlayerHealth = this.state.playerHealth - 10/this.state.Food > 0 ? this.state.playerHealth - 10/this.state.Food : 0;
              this.setState({
                playerHealth: newPlayerHealth,
                // leftState: newLeftState,
              });
            }

            return;
        } else if (otherUserGameBulletCoordinates && otherUserGameBulletCoordinates.USERGAMEID) {
            const { PLAYER } = otherUserGameBulletCoordinates;

            if (PLAYER.left >= this.state.leftState && PLAYER.left <= this.state.leftState + (40/window.innerWidth * 100) 
            && (PLAYER.top >= this.state.topState && PLAYER.top <= this.state.topState + (70/window.innerHeight) * 100)) {
            //   const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              const newPlayerHealth = this.state.playerHealth - 10;

              moveUserGamePlayer(this.props.selfUserGame, { health: newPlayerHealth });

            }
        }
    }

    componentDidUpdate() {
      if (this.state.playerHealth <= 0) {
        handleEndOfGame(this.props.userGame, { score: 1 });
      }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('mousemove', this.handleMouseEvent);
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('click', this.handleClick);
        while(PLAYERCOORDINATE_INTERVAL.length) {
            clearInterval(PLAYERCOORDINATE_INTERVAL.pop());
        }
    }

    handleClick = async () => {
        if (this.state.fireBullet) {
            return;
        }

        const newFireTargetTopState = this.state.targetTopState;
        const newFireTargetLeftState = this.state.targetLeftState;

        this.setState({
            fireTargetTopState: newFireTargetTopState,
            fireTargetLeftState: newFireTargetLeftState,
        });

        const newAmmoRound = this.state.AmmoRound.length - 1;

        if (newAmmoRound < 0) {
            console.log('no ammo');
            return;
        }

        this.setState({ AmmoRound: Array.from({ length: newAmmoRound }) });


        let newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
        let newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

        let fireBulletBelow;
        let fireBulletRight;
        let stateObj;

        switch (this.state.image.direction) {

            case 'UP':

            newFireBulletLeftState = 20/this.state.windowWidthState * 100 + this.state.leftState;
            newFireBulletTopState = this.state.topState;

            if (this.state.fireTargetLeftState > newFireBulletLeftState) {
                fireBulletRight = true;
            } else {
                fireBulletRight = false;
            }

              stateObj = {
                fireBullet: true,
                fireBullets: { fireDirection: 'UP', fireBulletLeftState: newFireBulletLeftState,
                      fireBulletTopState: newFireBulletTopState, fireBulletRight, fireTargetTopState: this.state.fireTargetTopState,
                      fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                      windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } }
              };

              await fireBulletUserGamePlayer(this.props.userGame, stateObj);

              return;

            case 'RIGHT':

              newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
              newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

                if (this.state.fireTargetTopState > newFireBulletTopState) {
                    fireBulletBelow = true;
                } else {
                    fireBulletBelow = false;
                }

                stateObj = {
                  fireBullet: true,
                  fireBullets: { fireDirection: 'RIGHT', fireBulletLeftState: newFireBulletLeftState,
                    fireBulletTopState: newFireBulletTopState, fireBulletBelow, fireTargetTopState: this.state.fireTargetTopState,
                    fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                    windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } }
                }

                await fireBulletUserGamePlayer(this.props.userGame, stateObj);

              return;

            case 'DOWN':

            newFireBulletLeftState = 20/this.state.windowWidthState * 100 + this.state.leftState;
            newFireBulletTopState = this.state.topState + (20/this.state.windowHeightState * 100);

            if (this.state.fireTargetLeftState > newFireBulletLeftState) {
                fireBulletRight = true;
            } else {
                fireBulletRight = false;
            }

            stateObj = {
              fireBullet: true,
              fireBullets: { fireDirection: 'DOWN', fireBulletLeftState: newFireBulletLeftState,
              fireBulletTopState: newFireBulletTopState, fireBulletRight, fireTargetTopState: this.state.fireTargetTopState,
              fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
              windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } }
            }

            await fireBulletUserGamePlayer(this.props.userGame, stateObj);

              return;

            case 'LEFT':
                  newFireBulletLeftState = this.state.leftState;
                  newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

                if (this.state.fireTargetTopState > newFireBulletTopState) {
                    fireBulletBelow = true;
                } else {
                    fireBulletBelow = false;
                }

                stateObj = {
                    fireBullet: true,
                    fireBullets: { fireDirection: 'LEFT', fireBulletLeftState: newFireBulletLeftState,
                      fireBulletTopState: newFireBulletTopState, fireBulletBelow, fireTargetTopState: this.state.fireTargetTopState,
                      fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                      windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } }
                }

                await fireBulletUserGamePlayer(this.props.userGame, stateObj);

              return;

            default:
              return;
        }
    }

    handleWindowResize = () => {
        if (window.innerHeight !== this.state.windowHeightState || window.innerWidth !== this.state.windowWidthState) {
            this.setState({
                windowHeightState: window.innerHeight,
                windowWidthState: window.innerWidth,
            });
        }
    }

    handleMouseEvent = (e) => {
        const newTargetTopState = (e.y / this.state.windowHeightState * 100) - (10/this.state.windowHeightState * 100);
        const newTargetLeftState = (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100);

        switch (this.state.image.direction) {
            case 'UP':
                if (newTargetTopState >= (this.state.topState - (0/this.state.windowHeightState * 100)) ) {
                    this.setState({
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                } else {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                }
              return;

            case 'RIGHT':
                if (newTargetLeftState <= (this.state.leftState + (35/this.state.windowWidthState * 100)) ) {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                    });
                } else {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                }
                return;

            case 'DOWN':
                if (newTargetTopState <= (this.state.topState + (70/this.state.windowHeightState * 100)) ) {
                    this.setState({
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                } else {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                }
              return;

            case 'LEFT':
                if (newTargetLeftState >= (this.state.leftState - (20/this.state.windowWidthState * 100)) ) {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                    });
                } else {
                    this.setState({
                        targetTopState: (e.y / this.state.windowHeightState * 100) - (10/ this.state.windowHeightState * 100),
                        targetLeftState: (e.x / this.state.windowWidthState * 100) - (10/this.state.windowWidthState * 100),
                    });
                }
              return;

            default:
              return;
        }
    }

    handleKeyDown = (e) => {

        let newLeftLocation;
        let newTopLocation;

        switch(e.keyCode) {
          case 38:
            // UpImage

            moveUserGamePlayer(this.props.selfUserGame, { direction: 'UP' });

            return;

          case 39:
            // RightImage

            moveUserGamePlayer(this.props.selfUserGame, { direction: 'RIGHT' });
            return;

          case 40:
            // DownImage

            moveUserGamePlayer(this.props.selfUserGame, { direction: 'DOWN' });
            return;

          case 37:
            // LeftImage

            moveUserGamePlayer(this.props.selfUserGame, { direction: 'LEFT' });
            return;

          case 65:
          // GO LEFT

            newLeftLocation = this.state.leftState - 2 >= 0 ? this.state.leftState - 2 : 0;
            moveUserGamePlayer(this.props.selfUserGame, { left: newLeftLocation });
            return;

          case 83:
          // Go Down

            const windowHeight = 100 - (70 / window.innerHeight * 100);
            newTopLocation = this.state.topState + 2 <= windowHeight ? this.state.topState + 2 : windowHeight;
            moveUserGamePlayer(this.props.selfUserGame, { top: newTopLocation });
            return;

          case 68:
          // GO RIGHT
          const windowWidth = 100 - (40 / window.innerWidth * 100);

            newLeftLocation = this.state.leftState + 2 <= windowWidth ? this.state.leftState + 2 : windowWidth;
            moveUserGamePlayer(this.props.selfUserGame, { left: newLeftLocation });
            return;

          case 87:
          // GO UP

            newTopLocation = this.state.topState - 2 >= 0 ? this.state.topState - 2 : 0;
            moveUserGamePlayer(this.props.selfUserGame, { top: newTopLocation });
            return;

          case 82:
            // reload
            const ammoToReload = this.state.PerAmmoRound - this.state.AmmoRound.length;
            const amountLeft = this.state.AmmoLeft - ammoToReload;

            if (ammoToReload > 0 && amountLeft >= 0) {
                this.setState({
                    AmmoLeft: amountLeft,
                    AmmoRound: Array.from({ length: this.state.PerAmmoRound }),
                });
            } else if (ammoToReload > 0 && amountLeft < 0 && this.state.AmmoLeft > 0) {
                this.setState({
                    AmmoLeft: 0,
                    AmmoRound: Array.from({ length: this.state.AmmoLeft })
                });
            } else if (ammoToReload > 0 && amountLeft < 0 && this.state.AmmoLeft <= 0) {
                console.log('NOTHING LEFT!!!')
            }
            return;

        default:
          return;
        }
    }

    handleUnmountFireBullet = (e, coordinates) => {
        this.setState({
            fireBullets: this.state.fireBullets.filter(bullet => bullet.uuidGenerated !== e)
         }, () => {
          if (!this.state.fireBullets.length) {
            this.setState({
              fireBullet: false,
            });
          }
        });

        const PlayerCoordinates = { USERGAMEID: this.props.userGame.id, PLAYER: coordinates, DIRECTION: this.state.image.direction };

        this.props.sendPlayerBulletCoordinates(PlayerCoordinates);
    }

    handleUserGameReceived = (data) => {
        if (data.fireBullets && this.props.userGame.id === data.id) {
          this.setState({
            fireBullet: true,
            fireBullets: [ data.fireBullets ]
          });
        } else if (this.props.userGame.id === data.id) {
          this.setState({
            image: Pistol[data.direction],
            leftState: data.left,
            topState: data.top,
            playerHealth: data.health,
          });
        }
    }

    render() {
        return (
          <React.Fragment>
            <ActionCable
              channel={{ channel: 'UserGamesChannel' }}
              onReceived={this.handleUserGameReceived}
            />
            <HealthBar ammoIcon={this.state.AmmoRound} IMG={this.state.BulletAmmoIcon}
                ammoLeft={this.state.AmmoLeft} healthBar={this.state.playerHealth} userGame={this.props.userGame}
                selfUserGame={this.props.selfUserGame}
            />
            <img src={this.state.image.src} style={{ ...this.state.image.style, top: `${this.state.topState}%`, left: `${this.state.leftState}%`, position: 'absolute', zIndex: '5' }}/>
            { this.props.userGame.id === this.props.selfUserGame.id ? <img src={Pistol.RedTarget.src}
                                                                           style={{ ...Pistol.RedTarget.style, top: `${this.state.targetTopState}%`,
                                                                            left: `${this.state.targetLeftState}%`, position: 'absolute', zIndex: '100' }}
                                                                      /> : null }
            { this.state.fireBullets.map(bullet => {
                return <FireBullet key={bullet.uuidGenerated} src={Pistol.PistolBullet.src} shotTarget={Pistol.ShotTarget} {...bullet}
                                    style={{ ...Pistol.PistolBullet.style, ...bullet.style,
                                    left: `${bullet.fireBulletLeftState}%`, top: `${bullet.fireBulletTopState}%`,
                                    position: 'absolute' }} handleUnmountComponent={this.handleUnmountFireBullet} />
            }) }
        </React.Fragment>
      )
    }
}

export default UserGameCharacter;
