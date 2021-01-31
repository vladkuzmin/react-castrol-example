import React, { Component } from 'react'
import TextArea from "./TextArea"

class TextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }

    update = (e, id, item) => {
        const data = this.props.default
        const value = e.currentTarget.value
        data[item[0]][item[1]][item[2]] = value
        this.props.onChange(data, id)
    }

    render() {
        const { config } = this.props
        console.log(this.props.default)
        return (
            <div className="input">
                <label>{ config.label }</label>
                <ul className="captions">
                    { config.default.map((array, index) => {
                        let n = 0
                        return (
                            array.map((item, i) =>{
                                n += 1
                                return (
                                    <div className="caption" key={ 'caption-' + i}>
                                        <div className="_number">{ n }</div>
                                        <div className="input">
                                            <label className="-sm">Caption</label>
                                            <textarea
                                                placeholder = { item.placeholder }
                                                rows="4" 
                                                cols="50"
                                                value = { this.props.default[index][i].text }
                                                onChange = { e => this.update(e, config.id, [index, i, 'text'])}
                                            >
                                            </textarea>
                                            { item.hint 
                                                ? <div className="hint">{ item.hint}</div>
                                                : null
                                            }
                                        </div>
                                        <div className="inputs">
                                            <div className="input">
                                                <label className="-sm">Duration</label>
                                                <input 
                                                    type = "number"
                                                    min="0"
                                                    value = { this.props.default[index][i].duration }
                                                    onChange = { e => this.update(e, config.id, [index, i, 'duration'])}
                                                />
                                            </div>
                                            <div className="input">
                                                <label className="-sm">Delay</label>
                                                <input 
                                                    type = "number"
                                                    min="0"
                                                    value = { this.props.default[index][i].delay }
                                                    onChange = { e => this.update(e, config.id, [index, i, 'delay'])}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    })}
                </ul>
            </div>
        )
    }
    
}

export default TextInput