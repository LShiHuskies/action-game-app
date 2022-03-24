import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Pistol from '../Images/Pistol/';
import HealthBar from './HealthBar';
import FireBullet from './FireBullet';


let PLAYERCOORDINATE_INTERVAL = [];

class Character extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            image: Pistol.RightImage,
            keyCodeState: null,
            topState: 40,
            leftState: 10,
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
            playerHealth: 100,
            AmmoLeft: Pistol.BulletAmmoIcon.AmmoLeft,
            accuracyBar: null,
            fireBullets: [],
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('mousemove', this.handleMouseEvent);
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('click', this.handleClick);
        PLAYERCOORDINATE_INTERVAL.push(setInterval(() => {
            this.props.sendPlayerCoordinates(this.state);
        }, 8000));
    }

    componentWillReceiveProps(currProps) {
        const { characterState } = currProps;

        if (characterState && characterState.soldierBullet) {
            const { soldierBullet } = characterState;
            if (soldierBullet.left >= this.state.leftState && soldierBullet.left <= this.state.leftState + (40/window.innerWidth * 100) 
            && (soldierBullet.top >= this.state.topState && soldierBullet.top <= this.state.topState + (70/window.innerHeight) * 100)) {
            //   const newLeftState = this.state.leftState - 3 > 0 ? this.state.leftState - 3 : 0;
              const newPlayerHealth = this.state.playerHealth - 10 > 0 ? this.state.playerHealth - 10 : 0;
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
                const newPlayerHealth = this.state.playerHealth - 25 > 0 ? this.state.playerHealth- 25 : 0;
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
        }
    }

    componentDidUpdate() {
        if (this.state.playerHealth === 0) {
            
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('mousemove', this.handleMouseEvent);
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('click', this.handleClick);
    }

    handleClick = () => {
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
            alert('please reload');
            return;
        }

        this.setState({ AmmoRound: Array.from({ length: newAmmoRound }) });


        let newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
        let newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

        let fireBulletBelow;
        let fireBulletRight;

        switch (this.state.image.direction) {

            case 'UP':

            newFireBulletLeftState = 20/this.state.windowWidthState * 100 + this.state.leftState;
            newFireBulletTopState = this.state.topState;

            if (this.state.fireTargetLeftState > newFireBulletLeftState) {
                fireBulletRight = true;
            } else {
                fireBulletRight = false;
            }

            this.setState({
                fireBullet: true,
                fireBullets: [ ...this.state.fireBullets,
                    { fireDirection: 'UP', fireBulletLeftState: newFireBulletLeftState,
                      fireBulletTopState: newFireBulletTopState, fireBulletRight, fireTargetTopState: this.state.fireTargetTopState,
                      fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                      windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } } ]
              });

            // this.setState({
            //     fireBullet: true,
            //     fireBulletLeftState: newFireBulletLeftState,
            //     fireBulletTopState: newFireBulletTopState,
            //   }, () => {

            //     // let fireBulletRight;

            //     // if (this.state.fireTargetLeftState > newFireBulletLeftState) {
            //     //     fireBulletRight = true;
            //     // } else {
            //     //     fireBulletRight = false;
            //     // }

            //     // const bulletLeftState =  1 / this.state.windowWidthState * 100;
            //     const bulletTopState = 2/this.state.windowHeightState * 100;
            //     const diffBetween = Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState)/Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState);
                
            //     attackMissile.push(setInterval(
            //         () => this.setState({
            //             fireBulletTopState: this.state.fireBulletTopState - bulletTopState,
            //             fireBulletLeftState: fireBulletRight ? this.state.fireBulletLeftState + (bulletTopState * diffBetween) : this.state.fireBulletLeftState - (bulletTopState * diffBetween),
            //         }, () => {
            //             if (this.state.fireTargetTopState > this.state.fireBulletTopState) {
            //                     clearInterval(attackMissile.pop());
            //                     this.setState({
            //                         fireBullet: false,
            //                     })
            //             }
            //         })
            //     ))
            //   });

              return;

            case 'RIGHT':

            //   newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
            //   newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

            //   this.setState({
            //     fireBullet: true,
            //     fireBulletLeftState: newFireBulletLeftState,
            //     fireBulletTopState: newFireBulletTopState,
            //   }, () => {

            //     let fireBulletBelow;

            //     if (this.state.fireTargetTopState > newFireBulletTopState) {
            //         fireBulletBelow = true;
            //     } else {
            //         fireBulletBelow = false;
            //     }

            //     const bulletLeftState =  2 / this.state.windowWidthState * 100;
            //     const diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);
                
            //     attackMissile.push(setInterval(
            //         () => this.setState({
            //             fireBulletLeftState: this.state.fireBulletLeftState + (bulletLeftState),
            //             // fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (5 / this.state.windowHeightState * 100) : this.state.fireBulletTopState - (5 / this.state.windowHeightState * 100),
            //             fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween),
            //         }, () => {
            //             if (this.state.fireTargetLeftState < this.state.fireBulletLeftState) {
            //                     clearInterval(attackMissile.pop());
            //                     this.setState({
            //                         fireBullet: false,
            //                     })
            //             }
            //         })
            //     ))
            //   });


              newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
              newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

                if (this.state.fireTargetTopState > newFireBulletTopState) {
                    fireBulletBelow = true;
                } else {
                    fireBulletBelow = false;
                }

              this.setState({
                fireBullet: true,
                fireBullets: [ ...this.state.fireBullets,
                    { fireDirection: 'RIGHT', fireBulletLeftState: newFireBulletLeftState,
                      fireBulletTopState: newFireBulletTopState, fireBulletBelow, fireTargetTopState: this.state.fireTargetTopState,
                      fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                      windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } } ]
              });

              return;

            case 'DOWN':

            newFireBulletLeftState = 20/this.state.windowWidthState * 100 + this.state.leftState;
            newFireBulletTopState = this.state.topState + (20/this.state.windowHeightState * 100);

            if (this.state.fireTargetLeftState > newFireBulletLeftState) {
                fireBulletRight = true;
            } else {
                fireBulletRight = false;
            }

            this.setState({
              fireBullet: true,
              fireBullets: [ ...this.state.fireBullets,
                { fireDirection: 'DOWN', fireBulletLeftState: newFireBulletLeftState,
                fireBulletTopState: newFireBulletTopState, fireBulletRight, fireTargetTopState: this.state.fireTargetTopState,
                fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } } ]
            });

            // this.setState({
            //     fireBullet: true,
            //     fireBulletLeftState: newFireBulletLeftState,
            //     fireBulletTopState: newFireBulletTopState,
            //   }, () => {

            //     let fireBulletRight;

            //     if (this.state.fireTargetLeftState > newFireBulletLeftState) {
            //         fireBulletRight = true;
            //     } else {
            //         fireBulletRight = false;
            //     }

            //     // const bulletLeftState =  1 / this.state.windowWidthState * 100;
            //     const bulletTopState = 2/this.state.windowHeightState * 100;
            //     const diffBetween = Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState)/Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState);
                
            //     attackMissile.push(setInterval(
            //         () => this.setState({
            //             fireBulletTopState: this.state.fireBulletTopState + bulletTopState,
            //             fireBulletLeftState: fireBulletRight ? this.state.fireBulletLeftState + (bulletTopState * diffBetween) : this.state.fireBulletLeftState - (bulletTopState * diffBetween),
            //         }, () => {
            //             if (this.state.fireTargetTopState < this.state.fireBulletTopState) {
            //                     clearInterval(attackMissile.pop());
            //                     this.setState({
            //                         fireBullet: false,
            //                     })
            //             }
            //         })
            //     ))
            //   });


              return;

            case 'LEFT':
                  newFireBulletLeftState = this.state.leftState;
                  newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;

                if (this.state.fireTargetTopState > newFireBulletTopState) {
                    fireBulletBelow = true;
                } else {
                    fireBulletBelow = false;
                }

                this.setState({
                    fireBullet: true,
                    fireBullets: [ ...this.state.fireBullets,
                      { fireDirection: 'LEFT', fireBulletLeftState: newFireBulletLeftState,
                      fireBulletTopState: newFireBulletTopState, fireBulletBelow, fireTargetTopState: this.state.fireTargetTopState,
                      fireTargetLeftState: this.state.fireTargetLeftState, windowWidthState: this.state.windowWidthState,
                      windowHeightState: this.state.windowHeightState, uuidGenerated: uuidv4(), style: { ...this.state.image.PistolBullet.style } } ]
                  });


                // this.setState({
                //     fireBullet: true,
                //     fireBulletLeftState: newFireBulletLeftState,
                //     fireBulletTopState: newFireBulletTopState,
                // }, () => {

                //     let fireBulletBelow;

                //     if (this.state.fireTargetTopState > newFireBulletTopState) {
                //         fireBulletBelow = true;
                //     } else {
                //         fireBulletBelow = false;
                //     }

                //     const bulletLeftState =  2 / this.state.windowWidthState * 100;
                //     const diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);
                    
                //     attackMissile.push(setInterval(
                //         () => this.setState({
                //             fireBulletLeftState: this.state.fireBulletLeftState - (bulletLeftState),
                //             // fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (5 / this.state.windowHeightState * 100) : this.state.fireBulletTopState - (5 / this.state.windowHeightState * 100),
                //             fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween),
                //         }, () => {
                //             if (this.state.fireTargetLeftState > this.state.fireBulletLeftState) {
                //                     clearInterval(attackMissile.pop());
                //                     this.setState({
                //                         fireBullet: false,
                //                     })
                //             }
                //         })
                //     ))
                // });
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
        switch(e.keyCode) {
          case 38:
            // UpImage
            this.setState({
              image: Pistol.UpImage,
            });
            return;

          case 39:
            // RightImage
            this.setState({
              image: Pistol.RightImage,
            });
            return;

          case 40:
            // DownImage
            this.setState({
              image: Pistol.DownImage,
            });
            return;

          case 37:
            // LeftImage
            this.setState({
              image: Pistol.LeftImage,
            });
            return;

          case 65:
          // GO LEFT
            if (this.state.keyCodeState === 65) {
                const newLeftLocation = this.state.leftState - 2 >= 0 ? this.state.leftState - 2 : 0;
                this.setState({
                    leftState: newLeftLocation,
                });
            } else {
                const newLeftLocation = this.state.leftState - 1 >= 0 ? this.state.leftState - 1 : 0;
                this.setState({
                    keyCodeState: 65,
                    leftState: newLeftLocation,
                });
            }
            return;

          case 83:
          // Go Down
            if (this.state.keyCodeState === 83) {
                const windowHeight = 100 - (70 / window.innerHeight * 100);
                const newTopLocation = this.state.topState + 2 <= windowHeight ? this.state.topState + 2 : windowHeight;
                this.setState({
                    topState: newTopLocation,
                });
            } else {
                const windowHeight = 100 - (70 / window.innerHeight * 100);
                const newTopLocation = this.state.topState + 1 <= windowHeight ? this.state.topState + 1 : windowHeight;
                this.setState({
                  topState: newTopLocation,
                  keyCodeState: 83,
                });
            }
            return;

          case 68:
          // GO RIGHT
          const windowWidth = 100 - (40 / window.innerWidth * 100);
            if (this.state.keyCodeState === 68) {
                const newLeftLocation = this.state.leftState + 2 <= windowWidth ? this.state.leftState + 2 : windowWidth;
                this.setState({
                  leftState: newLeftLocation,
                });
            } else {
                const newLeftLocation = this.state.leftState + 1 <= windowWidth ? this.state.leftState + 1 : windowWidth;
                this.setState({
                  left: newLeftLocation,
                  keyCodeState: 68,
                });
            }
            return;

          case 87:
          // GO UP
            if (this.state.keyCodeState === 87) {
                const newTopLocation = this.state.topState - 2 >= 0 ? this.state.topState - 2 : 0;
                this.setState({
                    topState: newTopLocation,
                });
            } else {
                const newTopLocation = this.state.topState - 1 >= 0 ? this.state.topState - 1 : 0;
                this.setState({
                    keyCodeState: 87,
                    topState: newTopLocation,
                });
            }
            return;

          case 82:
            // reload
            const ammoToReload = 8 - this.state.AmmoRound.length;
            const amountLeft = this.state.AmmoLeft - ammoToReload;

            if (ammoToReload > 0 && amountLeft >= 0) {
                this.setState({
                    AmmoLeft: amountLeft,
                    AmmoRound: Array.from({ length: 8 }),
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

        const PlayerCoordinates = { PLAYER: coordinates, DIRECTION: this.state.image.direction };

        this.props.sendPlayerBulletCoordinates(PlayerCoordinates);
    }

    render() {
        return (
          <React.Fragment>
            <HealthBar ammoIcon={this.state.AmmoRound} IMG={this.state.BulletAmmoIcon} ammoLeft={this.state.AmmoLeft} healthBar={this.state.playerHealth} />
            <img src={this.state.image.src} style={{ ...this.state.image.style, top: `${this.state.topState}%`, left: `${this.state.leftState}%`, position: 'absolute' }}/>
            <img src={Pistol.RedTarget.src} style={{ ...Pistol.RedTarget.style, top: `${this.state.targetTopState}%`, left: `${this.state.targetLeftState}%`, position: 'absolute' }}/>
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

export default Character;
