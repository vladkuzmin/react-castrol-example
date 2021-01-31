import React, { Component } from 'react'

import { connect } from 'react-redux'
 
class Video extends Component {
    constructor(props) {
        super(props)
        this.animation = null
        this.state = {
            duration: 0,
            currentTime: 0,
            totalTime: 0,
            paused: false,
            ended: false,
            muted: props.muted || false,
            autoPlay: this.props.autoPlay || false,
            volume: props.volume || 1,
            playbackRate: props.playbackRate || 1
        }
    }

    componentDidMount() {
        const video = document.querySelector(this.props.id ? `#${this.props.id}` : '.video video')

        this.handleCurrentTime(video)
        this.handleTotalTime(video)
        this.handleSpeed(video)

        video.addEventListener('ended', () => {
            if (!this.props.loop) {
                this.handleEnd(video)
                video.currentTime = 0
            }
        })
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animation)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.playbackRate !== this.state.playbackRate) {
            this.setState({
                playbackRate: newProps.playbackRate > 2 ? 2 : newProps.playbackRate
            })
            this.handleSpeed(document.querySelector(this.props.id ? `#${this.props.id}` : '.video video'))
        }
    }

    handleSpeed = (video) => {
        video.playbackRate = this.state.playbackRate
    }

    broadcastCurrent = () => {
        this.props.updateVideo(this.state.currentTime);
    }

    handleCurrentTime(video) {
        if (this.state.ended) {
            cancelAnimationFrame(this.animation)
            return
        }

        this.animation = requestAnimationFrame(() => {
            this.handleCurrentTime(video)
        })

        if(this.props.updateVideo) {
            this.broadcastCurrent()
        }
        
        this.setState({
            currentTime: video.currentTime
        })
    }

    broadcastTotal = () => {
        this.props.videoTotal(this.state.totalTime);
    }

    handleTotalTime = (video) => {
        if(this.props.videoTotal) {
            video.onloadedmetadata = () => {
                this.setState({
                    totalTime: video.duration
                })

                this.broadcastTotal()
            }
        }
    }

    handlePause(el) {
        this.setState({
            paused: !this.state.paused
        })
    }

    handleEnd(el) {
        this.setState({
            ended: !this.state.ended
        })

        if (this.props.onFinish) { 
            this.props.onFinish(true)
        }
    }

    render() {
        return (
            <div className={`video ${this.props.className ? this.props.className : 'video-bg'}`} >
                <video
                    id          = { this.props.id }
                    autoPlay    = { this.state.autoPlay } 
                    playsInline = { this.state.autoPlay } 
                    muted       = { this.props.isMuted ? this.props.isMuted : this.props.muted }
                    poster      = { this.props.poster }
                    loop        = { this.props.loop }
                >
                    <source 
                        src={this.props.mp4} 
                        type="video/mp4"
                    />
                </video>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        muted: state.muted
    }
}

// export default Video;
export default connect(mapStateToProps) (Video)