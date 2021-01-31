import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { init } from "contentful-ui-extensions-sdk";

import Schema from "../schema.json"
import './index.css'

import TextInput from "./Components/Text"
import TextArea from "./Components/TextArea"
import Caption from "./Components/Caption"
import Email from "./Components/Email"
import Items from "./Components/Items"

class App extends React.Component {
  
  static propTypes = {
		sdk: PropTypes.object.isRequired
	}

	detachExternalChangeHandler = null;

	constructor(props) {
		super(props);
		this.state = {
      scheme: {}
    }
  }

	componentWillMount() {
    const data = this.props.sdk.field.getValue()
    console.log(data)
    this.setState({
      scheme: data ? data : this._convertSchema(Schema)
    })
    this.props.sdk.window.startAutoResizer();
  }

  conponentWillUnmount() {
    this.props.sdk.window.stopAutoResizer();
  }


  
  _convertSchema = (array) => {
    const obj = {}
    array.map((item) => {
      obj[item.id] = item.default
    })
    return obj
  } 

  onChange = (value, id) => {
    const { scheme } = this.state
    const data = scheme
    data[id] = value
    this.setState({ scheme: data })
    this.props.sdk.field.setValue(data)
  }

	render() {
    const { scheme } = this.state
		return (
      Schema.map((item, i) => {
        return (
          <>
            { item.type === 'text' 
              ? <TextInput 
                    onChange = { this.onChange }
                    config = { item }
                    default = { scheme[item.id] }
                />
              : null
            }
            { item.type === 'textarea' 
              ? <TextArea 
                    onChange = { this.onChange }
                    config = { item }
                    default = { scheme[item.id] }
                />
              : null
            }
            { item.type === 'caption'
              ? <Caption 
                  onChange = { this.onChange }
                  config = { item }
                  default = { scheme[item.id] }
                />
                : null
            }
            { item.type === 'email'
              ? <Email 
                  onChange = { this.onChange }
                  config = { item }
                  default = { scheme[item.id] }
                />
                : null
            }
             { item.type === 'items'
              ? <Items 
                  onChange = { this.onChange }
                  config = { item }
                  default = { scheme[item.id] }
                />
                : null
            }
          </>
        )
      })
		);
	}
}

init(sdk => {
	ReactDOM.render(<App sdk={sdk} />, document.getElementById("root"));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
