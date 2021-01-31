import React, { Component } from 'react'
import { connect } from 'react-redux'
 
class Audio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            autoPlay: props.autoPlay || false,
            volume: props.volume || 1,
            // playbackRate: props.playbackRate || 1
        }
    }

    componentDidMount() {
        const audio = document.querySelector(this.props.id ? `#${this.props.id}` : 'audio')
        this.handleVolume(audio)
        // this.handleSpeed(audio)
    }

    componentWillReceiveProps(newProps) {

        const audio = document.querySelector(this.props.id ? `#${this.props.id}` : 'audio')

        

        if (newProps.volume !== this.state.volume) {
            this.setState({
                volume: newProps.volume > 1 ? 1 : newProps.volume
            })
            this.handleVolume(audio)
        }

        // if (newProps.playbackRate !== this.state.playbackRate) {
        //     this.setState({
        //         playbackRate: newProps.playbackRate
        //     })
        //     this.handleSpeed(audio)
        // }
    }

    handleVolume = (audio) => {
        audio.volume = this.state.volume
    }

    handleSpeed = (audio) => {
        audio.playbackRate = this.state.playbackRate
    }

    render() {
        return (
            <audio 
                id         = { this.props.id }
                loop       = { this.props.loop || false }
                autoPlay   = { this.state.autoPlay }
                playsInline = { this.state.autoPlay }
                muted       = { this.props.muted }
            >
                <source src={`${this.props.src}.mp3`}  type="audio/mpeg"/>
            </audio> 
        )
    }
}

function mapStateToProps(state) {
    return { 
        muted: state.muted
    }
}

// export default Video;
export default connect(mapStateToProps) (Audio)