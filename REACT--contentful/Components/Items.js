import React, { Component } from 'react'

import{ formatLabel } from '../Helpers'

class Items extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    update = (e, id, item) => {
        const data = this.props.default
        const value = e.currentTarget.value

        if (item.length === 2) {
           data[item[0]][item[1]] = value
        } else {
            data[item[0]][item[1]][item[2]][item[3]] = value
        }
        this.props.onChange(data, id)
    }
    
    items = (item, index) => {
        return (
            <div key = { index }>
                <h3>{this.props.config.group} item</h3>
                {Object.keys(item).map((key) => {
                    return (
                        <div className="input">
                            <label className="-sm">{ formatLabel(key) }</label>
                            
                            {
                                typeof(item[key]) === 'string'
                                ? <textarea
                                    value = {this.props.default[index][key]}
                                    onChange = {e => this.update(e, this.props.config.id, [index, key])}
                                ></textarea>
                                : null
                            } 
                            
                            {
                                Array.isArray(item[key])
                                ? <>
                                    { item[key].map((x, y) => {
                                        return (
                                            Object.keys(x).map((a, b) => {
                                                return (
                                                    <>
                                                        <label className="-sm">{a} </label>
                                                        <input
                                                            type = "text"
                                                            value = {this.props.default[index][key][y][a]}
                                                            onChange = {e => this.update(e, this.props.config.id, [index, key, y, a])}
                                                        />
                                                    </>
                                                )
                                            })
                                        )
                                    })}
                                </>
                                
                                : null
                            }

                        </div>
                    )
                })}
            </div>
        )
    }
    render() {
        const { config } = this.props
        console.log(this.props.default)
        return (
            <div className={`input`}>
                {
                    this.props.default.map((item, index) => {
                        return this.items(item, index)
                    })
                }
            </div>
        )
    }
    
}

export default Items