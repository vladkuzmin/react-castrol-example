import React, { Component } from 'react'

class Logo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paths: ['/menu', '/intro', '/home']
        }
    }

    checkPath(path) {
        let className = ''
        if ( this.state.paths.includes(path)) {
            className = 'is-visible'
        }
        return className
    }

    render() {
        return (
            <div className={`logo ${ this.checkPath(this.props.location.pathname) }`}>
                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt={''}/>
            </div>
        );
    }
}

export default Logo