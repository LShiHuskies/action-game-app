import React, { Component } from 'react';


const SOLDIER_INTERVALS = {
    CrawlingLeftSoldier: [],
}


class Soldier extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allCoordinates: props.image.CrawlingLeftSoldier.coordinates.slice(1),
            name: props.image.CrawlingLeftSoldier.name,
            coordinates: props.image.CrawlingLeftSoldier.coordinates[0],
        }
    }

    componentDidMount() {
        SOLDIER_INTERVALS[this.state.name].push(setInterval(() => {
            this.handleSoldierMovements();
        }, 1500));
    }

    handleSoldierMovements = () => {
        if (this.state.allCoordinates.length) {
            this.setState({ coordinates: this.state.allCoordinates[0], allCoordinates: this.state.allCoordinates.slice(1) });
        } else {
            this.setState({
                coordinates: this.props.image.CrawlingLeftSoldier.coordinates[this.props.image.CrawlingLeftSoldier.coordinates.length-1], allCoordinates: [...this.props.image.CrawlingLeftSoldier.coordinates].reverse()
            });
        }
    }


    render() {
        return <img src={this.props.image.CrawlingLeftSoldier.src} style={{ width: '70px', height: '40px', position: 'absolute', ...this.state.coordinates }} />
    }
}

export default Soldier;


