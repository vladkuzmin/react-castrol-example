import React, { Component } from 'react'

import Transition from '../Components/Transition'
import VideoLoader from '../Components/VideoLoader'
import Videos from '../Components/Videos'
import Video from '../Components/Video'
import Caption from '../Components/Caption'
import Button from '../Components/Button'
import Accordion from '../Components/Accordion'
import Icon from '../Components/Icon'
import Replay from '../Components/Replay'

class Intro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: null,
            isAccordion: false,
            isLoaded: false,
            video: null
        }
        this.nextView = '/menu'
    }

    handleVideoLoad = () => {
        this.setVideo(0)
        this.setState({
            isLoaded: true,
            step: 0
        })
    }
    
    setVideo = (inx) => { 
        this.setState({ video: inx })
    }

    handleNextVideo = (inx) => {
        this.setVideo(inx)
        this.setState({
            step: inx
        })
    }

    replayStep = (step) => {
        this.setVideo(step)
        this.setState({
            step: step
        })

        if(this.state.isAccordion === true) {
            this.setState({
                isAccordion: false
            })
        }
    }

    handleAccordion = () => {
        this.setState({
            isAccordion: true
        })
    }

    handleRedirect = (route) => {
        this.setState({
            isAccordion: false,
            isLoaded: false
        })
        setTimeout(() => {
          this.props.history.push(route)
        }, 1000)
    }

    render() {
        const $ = this.state
        const url = process.env.PUBLIC_URL
        const c = this.props.content
        return (
            <div className="Intro"> 
                <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
                    <div className={`video__wrapper -full ${!$.isLoaded ? 'is-hidden' : ''}`}>
                        <Video
                            id          = 'video-intro__0'
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_z26veyax/v/1/ev/9/flavorId/1_3ue5u0p9/name/a.mp4'}
                            onFinish    = { () => this.handleNextVideo(1) }
                        />
                        <Video
                            id          = 'video-intro__1'
                            loop        = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_z26veyax/v/1/ev/9/flavorId/1_3ue5u0p9/name/a.mp4'}
                            onFinish    = { () => this.handleNextVideo(1) }
                        />
                    </div>
                </Videos>
                
                { $.step === 0
                    ?   
                        <div className="caption__wrapper">
                            <Caption
                                content = { c.intro.captions[0] }
                            />
                        </div>
                    : null
                }

                { $.step === 1
                    ? 
                        <>
                            <div className="caption__wrapper">
                                <Caption
                                    content = { c.intro.captions[1] }
                                    onFinish = { this.handleAccordion }
                                />
                            </div>

                            <div className={`accordion__wrapper ${$.isAccordion ? '' : 'is-hidden'}`}>
                                <Accordion content = { c.intro.accordion }/>
                                <div className="button-wrap">
                                    <div className="inline-flex">
                                        <Button  
                                            className = '-lg'
                                            text= { c.continue }
                                            chevron = { true }
                                            route = { this.nextView }
                                            handleClick = { this.handleRedirect }
                                        />
                                        <div onClick={() => { this.replayStep(0) }}>
                                            <Replay/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="buttons -continue-resp">
                                <Transition render = {$.isAccordion}>
                                    <Icon
                                        icon        = { 'next' }
                                        handleClick = { () => this.handleRedirect(this.nextView) }
                                    />
                                </Transition>
                            </div>
                        </>
                    : null
                }

                <Transition render={!$.isLoaded} name="transition cover">
                    <VideoLoader/>
                </Transition>

            </div>
        )
    }
}

export default Intro