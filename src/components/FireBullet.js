import React, { Component, Fragment } from 'react';



const INTERVAL_OBJECT = {};

class FireBullet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireBulletLeftState: props.fireBulletLeftState,
      fireBulletTopState: props.fireBulletTopState,
      fireTargetTopState: props.fireTargetTopState,
      fireTargetLeftState: props.fireTargetLeftState,
      src: props.src,
    }
  }

  componentDidMount() {
    let diffBetween;
    let bulletTopState;
    let bulletLeftState;
    INTERVAL_OBJECT[this.props.uuidGenerated] = [];
    INTERVAL_OBJECT[this.props.uuidGenerated].push(setInterval(() => {

    switch(this.props.fireDirection) {

      case 'RIGHT':
        bulletLeftState =  2 / this.props.windowWidthState * 100;
        diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);

        this.setState({
            fireBulletLeftState: this.state.fireBulletLeftState + bulletLeftState,
            fireBulletTopState: this.props.fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween)
        }, () => {
            if (this.props.fireTargetLeftState < this.state.fireBulletLeftState) {
              this.props.handleUnmountComponent(this.props.uuidGenerated, { left: this.state.fireTargetLeftState, top: this.state.fireTargetTopState });
            }
        });
        return;

      case 'UP':

      bulletTopState = 2/this.props.windowHeightState * 100;
      diffBetween = Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState)/Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState);

      this.setState({
        fireBulletTopState: this.state.fireBulletTopState - bulletTopState,
        fireBulletLeftState: this.props.fireBulletRight ? this.state.fireBulletLeftState + (bulletTopState * diffBetween) : this.state.fireBulletLeftState - (bulletTopState * diffBetween),
    }, () => {
        if (this.props.fireTargetTopState > this.state.fireBulletTopState) {
          this.props.handleUnmountComponent(this.props.uuidGenerated, { left: this.state.fireTargetLeftState, top: this.state.fireTargetTopState });
        }
    });
    return;

    case 'DOWN':
        bulletTopState = 2/this.props.windowHeightState * 100;
        diffBetween = Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState)/Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState);

        this.setState({
            fireBulletTopState: this.state.fireBulletTopState + bulletTopState,
            fireBulletLeftState: this.props.fireBulletRight ? this.state.fireBulletLeftState + (bulletTopState * diffBetween) : this.state.fireBulletLeftState - (bulletTopState * diffBetween),
        }, () => {
            if (this.props.fireTargetTopState < this.state.fireBulletTopState) {
              this.props.handleUnmountComponent(this.props.uuidGenerated, { left: this.state.fireTargetLeftState, top: this.state.fireTargetTopState });
            }
        });

      return;


    case 'LEFT':
    
        bulletLeftState =  2 / this.props.windowWidthState * 100;
        diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);

        this.setState({
            fireBulletLeftState: this.state.fireBulletLeftState - (bulletLeftState),
            // fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (5 / this.state.windowHeightState * 100) : this.state.fireBulletTopState - (5 / this.state.windowHeightState * 100),
            fireBulletTopState: this.props.fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween),
        }, () => {
            if (this.props.fireTargetLeftState > this.state.fireBulletLeftState) {
              this.props.handleUnmountComponent(this.props.uuidGenerated, { left: this.state.fireTargetLeftState, top: this.state.fireTargetTopState });
            }
        });
    return;


    case 'LEFT-TANK':
        bulletLeftState =  2 / this.props.windowWidthState * 100;
        diffBetween = Math.abs(this.state.fireTargetTopState - this.state.fireBulletTopState)/Math.abs(this.state.fireTargetLeftState - this.state.fireBulletLeftState);

        this.setState({
            fireBulletLeftState: this.state.fireBulletLeftState - (bulletLeftState),
            // fireBulletTopState: fireBulletBelow ? this.state.fireBulletTopState + (5 / this.state.windowHeightState * 100) : this.state.fireBulletTopState - (5 / this.state.windowHeightState * 100),
            fireBulletTopState: this.props.fireBulletBelow ? this.state.fireBulletTopState + (bulletLeftState * diffBetween)  : this.state.fireBulletTopState - (bulletLeftState * diffBetween),
        }, () => {
            if (this.props.fireTargetLeftState > this.state.fireBulletLeftState) {
              this.props.handleUnmountComponent('LEFT-TANK', { left: this.state.fireTargetLeftState, top: this.state.fireTargetTopState });
            }
        });
      return;


      default:
        return;
    }

    }, 1));
  }

  componentWillUnmount() {
    clearInterval(INTERVAL_OBJECT[this.props.uuidGenerated].pop());
  }

  render() {
    return (
      <Fragment>
        <img src={this.state.src} style={{ ...this.props.style,
          top: `${this.state.fireBulletTopState}%`, left: `${this.state.fireBulletLeftState}%`, position: 'absolute' }}
        />
        <img src={this.props.shotTarget.src} style={{ ...this.props.shotTarget.style,
          top: `${this.props.fireTargetTopState}%`, left: `${this.props.fireTargetLeftState - .25}%`, position: 'absolute' }}
        />
      </Fragment>
    );
  }
}

export default FireBullet;
