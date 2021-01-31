import React, { Component } from 'react'
import { Howl } from 'howler'

import {ReactComponent as Down} from '../Icons/down.svg';
import {ReactComponent as Chevron} from '../Icons/chevron.svg';
import {ReactComponent as Link} from '../Icons/link.svg';
import {ReactComponent as Email} from '../Icons/email.svg';
import {ReactComponent as Share} from '../Icons/share.svg';
import {ReactComponent as Facebook} from '../Icons/facebook.svg';
import {ReactComponent as Twitter} from '../Icons/twitter.svg';
import {ReactComponent as CloseSm} from '../Icons/close-sm.svg';
import {ReactComponent as Drag} from '../Icons/drag.svg';
import {ReactComponent as Continue} from '../Icons/continue.svg';

class Icon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSound: props.sound || true
        }
        // this.sound = new Howl({
        //     src: [`/audio/menu.wav`],
        //     volume: .5
        // })
    }

    handleClick = () => {
        if (this.props.selectedId !== undefined) {
            this.handleActive(this.props.selectedId)
        } else {
            this.handleBoolean()
        }
    }

    handleActive = (prop) => {
        this.props.handleClick(prop)
    }

    handleBoolean = () => {
        this.props.handleClick(true)
    }

    // playSound = () => {
    //     if (this.props.sound === undefined) { 
    //         this.sound.play()
    //     }
    // }

    getIcon() {
        if (this.props.icon === 'hotspot') {
            return (<span className={`-${this.props.icon}`}></span>)
        }

        if (this.props.icon === 'down') {
            return (
                <span className="-down"><Down/></span>
            )
        }

        if (this.props.icon === 'continue') {
            return (
                <span className="-continue"><Continue/></span>
            )
        }

        if (this.props.icon === 'up') {
            return (<span className="-up"><Down/></span>)
        }

        if (this.props.icon === 'next') {
            return (<span className="-next"><Chevron/><Chevron/></span>)
        }

        if (this.props.icon === 'plus') {
            return (<span className="-plus"></span>)
        }

        if (this.props.icon === 'minus') {
            return (<span className="-minus"></span>)
        }

        if (this.props.icon === 'menu') {
            return (<div className="-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>)
        }

        if (this.props.icon === 'link') {
            
            return(
                <div className="-svg">
                    <Link/>
                </div>
            )
        }

        if (this.props.icon === 'email') {
            
            return(
                <div className="-svg -email">
                    <Email/>
                </div>
            )
        }

        if (this.props.icon === 'share') {
            
            return(
                <div className="-svg -toggle-close">
                    <Share/>
                    <CloseSm/>
                </div>
            )
        }

        if (this.props.icon === 'facebook') {
            
            return(
                <div className="-svg -facebook">
                    <Facebook/>
                </div>
            )
        }

        if (this.props.icon === 'twitter') {
            
            return(
                <div className="-svg -twitter">
                    <Twitter/>
                </div>
            )
        }

        if (this.props.icon === 'drag') {
            return(
                <div className="-svg -drag">
                    <Drag/>
                </div>
            )
        }
    }

    render() {
        return (           
            <div 
                className   = {`icon ${this.props.className ? this.props.className : ''}`}
                onClick= {() => {this.handleClick()}}

                style={ this.props.styles ? this.props.styles : {}}
                data-text={ this.props.text  ? this.props.text : ''}
            >   
                <div className="gradient__line -blur"></div>
                <div className="gradient__line"></div>
                <div className="gradient__bg"></div>
                { this.getIcon() }
            </div>
        );
    }
}

export default Icon