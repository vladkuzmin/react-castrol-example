import React, { Component } from 'react'

class TextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }

    update = (e, id) => {
        let value = e.currentTarget.value
        this.setState({ error: value === '' ? true : false })
        this.props.onChange(value, id)
    }

    render() {
        const { config } = this.props
        return (
            <div className={`input ${this.state.error ? 'is-error' : ''}`}>
                <label>{ config.label }</label>
                <input 
                    type        = { config.type }
                    value       = { this.props.default }
                    placeholder = { config.placeholder }
                    onChange    = { e => this.update(e, config.id)}
                />
                { this.state.error
                    ? <div className="error">Required field</div>
                    : null
                }
                { config.hint 
                    ? <div className="hint">{ config.hint}</div>
                    : null
                }
            </div>
        )
    }
    
}

export default TextInput