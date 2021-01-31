import React, { Component } from 'react'

class TextArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }

    update = (e, id) => {
        const value = e.currentTarget.value
        this.setState({ error: value === '' ? true : false })
        this.props.onChange(value, id)
    }

    render() {
        const { config } = this.props
        return (
            <div className={`input ${this.state.error ? 'is-error' : ''}`}>
                <label>{ config.label }</label>
                <textarea
                    rows="4" 
                    cols="50"
                    onChange = { e => this.update(e, config.id)}
                    placeholder = { config.placeholder }
                    defaultValue =  { this.props.default }
                >
                </textarea>
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

export default TextArea