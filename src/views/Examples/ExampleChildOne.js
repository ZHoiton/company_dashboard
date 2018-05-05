import React, { Component } from 'react';
import ExampleContext from '../../context/contexts';
import './styles.css';

export default class ExampleChildOne extends Component {
	render() {
		return (
			<ExampleContext.Consumer>
				{context => (
					<p>This is {context.name}</p>
				)}
			</ExampleContext.Consumer>
		);
	}
}
