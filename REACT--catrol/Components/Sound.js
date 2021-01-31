import React, { Component } from 'react'
import { Howl } from 'howler'

import { connect } from 'react-redux';
// import rootReducer from '../reducers/index'
import { setMuted, setPaused } from '../actions/index'

class Sound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMuted: true,
            isHidden: false,
            isSound: false,
            isPause: false
        }

        this.sound = new Howl({
            src: [props.path],
            volume: 0,
            loop: true
        })

        this.sound.play()
    }

    componentWillMount() {
        if (localStorage['castrolEvSound'] !== undefined && (this.props.location.pathname !== '/home' || this.props.location.pathname !== '/')) {
            this.props.setMuted(localStorage['castrolEvSound'] === 'true')
            this.setState({
                isMuted: (localStorage['castrolEvSound'] === 'true')
            })
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.isSound !== this.state.isSound) {
            this.sound.fade(0, .5, 1000)
            this.setState({
                isMuted: false,
                isSound: true
            })
            localStorage['castrolEvSound'] = 'false'
        }
    }

    componentDidMount() {
        if (this.state.isMuted) {
            this.sound.fade(0, 0, 1000)
        } else {
            this.sound.fade(0, .5, 1000)
        }
    }

    checkSound = (isTrue) => {
        if (!isTrue) {
            this.sound.fade(0, .5, 1000)
        } else {
            this.sound.fade(.5, 0, 1000)
        }
    }

    toggle = () => {
        const x = !this.state.isMuted
        this.props.setMuted(x)
        this.setState({ isMuted: x })
        localStorage['castrolEvSound'] = x
        this.checkSound(x)
    }

    render() {
        return (           
            <div className = {`sound ${this.state.isMuted ? 'is-muted' : ''}`} onClick={ this.toggle }>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        muted: state.muted
    }
}

// export default Sound
export default connect(mapStateToProps, { setMuted }) (Sound)