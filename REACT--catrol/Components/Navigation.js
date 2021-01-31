import React, { Component } from 'react'

import Video from '../Components/Video'
import Button from '../Components/Button'
import Icon from '../Components/Icon'
import Transition from '../Components/Transition'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            hotspot: null,
            menu: null,
            visible: [],
            isLoaded: false,
            video: null,
            hiddenVideo: [1,2,3]
        }

        this.items = props.content.menu
        this.hotspots = props.content.menuHotspots

        this.menuItems = this.items.slice(1, -1)
    }

    componentDidMount() {
        let arr = []
        this.items.forEach((item, i) => {
            arr.push(false)
            setTimeout(() => {
                arr[i] = true
                this.setState({
                    visible: arr
                })
            }, 150 * i + (100 - i))
        })


        const loadedVideos = []
        this.videos = document.querySelectorAll('.videos__menu video')
        for (const video of this.videos) {
            video.addEventListener('canplaythrough', (e) => {
                loadedVideos.push(true)
                if (loadedVideos.length === this.videos.length) {
                    this.setState({ isLoaded: true })
                }
            })
        }
    }
    
    
    handleRedirect = (route) => {
        this.props.redirect(true)
        this.setState({
            isLoaded: false
        })

        let arr = this.state.visible
        for(let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                arr[i] = false
                this.setState({
                    visible: arr
                })
            }, 60*i)
        }

        if (route.indexOf('http') !== -1) {
            window.location = route
        } else {
            setTimeout(() => {
                this.props.history.push(route)
            }, 1100)
        }
    }

    handleLink = (inx) => {
        this.selectHotspot(inx - 1)
        this.setState({
            active: inx
        })
    }

    selectHotspot = (selectedId) => {
        if (selectedId < 0 || selectedId > 2) {
            selectedId = null
        }
        this.handleVideoOverlay(selectedId)
        this.setState({
            hotspot: selectedId
        })
    }

    handleVideoOverlay = (inx) => {
        const videos = document.querySelectorAll('.videos__menu .video-bg')
        for (const video of videos) {
            video.classList.remove('is-active')
            video.querySelector('video').pause()
        }
        if (inx !== null) {
           videos[inx].classList.add('is-active')
           videos[inx].querySelector('video').play()
        }
    }

    render() {

        const $ = this.state
        const url = process.env.PUBLIC_URL

        return (    
            <>   
                <div className={`video__wrapper -menu videos__menu ${!$.isLoaded ? 'is-hidden': ''}`}>
                    <Video
                        id          = { 'video_menu__1'}
                        className   = { `video-bg is-animated` }
                        autoPlay    = { true }
                        loop        = { true }
                        muted       = { true }
                        mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_x5nixzbj/v/1/ev/9/flavorId/1_psqwrred/name/a.mp4'}
                    />
                    <Video
                        id          = { 'video_menu__2'}
                        className   = { 'video-bg is-animated' }
                        autoPlay    = { true }
                        loop        = { true }
                        muted       = { true }
                        mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_q7j8lubm/v/1/ev/9/flavorId/1_hzz7v4t4/name/a.mp4'}
                    />
                    <Video
                        id          = { 'video_menu__3'}
                        className   = { 'video-bg is-animated ' }
                        autoPlay    = { true }
                        loop        = { true }
                        muted       = { true }
                        mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_fpeq2nvt/v/1/ev/9/flavorId/1_vcjb0889/name/a.mp4'}
                    />
                </div>


                <ul className="menu__list -lg">
                    { this.items.map((item, i) => {
                        return (
                            <li key={i} onMouseEnter={() => this.handleLink(i)} className={ `menu__item ${$.visible[i] ? 'is-visible' : ''}` }>
                                <Button
                                    className   = {`${item.hotspots ? '-transparent' : '-link -sm'} ${ $.hotspot === i - 1 ? 'is-active' : ''}`}
                                    text        = { item.title }
                                    route       = { item.path } 
                                    handleClick = { this.handleRedirect }
                                    chevron     = { item.hotspots ? true : false }
                                />
                            </li>
                        )
                    }) }
                </ul>


                <Transition render = {$.isLoaded } name="transition cover">
                    <div className={`menu__hotspots`}>
                        { this.hotspots.map((item, index) => {
                            return (
                                <div 
                                    className={`menu__hotspot`}
                                    key= {index} 
                                    onMouseEnter = { () => { this.selectHotspot(index) }}
                                    style= {{
                                        left: item.x + '%',
                                        top: item.y + '%'
                                    }}
                                >   
                                    <Icon
                                        className = {`is-animate ${this.state.hotspot === index ? 'is-active' : ''}`}
                                        icon = "hotspot"
                                        handleClick = { () => this.handleRedirect(item.path) }
                                    />
                                </div>
                            )
                        }) }
                    </div>
                </Transition>
            </>
        );
    }
}

export default Navigation