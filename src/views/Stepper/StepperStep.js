import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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
			<Step key={text} completed={completed}>
				<StepLabel optional={optional} >{text}</StepLabel>
			</Step>
		);
	}
}
