import React, { Component }  from 'react';
import GrenadeImages from '../Images/Grenade';




const interval = [];

class Explosion extends Component {

    constructor(props) {
      super(props);

      this.state = {
        width: 40,
        height: 40,
      }
    }

    componentDidMount() {
        interval.push(setInterval(() => {
          this.setState({
            width: this.state.width + 15,
            height: this.state.height + 15,
          }, () => {
            if (this.state.width > 150 || this.state.height > 150) {
              this.props.handleUnmountComponent();
            }
          });
        }, 300));
    }

    componentWillUnmount() {
      clearInterval(interval.pop());
    }


    render() {
      return (
        <img src={GrenadeImages.GrenadeExplosion.src} style={{ width: `${this.state.width}px`, height: `${this.state.height}px`,
                top: `${this.props.top}%`, left: `${this.props.left}%`, position: 'absolute' }} />
      )
    }
}

export default Explosion;
