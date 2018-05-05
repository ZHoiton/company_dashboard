import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './contexts';

export default class AppContext extends Component {
	static propTypes = {
		children: PropTypes.any,
	};

	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
		};
	}

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}
