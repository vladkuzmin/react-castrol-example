import React, { Component } from 'react'
 
class Transition extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            shouldRender: this.props.render || true,
            isEnter: false,
            isLeave: false,
            isActive: false
        }
        this.duration = this.props.duration || 1000

        if (props.render) this._enter()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.render && !this.props.render) {
            this._leave()
            setTimeout(() => {
                this.setState({ shouldRender: false })
            }, this.duration)
        } else if (!prevProps.render && this.props.render) {
            this.setState({ 
                shouldRender: true 
            })
            this._enter()
        }
    }

    _enter = () => {
        setTimeout(() => {
            this.setState({
                isEnter: true
            })
            setTimeout(() => {
                this._active()
            }, this.duration)
        }, this.props.enterDelay || 10)
    }

    _active = () => {
        this.setState({
            isActive: true
        })
    }

    _leave = () => {
        setTimeout(() => {
            this.setState({
                isLeave: true
            })
        }, this.props.leaveDelay || 0 )
    }

    render() {
        const $ = this.state  
        return $.shouldRender
            ? <div className={`wrapper ${this.props.className ? this.props.className : ''} ${this.props.name ? this.props.name : 'transition'} ${$.isEnter ? 'is-enter' : ''} ${$.isActive ? 'is-active' : ''} ${$.isLeave ? 'is-leave' : ''}`}>
                { this.props.children }
            </div>
            : null
    }
}

export default Transition;