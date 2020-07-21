import React, {Component} from 'react';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Jodit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Your Story',
        }
    }

    updateContent(value) {
        console.log(value)
        this.setState({content:value})
        this.props.data(value);
    }
    jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
    render() {
        return <JoditEditor
            value={this.state.content}
            onChange={this.updateContent.bind(this)}
        />
    }
}

export default Jodit;
