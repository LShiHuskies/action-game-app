import React, { Component } from 'react';



const CIVILIAN_INTERVALS = {
    NativeAmericanNurse: [],
    CarlJohnson: [],
}

class Civilian extends Component {

    constructor(props) {
        super(props);

        this.state = {
            top: props.style.top[0],
            left: props.style.left[0],
            name: props.name,
            topIndexes: props.style.top.slice(1),
            leftIndexes: props.style.left.slice(1),
        }
    }

    componentDidMount() {
        CIVILIAN_INTERVALS[this.props.name].push(setInterval(() => {
            this.handleInterval();
        }, 1000));
        window.addEventListener('click', this.handleClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickEvent);
    }

    handleClickEvent = () => {
        clearInterval(CIVILIAN_INTERVALS[this.props.name].pop());
        this.props.handleTargetClick(this.state);
        setTimeout(() => {
            CIVILIAN_INTERVALS[this.props.name].push(setInterval(() => {
                this.handleInterval();
            }, 1000));
        }, 1000);
    }

    handleInterval = () => {

        if (this.state.topIndexes.length && this.state.leftIndexes.length) {
            this.setState({
                top: this.state.topIndexes[0],
                left: this.state.leftIndexes[0],
                topIndexes: this.state.topIndexes.slice(1),
                leftIndexes: this.state.leftIndexes.slice(1),
            });
        } else {
            this.setState({
                top: this.props.style.top[0],
                left: this.props.style.left[0],
                topIndexes: this.props.style.top.slice(1),
                leftIndexes: this.props.style.left.slice(1),
            });
        }

    }

    render() {
        return <img src={this.props.src} style={{ ...this.props.style, left: `${this.state.left}%`, top: `${this.state.top}%` }} />
    }
}

export default Civilian;
