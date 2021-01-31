import React, { Component } from 'react'

class CountDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: 0,
            current: 0
        }

        this.interval = null
    }

    componentDidMount() {
        this.setState({
            updated: this.props.value,
            current: this.props.value
        })
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.value !== this.state.current) {

            this.cancelAnimation(nextProps.value)

            const frame = 1000/30
            
            const diff = nextProps.value - this.state.current

            let current = this.state.current

            this.interval = setInterval(() => {
                
                this.setState({
                    updated: current
                })
                
                current += diff/frame

                if (diff > 0) {
                    if (current >= nextProps.value ) {
                        this.cancelAnimation(nextProps.value)
                    }
                } else {
                    if (current <= nextProps.value ) {
                        this.cancelAnimation(nextProps.value)
                    }
                }
            }, frame)
            
        }
      }

      cancelAnimation(value) {
        this.clearAnimation()
        this.setState({
            updated: value,
            current: value
        })
      }

      clearAnimation() {
        clearInterval(this.interval)
      }
    

    render() {
        return (           
        <span className="countdown">{ this.state.updated.toFixed(this.props.decimal) }</span>
        );
    }
}

export default CountDown