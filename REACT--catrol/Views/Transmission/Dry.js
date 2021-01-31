import React, { Component } from 'react'

import Transition from '../../Components/Transition'
import Audio from '../../Components/Audio'
import Video from '../../Components/Video'
import Videos from '../../Components/Videos'
import Caption from '../../Components/Caption'
import Graphs from '../../Components/Graphs'
import Icon from '../../Components/Icon'
import Summary from '../../Components/Summary'
import Button from '../../Components/Button'
import VideoLoader from '../../Components/VideoLoader'
import Replay from '../../Components/Replay'

class TransmissionDry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: null,
            isLoaded: false,
            isLeave: false,
            isPressSlow: false,
            isGraphs: false,
            isSummary: false,
            isNext: 0,
            speed: 100,
            minSpeed: 20,
            playbackRate: 2,
            volume: 1,
            video: null,
            isGraphsOpacity: false
        }

        this.duration = 2500
        this.isDown = false
        this.timeDown = null
        this.timeUp = null
        this.nextView = '/transmission/menu'

        this.captions = props.content.transmissionDry.captions
        this.summary = props.content.transmissionDry.summary

        this.baseState = this.state
    }

    handleVideoLoad = () => {
        this.setVideo(0)
        this.setState({
            isLoaded: true,
            step: 0,
        })
    }

    setVideo = (inx) => { 
        this.setState({ video: inx })
    }
    

    handleStepDelay = () => {
        this.setState({
            isLeave: true
        })
        setTimeout(() => {
            this.handleStep()
        }, 1100)
    }

    handleStep = (videoIndex = null) => {
        if (videoIndex !== null) {
           this.setVideo(videoIndex)
        }

        this.setState({
            isLeave: false,
            step: this.state.step + 1,
        })        
    }

    handleAccordion = () => {
        setTimeout(() => {
            this.setState({
                isAccordion: true
            })
        }, 1500)
    }

    handleRedirect = (route) => {
        this.setState({ 
            isSummary: false,
            isLoaded: false
        })
        setTimeout(() => {
            this.props.history.push(route)
        }, 1100)
    }

    showGraphs = (boolean) => {
        
        this.setState({
            isGraphs: boolean,
            isPressSlow: true,
            isGraphsOpacity: false
        })

        document.querySelector('.transition-graph').classList.remove('is-leave')
    }

    handlePressDown = () => {
        this.isDown = true
        this.timeDown = new Date().getTime()

        clearInterval(this.pressInterval)
        clearInterval(this.pressUpInterval)

        this.pressInterval = setInterval(() => {
            if (!this.isDown) {
                clearInterval(this.pressInterval)
                clearInterval(this.pressUpInterval)
            } else if (this.state.speed > this.state.minSpeed) {
                this.handleSpeed('remove')
            }
        }, this.duration/100)
    }

    handlePressUp = (e) => {
        this.isDown = false
        clearInterval(this.pressUpInterval)
        clearInterval(this.pressInterval)
        if (this.state.speed > this.state.minSpeed) {
            this.pressUpInterval = setInterval(() => {
                if (this.state.speed === 100) {
                    clearInterval(this.pressUpInterval)
                    clearInterval(this.pressInterval)
                    clearInterval(this.interval)
                } else {
                    this.handleSpeed('add')
                }
            }, this.duration/100)
        }
    }

    handleSpeed = (param) => {

        const value = this.state.speed + (param === 'add' ? 1 : -1)

        console.log(value)
        
        if (value === 0 || value === 100) {
            clearInterval(this.pressUpInterval)
            clearInterval(this.pressInterval)
            clearInterval(this.interval)
            return
        }

        this.setState({
            speed: value,
            playbackRate: 2 - ((100 - value)/100)*1.5,
            volume: 1 - ((100 - value)/100)
        })
        if (value === this.state.minSpeed) {
            this.isDown = false
            this.setState({
                isPressSlow: false,
                isLeave: true
            })
            setTimeout(() => {
                this.handleStep()
            }, 1000)
        }
    }

    speedIncrease = () => {
        this.handleSpeed('remove')
        this.setState({
            isLeave: true
        })
        setTimeout(() => {
            this.handleStep()
        }, 1100)
        
        this.interval = setInterval(() => {
            this.handleSpeed('add')
            if (this.state.speed === 100) {
                clearInterval(this.interval)
            }
        }, this.duration/100)
    }

    setNext = () => {
        this.setState({
            isNext: this.state.isNext + 1
        })
    }
    
    showSummary = (videoIndex = null) => {
        if (videoIndex !== null) {
           this.setVideo(videoIndex)
        }

        this.setState({
            isLeave: true,
            isGraphs: false
        })
        setTimeout(() => {
            this.handleStep()
            this.setState({ isSummary: true})
        }, 1100)
    }

    handleLastVideoLoop = (videoIndex) => {
        this.setVideo(videoIndex)
    }
    
    handleEmail = (route) => {
        window.location = route
    }

    getButton() {
        const c = this.props.content
        return( 
            <div className="buttons -center -resp">
                <Button
                    text        = { c.mailto.title }
                    className   = { '-text -md'}
                    route       = { 'mailto:evfluids@castrol.com' }
                    handleClick = { this.handleEmail } 
                />
                <Button
                    text        = { c.continue }
                    className   = { '-md -resp'}
                    route       = { this.nextView }
                    chevron     = { true }
                    handleClick = { this.handleRedirect }
                />
            </div>
        )
    }

    handleRestart = () => {
        this.setState({
            isNext: 0,
            isGraphsOpacity: true
        })
        
        this.handleVideoLoad()
    } 


    render() {
        const $ = this.state
        const c = this.props.content
        const url = process.env.PUBLIC_URL

        return (
            <div className={`TransmissionDry`}>
                {/* ALL VIDEOS TO LOAD */}
                <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
                    <div className={`video__wrapper -mobile -resp ${!$.isLoaded ? 'is-hidden' : ''} ${$.isSummary ? 'is-opacity' : ''}`}> 
                        <Video
                            id          = 'video-dry__0'
                            muted       = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_0ofh53x1/v/1/ev/9/flavorId/1_xoj6z421/name/a.mp4'}
                            onFinish    = { () => this.handleStep(1) }
                        />
                        <Video
                            id          = 'video-dry__1'
                            loop        = { true }
                            muted       = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_a5gdhe2v/v/1/ev/9/flavorId/1_g39dce35/name/a.mp4'}
                            playbackRate = { $.playbackRate }
                        />
                        <Video
                            id          = 'video-dry__2'
                            muted       = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_g5xs1f7k/v/1/ev/9/flavorId/1_1xowc5gm/name/a.mp4'}
                            playbackRate = { $.playbackRate }
                            onFinish    = { () => this.handleLastVideoLoop(3) }
                        />
                        <Video
                            id          = 'video-dry__3'
                            loop        = { true }
                            muted       = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_h5d0lckk/v/1/ev/9/flavorId/1_xp6ke16l/name/a.mp4'}
                            playbackRate = { $.playbackRate }
                        />
                    </div>
                </Videos>

                <Audio
                    id          = 'audio-dry__0'
                    autoPlay    = { true }
                    loop        = { true }
                    src         = {`${url}/audio/1061_AST032_LP_ONLN_96frm_v01`}
                    volume       = { $.volume }
                    // playbackRate = { $.playbackRateAudio }
                />

                <div className={`video-radial-gradient ${$.isGraphs ? 'is-active' : ''}`}></div>

                { $.step === 0
                    ? <>
                        <div className={`caption__wrapper -sm -top -resp`}>
                            <Caption
                                content = { this.captions[0] }
                            />
                        </div>
                    </>
                    : null
                }

                { $.step === 1
                    ? <>
                        <div className={`caption__wrapper -sm -top -resp`}>
                            <Transition render = {!$.isLeave } name="transition__caption">
                                <Caption
                                    content = { this.captions[1] } 
                                    onFinish = {this.showGraphs }
                                />
                             </Transition>
                            <Transition render = {$.isPressSlow }> 
                                <div
                                    onMouseDown = { this.handlePressDown }
                                    onMouseUp = { this.handlePressUp }
                                    onTouchStart = { this.handlePressDown }
                                    onTouchEnd = { e => this.handlePressUp(e) }
                                > 
                                    <Icon
                                        className = {`is-animate`}
                                        icon = "down"
                                        text = { c.pressToSlow }
                                        handleClick= {() => { return } }
                                    /> 
                                </div>
                            </Transition>
                        </div>
                    </>
                    : null
                }

                {$.step === 2 
                    ? <>
                        <div className={`caption__wrapper -sm -top -resp`}>
                            <Transition render = {!$.isLeave } name="transition__caption">
                                <Caption
                                    content = { this.captions[2] } 
                                    onFinish = {this.setNext }
                                />
                            </Transition>
                            <Transition render = {$.isNext === 1 && !$.isLeave}>
                                <Icon
                                    className = {`is-animate`}
                                    icon = "continue" 
                                    text = { c.continue }
                                    handleClick= {() => this.speedIncrease() }
                                /> 
                            </Transition>
                        </div>
                    </>
                    : null
                }

                {$.step === 3
                    ? <>
                        <div className={`caption__wrapper -sm -top -resp`}>
                            <Transition render = {!$.isLeave } name="transition__caption">
                                <Caption
                                    content = { this.captions[3]}
                                    onFinish = {this.setNext }
                                />
                            </Transition>
                            <Transition render = {$.isNext === 2 && !$.isLeave}>
                                <Icon
                                    className = {`is-animate`}
                                    icon = "next" 
                                    text = { c.next }
                                    handleClick= {() => this.handleStepDelay() }
                                />
                            </Transition>
                        </div>
                    </>
                    : null
                }

                {   $.step === 4
                    ? <>
                        <div className={`caption__wrapper -sm -top -resp`}>
                            <Transition render = {!$.isLeave } name="transition__caption">
                                <Caption
                                    content = { this.captions[4]}
                                    onFinish = {this.setNext }
                                />
                            </Transition>
                            <Transition render = {$.isNext === 2 && !$.isLeave}>
                                <div className="inline-flex">
                                <Icon
                                    className = {`is-animate`}
                                    icon = "next" 
                                    text = { c.next }
                                    handleClick= {() => this.showSummary(2) }
                                /> 
                                    <div onClick={() => { this.handleRestart() }}>
                                        <Replay
                                            margin = { true }
                                        />
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </>
                    : null
                }

                {   $.step === 5
                    ? <>
                        <Transition render = {$.isSummary} name="transition cover">
                            <div className={`summary__wrapper -resp`}>
                                <Summary
                                    title = { c.transmissionDry.summaryTitle }
                                    items = { this.summary }
                                />
                                { this.getButton() }
                            </div>
                        </Transition>
                    </>
                    : null
                }

                <Transition render = {$.isGraphs} name="transition cover transition-graph">
                    <div className={`graphs__wrapper ${$.isGraphsOpacity ? 'is-hidden' : ''}`}>
                        <Graphs
                            speed = {$.speed}
                            content = { this.props.content }
                        />
                    </div>
                </Transition>

                <Transition render={!$.isLoaded} name="transition cover">
                    <VideoLoader/>
                </Transition>

            </div>
        )
    }
}

export default TransmissionDry