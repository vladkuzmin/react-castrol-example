import React, { Component } from 'react'
import {ReactComponent as Icon} from '../Icons/replay.svg';

class Replay extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`replay ${this.props.margin === true ? 'margin-top' : ''} ${this.props.marginLarge === true ? 'margin-top-lg' : ''}`}>
                <div className="_icon">
                    <Icon/>
                </div>
                <span>Replay</span>
            </div>
        )
    }
}

export default Replay