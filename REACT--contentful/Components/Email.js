import React, { Component } from 'react'

class Email extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    update = (e, id, property) => {
        const data = this.props.default
        let value = e.currentTarget.value
        data[property] = value
        this.props.onChange(data, id)
    }

    render() {
        const { config } = this.props
        return (
            <div className={`input`}>
                <h4>{ config.label }</h4>
                <label className="-sm">Title</label>
                <input 
                    type        = "email"
                    value       = { this.props.default.title }
                    placeholder = { config.default.title }
                    onChange    = { e => this.update(e, config.id, 'title')}
                />
                <label className="-sm">href</label>
                <input 
                    type        = "text"
                    value       = { this.props.default.href }
                    placeholder = { config.default.href }
                    onChange    = { e => this.update(e, config.id, 'href')}
                />
            </div>
        )
    }
    
}

export default Email