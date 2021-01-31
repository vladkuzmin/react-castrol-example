
import React, { Component } from 'react'

import Transition from '../Components/Transition'
import Videos from '../Components/Videos'
import Video from '../Components/Video'
import VideoLoader from '../Components/VideoLoader'

class Welcome extends Component {

  constructor(props) {
      super(props)
      this.state = {
        step: null,
        isLoaded: false,
        video: null,
        paused: true
      }
      this.nextView = '/home'
  }

    componentWillMount() {
        this.props.pauseMusic(true)
    }

    componentWillUnmount() {
        this.props.pauseMusic(false)
    }

  handleVideoLoad = () => {
    this.setVideo(0)
    this.setState({ 
      isLoaded: true
    })
  }

  setVideo = (inx) => { 
    this.setState({ video: inx })
  }

  handleRedirect = () => {
    this.setState({ 
        isLoaded: false
      })
    setTimeout(() => {
        this.props.history.push(this.nextView)
    }, 1000)
  }

  render() {
    const $ = this.state
    const url = process.env.PUBLIC_URL
    return (
      <>    
        <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
        <div className={`video__wrapper -full  ${!$.isLoaded ? 'is-hidden' : ''} ${$.isLeave ? 'is-leave' : ''}`}>
            <Video
            id          = { 'video__welcome__0'}
            loop        = { false }
            muted       = { false }
            mp4         = {`https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_9c1t9c9k/v/1/ev/9/flavorId/1_u1lgfwyq/name/a.mp4`}
            onFinish    = { this.handleRedirect }
            />
        </div>
        </Videos>

        <Transition render={!$.isLoaded} name="transition cover">
          <VideoLoader/>
        </Transition>

      </>
    );
  }
}

export default Welcome;
