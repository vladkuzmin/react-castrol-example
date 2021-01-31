import React, { Component } from 'react'

import Transition from '../Components/Transition'
import Videos from '../Components/Videos'
import Video from '../Components/Video'
import VideoLoader from '../Components/VideoLoader'
import Caption from '../Components/Caption'
import Button from '../Components/Button'
import Navigation from '../Components/Navigation'

class Home extends Component {

  constructor(props) {
      super(props)
      this.state = {
        step: null,
        isLoaded: false,
        isCaption: false,
        isContinue: false,
        video: null,
        videoLength: null,
        isLeave: false
      }
      this.content = this.props.content.homepage
      this.nextView = '/menu'
  }

  handleVideoLoad = () => {
    this.setVideo(0)
    this.handleCaption()
    this.setState({ 
      isLoaded: true
    })
  }

  setVideo = (inx) => { 
      this.setState({ video: inx })
  }

  updateVideo = (value) => {
    if (value !== 0 && (value*1000 >= this.state.videoLength - 500)) {
      this.setState({
        isLeave: true
      })
    }
  }

  videoDuration = (value) => {
    this.setState({
      videoLength: value*1000
    })
  }

  handleCaption = (inx = null) => {
    if (inx !== null) this.setVideo(inx)
    this.setState({
      step: 0,
      isCaption: true
    })
  }

  handleContinue = () => {
    this.setState({ isContinue: true })
  }

  handleLeave = (inx) => {
    this.setVideo(inx)
    this.setState({
      isCaption: false,
      isContinue: false
    })
  }

  menuRedirect = (route) => {
    this.props.history.push(route)
  }

  handlePropsRedirect = (boolean) => {
    this.setState({
      isLoaded: !boolean
    })
  }

  render() {
    const $ = this.state
    const url = process.env.PUBLIC_URL
    return (
      <>
          
          <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
            <div className={`video__wrapper -full  ${!$.isLoaded ? 'is-hidden' : ''} ${$.isLeave ? 'is-leave' : ''}`}>
              <Video
                id          = { 'video__home__0'}
                loop        = { true }
                muted       = { true }
                mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_z26veyax/v/1/ev/9/flavorId/1_3ue5u0p9/name/a.mp4'}
              />
              <Video
                id          = { 'video__home__1'}
                mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_1q4ivar8/v/1/ev/9/flavorId/1_hnciyfm8/name/a.mp4'}
                onFinish    = { () => this.menuRedirect(this.nextView) }
              />
            </div>
          </Videos>
         
        { $.step === 0
          ?
          <>
            <div className={`caption__wrapper`}>
              <Transition render = { $.isCaption }>
                <Caption
                  content   = { this.content.captions[0] }
                  onFinish  = { this.handleContinue }
                />
              </Transition>
              <Transition render = { $.isContinue } name="transition__btn">
                <Button 
                  text = { this.props.content.start }
                  className={`-lg -start`}
                  handleClick = { () => this.handleLeave(1) }
                  chevron = { true }
                />
              </Transition>
            </div>

            <Transition render = { $.isContinue } name="transition cover">
              <div className="reference">{ this.props.content.homepage.reference }</div>
            </Transition>
          </>
          : null
        }

        <Transition render={!$.isLoaded} name="transition cover">
          <VideoLoader/>
        </Transition>

      </>
    );
  }
}

export default Home;