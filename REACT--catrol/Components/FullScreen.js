import React, { Component } from 'react'

class FullScreen extends Component {
    constructor() {
        super()
        this.state = {
            isFull: false
        }
    }

    handleFull = () => {
        
        if (!document.fullscreenElement) {
            document.querySelector('#root').requestFullscreen()
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          }
        }

        this.setState({
            isFull: !this.state.isFull
        })
    }

    render() {
        return (           
            <div className={`full-screen ${this.state.isFull ? 'is-active' : ''}`} onClick={ this.handleFull}>            
                <img src={`${process.env.PUBLIC_URL}/images/full-screen.svg`} alt={''}/>
                <img src={`${process.env.PUBLIC_URL}/images/full-screen-off.svg`} alt={''}/>
            </div>
        )
    }
}

export default FullScreen