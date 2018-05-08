import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Step, StepLabel } from "material-ui/Stepper";
import './styles.css';

export default class Stepper extends Component {
	static defaultProps = {
		completed: false,
		text: 'Missing text',
	}
	static propTypes = {
		text: PropTypes.string.Required,
		completed: PropTypes.bool.Required,
		optional: PropTypes.any,
	}

	render() {
		const { completed, optional, text } = this.props;
		return (
			<Step completed={completed}>
				<StepLabel optional={optional} >{text}</StepLabel>
			</Step>
		);
	}
}
