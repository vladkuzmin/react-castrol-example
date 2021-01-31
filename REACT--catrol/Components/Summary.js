import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

class Summary extends Component {
    constructor() {
        super()
        this.state = {
            active: null,
            left: null,
            right: null,
            isMobile: false
        }
        this.breakpoint = 992
        this.downX = 0
        this.moveX = 0
        this.downTime = 0
        this.isMouseDown = false
    }

    componentDidMount() {
        this.handleResponsive()
        window.addEventListener('resize', () => { this.handleResponsive()} )
    }

    handleResponsive() {
        const width = window.innerWidth
        const isMobile = width <= this.breakpoint ? true : false

        if (this.state.isMobile !== isMobile) {
            this.setState({
                isMobile: isMobile
            })

            if (isMobile && this.state.active === null) {
                this.handleActive(0)
                this.handleMobilePositions(0)
            }
        }
    }

    handleActive = (inx, event = null) => {
        
        this.setState({
            active: inx
        })

        if (this.state.isMobile) {
            this.handleMobilePositions(inx)
        }
    }

    handleMobilePositions(inx) {
        const len = this.props.items.length - 1
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

    handleMouseDown(e) {
        this.isMouseDown = true
        this.downX = e.clientX || e.touches[0].clientX
        this.downTime = new Date().getTime()
    }
    handleMouseMove(e) {
        if (this.isMouseDown) {
            this.moveX = e.clientX || e.touches[0].clientX
        }
    }
    handleMouseUp(e) {
        this.isMouseDown = false

        if  (this.moveX === 0) return

        const dir = (this.downX - this.moveX) > 0 ? 1 : -1
        const dist = Math.abs(this.downX - this.moveX)
        const time = new Date().getTime() - this.downTime
        
        if (dist > 40 && time < 350) {
            const len = this.props.items.length - 1
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
        this.moveX = 0
    }

    getClassName(i) {
        let className = 'summary'

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
        }

        return className

    }

    render() {
        return (           
            <div className={ `SummaryComponent summary__block ${this.state.isMobile ? 'is-mobile' : ''}`}>
                <h2 className="title">{ ReactHtmlParser(this.props.title)}</h2>
                <div 
                    className="summary__list"
                    onMouseDown= {(e) => { if (this.state.isMobile) this.handleMouseDown(e) }}
                    onMouseMove = {(e) => { if (this.state.isMobile) this.handleMouseMove(e) }}
                    onMouseUp= {(e) => { if (this.state.isMobile) this.handleMouseUp(e) }}
                    onTouchStart = {(e) => { if (this.state.isMobile) this.handleMouseDown(e) }}
                    onTouchMove = {(e) => { if (this.state.isMobile) this.handleMouseMove(e) }}
                    onTouchEnd= {(e) => { if (this.state.isMobile) this.handleMouseUp(e) }}
                >
                    {
                        this.props.items.map((item, i) => {
                            return (
                                <div 
                                    className={ this.getClassName(i) }
                                    key={i}
                                    onMouseUp = {(e) => { if (this.state.isMobile) {this.handleActive(i, e) }}}
                                >
                                    <span className="_glow">
                                        <img src={`${process.env.PUBLIC_URL}/images/menu-glow.svg`} alt={''}/>
                                    </span>
                                    <div className="_title">{item.title}</div>   
                                    <div className="_desc">
                                        { ReactHtmlParser(item.desc) }
                                        { i === 2 
                                            ? <div className="summary__terms_inner">Castrol e-Fluids benefits demonstrated in bespoke testing and development</div> 
                                            : null
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="summary__terms">Castrol e-Fluids benefits demonstrated in bespoke testing and development</div>
            </div>
        );
    }
}

export default Summary