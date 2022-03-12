import React, { Component } from 'react';
import Pistol from '../Images/Pistol/';


let attackMissile = [];

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
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('mousemove', this.handleMouseEvent);
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('click', this.handleClick);
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

        switch (this.state.image.direction) {

            case 'UP':

              return;

            case 'RIGHT':

              const newFireBulletLeftState = 40/this.state.windowWidthState * 100 + this.state.leftState;
              const newFireBulletTopState = 18 / this.state.windowHeightState * 100 + this.state.topState;
              this.setState({
                fireBullet: true,
                fireBulletLeftState: newFireBulletLeftState,
                fireBulletTopState: newFireBulletTopState,
              }, () => {

                let fireBulletBelow;

                if (this.state.fireTargetTopState > newFireBulletTopState) {
                    fireBulletBelow = true;
                } else {
                    fireBulletBelow = false;
                }

                const bulletLeftState =  10 / this.state.windowWidthState * 100;
                const diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);
                
                attackMissile.push(setInterval(
                    () => this.setState({
                        fireBulletLeftState: this.state.fireBulletLeftState + (bulletLeftState),
                        // fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (5 / this.state.windowHeightState * 100) : this.state.fireBulletTopState - (5 / this.state.windowHeightState * 100),
                        fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween),
                    }, () => {
                        if (this.state.fireTargetLeftState < this.state.fireBulletLeftState) {
                                clearInterval(attackMissile.pop());
                                this.setState({
                                    fireBullet: false,
                                })
                        }
                    })
                ))
              });
              return;

            case 'DOWN':

              return;

            case 'LEFT':

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

        default:
          return;
        }
    }

    render() {
        return (
          <React.Fragment>
            <img src={this.state.image.src} style={{ ...this.state.image.style, top: `${this.state.topState}%`, left: `${this.state.leftState}%`, position: 'absolute' }}/>
            <img src={Pistol.RedTarget.src} style={{ ...Pistol.RedTarget.style, top: `${this.state.targetTopState}%`, left: `${this.state.targetLeftState}%`, position: 'absolute' }}/>
            { this.state.fireBullet ? <img src={Pistol.PistolBullet.src} style={{ ...Pistol.PistolBullet.style, left: `${this.state.fireBulletLeftState}%`, top: `${this.state.fireBulletTopState}%`, position: 'absolute' }}  /> : null } 
        </React.Fragment>
      )
    }
}

export default Character;
