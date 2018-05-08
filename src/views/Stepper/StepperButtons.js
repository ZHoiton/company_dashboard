import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import { CardActions } from "material-ui/Card";

export default class Stepper extends Component {
	static propTypes = {
		step: PropTypes.object.isRequired,
		onStepChange: PropTypes.func.isRequired,
	}

	render() {
		const { step, onStepChange } = this.props;
		return (
			<Fragment>
				<CardActions>
					<Button disabled={step.index === 0} onClick={onStepChange.bind(this,-1)}>
						{'Back'}
					</Button>
					<Button variant="raised" color="primary" className="create-card-button" onClick={ onStepChange.bind(this,1)}>
						{step.isLast ? "Finish" : "Next"}
					</Button>
					{step.optional ?
						<Button variant="raised" color="primary" className="create-card-button" onClick={onStepChange.bind(this,0)}>
							{'Skip'}
						</Button>
						:undefined}
				</CardActions>
			</Fragment>
		);
	}
}
