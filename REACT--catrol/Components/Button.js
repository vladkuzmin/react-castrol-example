import React, { Component } from 'react'
import { Howl } from 'howler'
import ReactHtmlParser from 'react-html-parser'

import {ReactComponent as Chevron} from '../Icons/chevron.svg';
import {ReactComponent as Close} from '../Icons/close.svg';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSound: props.sound || true
        }
    }

    handleClick(route = null) {
        this.props.handleClick(route)
    }

    render() {
        return (           
            <div 
                className   = {`button ${this.props.className ? this.props.className : ''}`}
                onClick = { () => this.handleClick(this.props.route ? this.props.route : null) }
            >   
                <div className="gradient__line -blur"></div>
                <div className="gradient__line"></div>
                <div className="gradient__bg"></div>

                <span>{ ReactHtmlParser(this.props.text) }</span>
                { this.props.chevron
                    ? <Chevron/>
                    : ''
                }

                { this.props.close
                    ? <Close/>
                    : ''
                }
            </div>
        );
    }
}

export default Button