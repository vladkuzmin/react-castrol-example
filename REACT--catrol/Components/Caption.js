import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

class Caption extends Component {
    constructor(props) {
        super(props)
        this.delay      = null
        this.duration   = null
        this.state = {
            active: false,
            inx: 0,
            isEnter: false,
            isLeave: false
        }
    }

    componentDidMount() {
        this.handleCaption(this.props.content[this.state.inx])
    }

    componentWillUnmount() {
        clearTimeout(this.duration)
        clearTimeout(this.delay)
    }

    handleIndex() {
        this.setState({
            inx: this.state.inx + 1
        })
    }

    handleActive(boolean) {
        this.setState({
            active: boolean
        })
    }

    handleEnter(boolean) {
        this.setState({
            isEnter: boolean
        })
    }

    handleLeave(boolean) {
        this.setState({
            isLeave: boolean
        })
    }

    handleCaption(caption) {

        const onFinish = this.props.onFinish
        this.delay = setTimeout(() => {
            this.handleActive(true)
            this.handleEnter(true)
            
            if (caption.duration === 0) {
                if (onFinish) onFinish(true)
                return
            }
             
            this.duration = setTimeout(() => {
                this.handleEnter(false)
                this.handleLeave(true)

                setTimeout(() => {
                    this.handleActive(false)
                    this.handleLeave(false)

                    if (this.state.inx === this.props.content.length - 1) {
                        if (onFinish) onFinish(true)
                    } else {
                        this.handleIndex()
                        this.handleCaption(this.props.content[this.state.inx])
                    }
                }, 500)

            }, caption.duration - 500)
        }, caption.delay)
    }

    render() {
        return (           
            <div className={`caption ${this.state.isEnter ? 'is-enter': ''} ${this.state.isLeave ? 'is-leave': ''}`}>
                { this.state.active
                    ?   <div className="caption__text">
                            <div className="caption__blur">{ ReactHtmlParser(this.props.content[this.state.inx].text) }</div>
                            { ReactHtmlParser(this.props.content[this.state.inx].text) }
                            { this.props.content[this.state.inx].subCaption
                                ?
                                <p>{ ReactHtmlParser(this.props.content[this.state.inx].subCaption) }</p>
                                : ''
                            }
                        </div>
                    : ''
                }
            </div>
        );
    }
}

export default Caption