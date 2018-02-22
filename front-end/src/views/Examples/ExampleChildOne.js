import React, { Component } from 'react';
import './styles.css';

export default class ExampleChildOne extends Component {
	/* Component lifecycle methods
	componentWillReceiveProps(nextProps)
	shouldComponentUpdate(nextProps, nextState)
	componentWillMount(nextProps,nextState)
	componentDidMount(prevProps, prevState)
	*/

	// required for every component
	render() {
		return (
			<div>
				<p> Child one</p>
			</div>
		);
	}
}
