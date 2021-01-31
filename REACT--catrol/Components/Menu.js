import React, { Component } from 'react'

import Button from '../Components/Button'
import Icon from '../Components/Icon'

import Cta from '../Components/Cta'

class MenuNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isHidden: false,
            visible: [],
            isMobile: false
        }

        this.items = props.content
        this.breakpoint = 992
    }

    componentDidMount() {
        let arr = []
        this.items.forEach((item, i) => {
            arr.push(false)
            this.setState({
                visible: arr
            })
        })

        this.handleMobile()
        window.addEventListener('resize', () => this.handleMobile())
    }

    handleMobile() {
        const w = window.innerWidth
        if (w < this.breakpoint) {
            this.setState({
                isMobile: false
            })
        } else if (w >= this.breakpoint) {
            this.setState({
                isMobile: true
            })
        }
    }

    handleOpen = () => {
        let arr = this.state.visible
        this.props.handleOpen(!this.state.isOpen)
        this.setState({
            isOpen: !this.state.isOpen
        })
        this.items.forEach((item, i) => {
            setTimeout(() => {
                arr[i] = this.state.isOpen ? true : false
                    this.setState({
                        visible: arr
                    })
            }, (this.state.isOpen ? 0 : 100) * i)
        })
    }

    handleRedirect = (route) => {
        this.setState({
            isOpen: false
        })

        if (route.indexOf('http') !== -1) {
            window.location = route
        } else {
            this.props.history.push(route)
        }
    }

    render() {
        return (
            <>
                <Icon
                    className = {`menu__toggle ${this.state.isOpen ? 'is-active' : ''}`}
                    icon = 'menu'
                    handleClick = { this.handleOpen }
                />
                <div className={`menu__content ${this.state.isOpen ? 'is-active' : ''}`}>
                    <div className="menu__close" onClick={ this.handleOpen }></div>
                    <ul className="menu__list -lg">
                        { this.items.map((item, i) => {
                            return (
                                <li key={i}  className={ `menu__item ${this.state.visible[i] ? 'is-visible' : ''}`}>
                                    <Button
                                        className   = {`${item.hotspots ? '-transparent' : '-link -sm'} ${ this.state.active === i ? 'is-active' : ''}`}
                                        text        = { item.title }
                                        route       = { item.path } 
                                        handleClick = { this.handleRedirect }
                                        chevron     = { item.hotspots ? true : false }
                                    />
                                </li>
                            )
                        }) }
                    </ul>
                    {
                        !this.state.isMobile
                        ?   <>
                                <Cta/>
                            </>
                        : ''
                    }
                </div>
                {
                    this.state.isMobile 
                    ? <Cta/>
                    : ''
                }
                
            </>

        )
    }
}

// export default App
export default MenuNavigation