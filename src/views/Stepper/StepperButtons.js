import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import { CardActions } from "material-ui/Card";
import './styles.css';

export default class Stepper extends Component {
	static defaultProps = {
		completed: false,
		text: 'Missing text',
	}
	static propTypes = {
		step: PropTypes.object.isRequired,
	}

	render() {
		const { step } = this.props;
		return (
			<Fragment>
				<CardActions>
					<Button disabled={step.index === 0} onClick={this.handleBack}>
						Back
					</Button>
					<Button variant="raised" color="primary" className="create-card-button" onClick={ step.isLast ? this.handleFinal : this.handleNext}>
						{step.isLast ? "Finish" : "Next"}
					</Button>
					{step.optional ?
						<Button variant="raised" color="primary" className="create-card-button" onClick={this.handleSkip}>
							Skip
						</Button>
						:undefined}
				</CardActions>
			</Fragment>
		);
	}
}
