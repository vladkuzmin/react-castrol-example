import React, { Component } from 'react'

import {
    // BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
} from "react-router-dom"

import { connect } from 'react-redux';

// Import actions
import { fetchContent, setVisisted } from '../actions/index'
import Sound from '../Components/Sound'
import FullScreen from '../Components/FullScreen'

import MenuNavigation from '../Components/Menu'
import Logo from '../Components/Logo'

import Loading from '../Components/Loading'
import Welcome from './Welcome'
import Home from './Home'
import Menu from './Menu'
import Intro from './Intro'
import TransmissionIntro from './Transmission/Intro'
import TransmissionMenu from './Transmission/Menu'
import TransmissionDry from './Transmission/Dry'
import TransmissionWet from './Transmission/Wet'
import TransmissionWetPlus from './Transmission/WetPlus'

import GreasesIntro from './Greases/Intro'
import GreasesInteractive from './Greases/Interactive'
import GreasesSummary from './Greases/Summary'

import CoolantIntro from './Coolants/Intro'
import CoolantTypes from './Coolants/Types'
import CoolantPerformance from './Coolants/Performance'
import CoolantsMenu from './Coolants/Menu'
import CoolantConditions from './Coolants/Conditions'
import CoolantTemperature from './Coolants/Temperature'
import CoolantSummary from './Coolants/Summary'

// import Pointer from '../Components/Pointer'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMuted: false,
            transmission: [false, false, false],
            coolants: [false, false],
            orientation: '',
            isLoaded: false,
            content: {},
            isMenuOpen: false,
            isSound: false,
            isMusicPause: false
        }
    }

    componentWillMount() {
        this.props.fetchContent(this.props).then(() => {
            this.setState({content: this.props.content.items[0].fields.content})
        })
    }

    handleTransmissions = (i) => {
        let arr = this.state.transmission
        arr[i] = true
        this.setState({
            transmission: arr
        })
    }

    handleCoolants = (i) => {
        let arr = this.state.coolants
        arr[i] = true
        this.setState({
            coolants: arr
        })
    }

    resetCoolants = () => {
        this.setState({
            coolants: [false, false]
        })
    }

    handleLoaded = (boolean) => {
        this.setState({
            isLoaded: boolean
        })
    }

    handleSound= (boolean) => {
        this.setState({
            isMuted: boolean
        })
    }

    handleMenuOpen= (boolean) => {
        this.setState({
            isMenuOpen: boolean
        })
    }

    isSound = (boolean) => {
        this.setState({
            isSound: boolean
        })
    }

    isMusicPause = (boolean) => {
        this.setState({
            isMusicPause: boolean
        })
    }

    pauseMusic = (boolean) => {
        this.setState({
            isMusicPause: boolean
        })
    }

    render() {
        const  c = this.state.content
        return ( 
            // <HashRouter onChange={this.setVisited} basename={ process.env.PUBLIC_URL} ></HashRouter>
            <HashRouter onChange = { this.setVisited } >
                { !this.props.loading && this.state.isLoaded ?    
                    <> 
                        <div className = {`sound__wrapper ${this.state.isMenuOpen ? 'is-active' : ''}`}>
                            <Route render = {(props) => <Sound {...props} path = { `${process.env.PUBLIC_URL}/audio/1061_AST002_TRACK-A.mp3` } isSound = {this.state.isSound }/>}/>
                        </div>
                        <div className = {`full-screen__wrapper ${this.state.isMenuOpen ? 'is-active' : ''}`}>
                            <FullScreen/>
                        </div>
                        <Route render = {(props) => <MenuNavigation {...props} content={ c.menu } handleOpen = { this.handleMenuOpen }/>} />
                        <Route render = {(props) => <Logo {...props}/>} />
                        <main>
                            <Switch>
                                {/* <Route path="/welcome" render = {(props) => <Welcome {...props} pauseMusic = { this.pauseMusic }/> }/> */}

                                <Route path="/home" render = {(props) => <Home {...props} content={ c } isSound = { this.isSound }/>}/>
                                <Route path="/menu" render = {(props) => <Menu {...props} content={ c }/>}/>
                                <Route path="/intro" render = {(props) => <Intro {...props} content={ c }/>}/>

                                <Route path="/transmission/intro" render = {(props) => <TransmissionIntro {...props} content={ c }/>}/>
                                <Route path="/transmission/menu" render = {(props) => <TransmissionMenu {...props} content = { c } transmissions = { this.state.transmission } handleTransmissions = {this.handleTransmissions} />} />
                                <Route path="/transmission/dry" render = {(props) => <TransmissionDry {...props} content={ c }/>}/>
                                <Route path="/transmission/wet" render = {(props) => <TransmissionWet {...props} content={ c }/>}/>
                                <Route path="/transmission/wet-plus" render = {(props) => <TransmissionWetPlus {...props} content={ c }/>}/>

                                <Route path="/coolants/intro" render = {(props) => <CoolantIntro {...props} content={ c } resetCoolants = {this.resetCoolants} />}/>
                                <Route path="/coolants/types" render = {(props) => <CoolantTypes {...props} content={ c }/>}/>
                                <Route path="/coolants/performance" render = {(props) => <CoolantPerformance {...props} content={ c }/>}/>
                                <Route path="/coolants/menu" render = {(props) => <CoolantsMenu {...props} content = { c } coolants = { this.state.coolants } handleCoolants = {this.handleCoolants} />} />
                                <Route path="/coolants/conditions" render = {(props) => <CoolantConditions {...props} content={ c }/>}/>
                                <Route path="/coolants/temperature" render = {(props) => <CoolantTemperature {...props} content={ c }/>}/>
                                <Route path="/coolants/summary" render = {(props) => <CoolantSummary {...props} content={ c }/>}/>

                                <Route path="/greases/intro" render = {(props) => <GreasesIntro {...props} content={ c }/>}/>
                                <Route path="/greases/interactive" render = {(props) => <GreasesInteractive {...props} content={ c }/>}/>
                                <Route path="/greases/summary" render = {(props) => <GreasesSummary {...props} content={ c }/>}/>
                            </Switch>
                        </main>
                        {/* <Pointer/> */}
                    </>
                    : <Route render = {(props) => <Loading {...props} handleLoaded = {this.handleLoaded } loading = { this.props.loading } content={ c }/>} />
                }
            </HashRouter>
        )
    }
}

function mapStateToProps(state) {
    return { 
        content: state.content.all,
        loading: state.content.loading
    }
}

// export default App
export default connect(mapStateToProps, { fetchContent }) (App)