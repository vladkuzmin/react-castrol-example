import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

class Accordion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            wrapperWidth: null,
            wrapperHeight: null
        }
        this.items = props.content
        this.breakpoint = 480
    }

    componentDidMount() {
        this.handleSize()
        window.addEventListener('resize', () => this.handleSize())
    }

    handleSize() {
        const width = window.innerWidth
        const isMobile = width <= this.breakpoint ? true : false

        const accordion = document.querySelector('.accordion')
        const title     = document.querySelector('.accordion__title')
        
        if (!accordion) return false

        if (isMobile) {
            this.handleHeight(accordion, title)
        } else {
            this.handleWidth(accordion, title)
        }
    }

    handleHeight(accordion, title) {
        const accordionHeight = accordion.offsetHeight
        const titleHeight     = title.offsetHeight * this.items.length
        
        this.setState({
            wrapperHeight: accordionHeight - titleHeight
        })
    }

    handleWidth(accordion, title) {
        const accordionWidth = accordion.offsetWidth
        const titleWidth     = title.offsetWidth * this.items.length
        
        this.setState({
            wrapperWidth: accordionWidth - titleWidth
        })
    }

    changeActive = (inx) => {
        this.setState({
            active: inx
        })
    }

    render() {
        return (
            <div className="accordion">
                {this.items.map((item, i) => {
                    return (
                        <div className={`accordion__item ${this.state.active === i ? 'is-active' : ''}`} key={i}>
                            <div className="accordion__title" onClick={ () => this.changeActive(i) }>
                                <div className="gradient__bg -top-bottom"></div>
                                <div className="_title">
                                    <span className="icon__plus"></span>
                                    <div>{ item.title }</div>
                                </div>
                            </div>
                            <div 
                                className="accordion__content__wrapper" 
                                style={
                                    { 
                                        width: this.state.active === i ? this.state.wrapperWidth + 'px' : 0,
                                        height: this.state.active === i ? this.state.wrapperHeight + 'px' : 0
                                    }
                                }
                            >
                                <div className="accordion__content">
                                    <div className="accordion__img">
                                        <img src={`${process.env.PUBLIC_URL}/images/accordion/${item.image}`} alt={''}/>
                                    </div>
                                    <div className="accordion__text__wrapper">
                                        <div className="accordion__text">
                                        { ReactHtmlParser(item.content) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Accordion