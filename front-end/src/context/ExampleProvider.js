import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExampleContext from './contexts';

export default class ExampleProvider extends Component {
	static propTypes = {
		children: PropTypes.any,
	};

	constructor(props) {
		super(props);

		this.state = {
			name: 'Lets test it!'
		};
	}

	render() {
		return (
			<ExampleContext.Provider value={this.state}>
				{this.props.children}
			</ExampleContext.Provider>
		);
	}
}
