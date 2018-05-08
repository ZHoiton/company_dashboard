import React, { Component, Fragment} from 'react';
import * as MaterialStepper from "material-ui/Stepper";
import PropTypes from 'prop-types';
import StepperStep from './StepperStep';
import StepperContent from './StepperContent';
import Typography from "material-ui/Typography";
import StepperButtons from './StepperButtons';
import './styles.css';

export default class Stepper extends Component {
	static propTypes = {
		activeStep: PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			steps: [],
		};
	}

	render() {
		const { activeStep } = this.props;
		const { steps } = this.state;
		return (
			<Fragment>
				<MaterialStepper activeStep={activeStep}>
					{steps.map((step, index) => {
						return (
							<StepperStep key={index} text={step.text} completed={step.completed} optional={(step.optional)?<Typography variant="caption">Optional</Typography>:undefined}/>
						);
					})}
				</MaterialStepper>
				<StepperContent/>
				<StepperButtons/>
			</Fragment>
		);
	}
}
