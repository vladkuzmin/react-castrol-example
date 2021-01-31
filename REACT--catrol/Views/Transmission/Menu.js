import React, { Component } from 'react'
import { Howl } from 'howler'
import ReactHtmlParser from 'react-html-parser'

import Transition from '../../Components/Transition'
import Videos from '../../Components/Videos'
import Video from '../../Components/Video'
import VideoLoader from '../../Components/VideoLoader'
import Button from '../../Components/Button'


class TransmissionMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: null,
            left: null,
            right: null,
            isLoaded: false,
            isMobile: false,
            video: null
        }

        // this.sound = new Howl({
        //     src: [`/audio/menuitem.wav`],
        //     volume: 1
        // })

        this.nextView = '/coolants/intro'

        this.breakpoint = 992

        this.downX = 0
        this.moveX = 0
        this.downTime = 0
        this.isMouseDown = false

        this.items = props.content.transmissionMenu.menu
    }

    componentDidMount() {

        this.handleResponsive()
        window.addEventListener('resize', () => { this.handleResponsive()} )
    }

    handleVideoLoad = () => {
        this.setVideo(0)
        this.setState({ isLoaded: true })
    }

    setVideo = (inx) => {
        this.setState({
            video: inx
        })
    }

    handleResponsive() {
        const width = window.innerWidth
        const isMobile = width <= this.breakpoint ? true : false

        if (this.state.isMobile !== isMobile) {
            this.setState({
                isMobile: isMobile
            })

            if (isMobile && this.state.active === null) {
                let inx = this.props.transmissions.indexOf(false)
                if (inx < 0) inx = 0
                this.handleActive(inx)
                this.handleMobilePositions(inx)
            }
        }
    }

    handleRedirectMenu = (route, i) => {
        this.props.handleTransmissions(i)
        this.handleRedirect(route)
    }

    handleRedirect = (route) => {
        this.setState({
            isLoaded: false
        })
        setTimeout(() => {
          this.props.history.push(route)
        },  1100)
    }

    handleActive = (inx) => {
        this.setState({
            active: inx
        })

        if (this.state.isMobile) {
            this.handleMobilePositions(inx)
        }
    }

    handleMobilePositions(inx) {
        const len = this.items.length - 1
        let left = inx - 1
        let right = inx + 1

        if (right > len) {
            right = 0
        }

        if (left < 0) {
            left = len
        }

        this.setState({
            left: left
        })

        this.setState({
            right: right
        })
    }

    mouseDown(e) {
        this.isMouseDown = true
        this.downX = e.clientX || e.touches[0].clientX
        this.downTime = new Date().getTime()
    }
    mouseMove(e) {
        if (this.isMouseDown) {
            this.moveX = e.clientX || e.touches[0].clientX
        }
    }
    mouseUp(e) {
        this.isMouseDown = false
        const dir = (this.downX - this.moveX) > 0 ? 1 : -1
        const dist = Math.abs(this.downX - this.moveX)
        const time = new Date().getTime() - this.downTime
        
        if (dist > 40 && time < 350) {
            const len = this.items.length - 1
            const active = this.state.active
            let next = active + dir
            
            
            if (next > len) {
                next = 0
            }
            
            if (next < 0) {
                next = len
            }

            this.handleActive(next)
        }
    }

    getClassName(i) {
        let className = '_item'

        if (this.state.active === i) {
            className += ' is-active'
        }
        

        if (this.state.isMobile) {

            if (this.state.left === i) {
                className += ' is-left'
            }

            if (this.state.right === i) {
                className += ' is-right'
            }
        } else {
            if (this.state.active !== i && this.state.active !== null) {
                className += ' is-invisible'
            }
        }

        if (this.props.transmissions[i])  {
            className += ' is-visited'
        }

        return className

    }

    handleEmail = (route) => {
        window.location = route
    }

    getButton = () => {
        const c = this.props.content
        return( 
            <div className={`buttons -center -resp ${!this.state.isLoaded ? 'is-hidden': ''}`}>
                <Button
                    text        = { c.mailto.title }
                    className   = { '-text -md'}
                    route       = { 'mailto:evfluids@castrol.com' }
                    handleClick = { this.handleEmail }    
                />
                <Button
                    className   = { '-md -resp'}
                    text        = { c.continue }
                    route       = { '/menu' }
                    chevron     = { true }
                    handleClick = { this.handleRedirect }
                />
            </div>
        )
    }

    handleStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    // playSound = () => {
    //     this.sound.play()
    // }

    render() {
        
        const $ = this.state
        const c = this.props.content
        const url = process.env.PUBLIC_URL

        return (
            <div className={ `TransmissionMenu ${$.isMobile ? 'is-mobile' : ''}`}>    
                 <Videos loaded = { this.handleVideoLoad } playing = { $.video }>
                    <div className={`video__wrapper -mobile -resp ${!$.isLoaded ? 'is-hidden' : ''}`}>
                        <Video
                            loop        = { true }
                            mp4         = {'https://kalturacdn.bp.com/pd/p/895641/sp/89564100/serveFlavor/entryId/1_h5d0lckk/v/1/ev/9/flavorId/1_xp6ke16l/name/a.mp4'}
                            onFinish    = { this.handleStep }
                        />
                    </div>
                </Videos>
                
                <Transition render = {$.isLoaded} name="transition cover">
                    <div className = {`menu__transmission__wrapper -resp`}>
                        <h2 className="title">{ ReactHtmlParser(c.transmissionMenu.title) }</h2>
                        <div 
                            className={`menu__transmission is-active`}
                            onMouseDown= {(e) => { if ($.isMobile) this.mouseDown(e) }}
                            onMouseMove = {(e) => { if ($.isMobile) this.mouseMove(e) }}
                            onMouseUp= {(e) => { if ($.isMobile) this.mouseUp(e) }}
                            onTouchStart = {(e) => { if ($.isMobile) this.mouseDown(e) }}
                            onTouchMove = {(e) => { if ($.isMobile) this.mouseMove(e) }}
                            onTouchEnd= {(e) => { if ($.isMobile) this.mouseUp(e) }}
                        >
                            {
                                this.items.map((item, i) => {
                                    return (
                                        <div 
                                            className={ this.getClassName(i) }
                                            onMouseOver = {() => { if (!$.isMobile) this.handleActive(i)}}
                                            onMouseLeave = {() => { if (!$.isMobile) this.handleActive(null)}}
                                            onClick = {() => { if ($.isMobile) this.handleActive(i) }}
                                            key={i}
                                        >
                                            <div className="_gradient">
                                                <div>
                                                    <div className="_subtitle"> { item.subtitle } </div>
                                                    <div className="_title"> { ReactHtmlParser(item.title) } </div>
                                                    <div className="_summary"> { ReactHtmlParser(item.summary) } </div>
                                                </div>
                                                <Button
                                                    text        = { c.explore }
                                                    className   = { '-md '}
                                                    route          = { item.path }
                                                    sound       = { false }
                                                    handleClick = { () => this.handleRedirectMenu(item.path, i) }
                                                
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        { !$.isMobile 
                            ? this.getButton()
                            : ''
                        }
                    </div>
                </Transition>
                { $.isMobile
                    ? this.getButton()
                    : ''
                }

                <Transition render={!$.isLoaded} name="transition cover">
                    <VideoLoader/>
                </Transition>

            </div>
        )
    }
}

export default TransmissionMenu