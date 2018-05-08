import React, { Component, Fragment} from 'react';
import Stepper from "material-ui/Stepper";
import PropTypes from 'prop-types';
import StepperContent from './StepperContent';
import Typography from "material-ui/Typography";
import StepperButtons from './StepperButtons';
import { Step, StepLabel } from "material-ui/Stepper";
import { CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";

export default class StepperContainer extends Component {
	static propTypes = {
		steps: PropTypes.array.isRequired,
		onAddChip: PropTypes.func.isRequired,
		onDeleteChip: PropTypes.func.isRequired,
		onTextChange: PropTypes.func.isRequired,
		onFinishClick: PropTypes.func.isRequired,
		onStepChange: PropTypes.func.isRequired,
		review: PropTypes.object,
	}

	constructor(props) {
		super(props);

		this.state = {
			steps: this.props.steps,
			currentStep: 0,
		};
	}

	onStepChange = (direction) => {
		const { onStepChange } = this.props;
		const { currentStep, steps } = this.state;
		const tempSteps = steps;
		let tempCurrentStep = currentStep;
		if (direction === 1){
			if (!steps[currentStep].isLast){
				tempCurrentStep = currentStep + 1;
			}
			tempSteps[currentStep].completed = true;
			onStepChange(currentStep);
		}else if (direction === -1){
			if (currentStep > 0){
				tempCurrentStep = currentStep - 1;
				tempSteps[currentStep].completed = false;
				tempSteps[currentStep- 1].completed = false;
			}
		}else if (direction === 0) {
			tempCurrentStep = currentStep + 1;
		}
		this.setState({steps: tempSteps, currentStep: tempCurrentStep});

	}

	render() {
		const { onTextChange, onAddChip, onDeleteChip, onFinishClick, review} = this.props;
		const { steps, currentStep } = this.state;
		return (
			<Fragment>
				{steps[currentStep].isLast && steps[currentStep].completed ? (
					<CardContent className="final-step">
						<CircularProgress size={70} />
					</CardContent>
				) : (
					<Fragment>
						<Stepper activeStep={currentStep}>
							{steps.map((step) => (
								<Step key={step.text} completed={step.completed}>
									<StepLabel optional={(step.optional)?<Typography variant="caption">Optional</Typography>:undefined} >{step.text}</StepLabel>
								</Step>))}
						</Stepper>
						<StepperContent step={steps[currentStep]} onTextChange={onTextChange} onDeleteChip={onDeleteChip} onAddChip={onAddChip} review={review}/>
						<StepperButtons step={steps[currentStep]} onStepChange={this.onStepChange} onFinishClick={onFinishClick}/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}
