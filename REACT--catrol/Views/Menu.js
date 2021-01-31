import React, { Component } from 'react'

import Videos from '../Components/Videos'
import Video from '../Components/Video'
import Transition from '../Components/Transition'
import VideoLoader from '../Components/VideoLoader'
import Navigation from '../Components/Navigation'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            video: null
        }
    }

    handleVideoLoad = () => {
        this.setVideo(0)
        this.setState({ isLoaded: true })
    }
    
    setVideo = (inx) => { 
        this.setState({ video: inx })
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
            <div className={`view`}>
                <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
                    <div className={`video__wrapper -menu ${!$.isLoaded ? 'is-hidden': ''}`}>
                        <Video
                            id          = { 'video_menu__0'}
                            loop        = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_im82rqjb/v/1/ev/9/flavorId/1_e9qtz4kl/name/a.mp4'}
                        />
                    </div>
                </Videos>

                <Navigation {...this.props} redirect = { this.handlePropsRedirect } />
                
                <Transition render={!$.isLoaded} name="transition cover">
                    <VideoLoader/>
                </Transition>
            </div>
        )
    }
}

export default Menu