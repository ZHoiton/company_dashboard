import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Card, { CardActions, CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
// import Avatar from "material-ui/Avatar";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField/TextField";
import Typography from "material-ui/Typography";
import Chip from "material-ui/Chip";
import firebase from "firebase";
import "../styles/CompanyStyles.css";
// import { CardActions } from "material-ui";

export default class Company extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			companies: firebase.firestore().collection("companies"),
			activeStep: 0,
			skippedSteps: new Map(),
			companyName: "",
			companyLocation: "",
			companyFounded: "",
			roleName: "",
			roleList: [{ key: 0, label: "Admin" }],
			groupName: "",
			groupList: [{ key: 0, label: "Admin-Group" }]
		};
	}

	getSteps = () => {
		return ["Company Information", "Add Roles", "Add Groups", "Create Company"];
	};

	onDeleteChip = data => () => {
		const roleList = [...this.state.roleList];
		const chipToDelete = roleList.indexOf(data);
		roleList.splice(chipToDelete, 1);
		this.setState({ roleList });
	};

	onDeleteGroup = data => () => {
		const groupList = [...this.state.roleList];
		const chipToDelete = groupList.indexOf(data);
		groupList.splice(chipToDelete, 1);
		this.setState({ groupList });
	};

	onAddChip = () => {
		const { roleList, roleName } = this.state;
		const index = roleList.length;
		roleList.push({ key: index, label: roleName });
		this.setState({});
	};
	onAddGroup = () => {
		const { groupList, groupName } = this.state;
		const index = groupList.length;
		groupList.push({ key: index, label: groupName });
		this.setState({});
	};

	onChange = variableName => event => {
		this.setState({
			[variableName]: event.target.value
		});
	};

	isStepOptional = step => {
		return step === 1 || step === 2;
	};

	isStepSkipped = index => {
		return this.state.skippedSteps.get(index);
	};

	handleNext = () => {
		const { activeStep, skippedSteps } = this.state;
		skippedSteps.set(activeStep, false);
		this.setState({
			activeStep: activeStep + 1
		});
	};

	handleFinal = () => {
		const {
			activeStep,
			skippedSteps,
			companyName,
			companyFounded,
			companyLocation,
			roleList,
			groupList
		} = this.state;
		skippedSteps.set(activeStep, false);
		this.setState({
			activeStep: activeStep + 1
		});

		const key = this.state.companies.doc().id;

		this.state.companies
			.doc(key)
			.set({
				companyName: companyName,
				companyLocation: companyLocation,
				companyFounded: companyFounded,
				roleList: roleList,
				groupList: groupList
			})
			.then(() => {
				this.props.history.push("/");
			});
	};

	handleBack = () => {
		const { activeStep } = this.state;
		this.setState({
			activeStep: activeStep - 1
		});
	};

	handleSkip = () => {
		const { activeStep, skippedSteps } = this.state;
		if (!this.isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}
		skippedSteps.set(activeStep, true);
		this.setState({
			activeStep: this.state.activeStep + 1
		});
	};

	getStepContent = step => {
		switch (step) {
		case 0:
			return (
				<div className="create-company-step">
					<TextField
						id="company-name"
						label="Name"
						className="text-field"
						onChange={this.onChange("companyName")}
						margin="normal"
					/>
					<TextField
						id="company-location"
						label="Location"
						className="text-field"
						onChange={this.onChange("companyLocation")}
						margin="normal"
					/>

					<TextField
						id="company-founded"
						label="Founded"
						className="text-field"
						onChange={this.onChange("companyFounded")}
						margin="normal"
					/>
				</div>
			);
		case 1:
			return (
				<div className="create-company-step">
					<TextField
						id="role-name"
						label="Name"
						className="text-field"
						onChange={this.onChange("roleName")}
						margin="normal"
					/>
					<Button
						variant="raised"
						color="primary"
						className="create-card-button"
						onClick={this.onAddChip}
					>
						Add Role
					</Button>
					<div>
						{this.state.roleList.map(data => {
							const avatar = null;

							return (
								<Chip
									key={data.key}
									avatar={avatar}
									label={data.label}
									onDelete={this.onDeleteChip(data)}
									className="chip"
								/>
							);
						})}
					</div>
				</div>
			);
		case 2:
			return (
				<div className="create-company-step">
					<TextField
						id="group-name"
						label="Name"
						className="text-field"
						onChange={this.onChange("groupName")}
						margin="normal"
					/>
					<Button
						variant="raised"
						color="primary"
						className="create-card-button"
						onClick={this.onAddGroup}
					>
						Add Group
					</Button>
					<div>
						{this.state.groupList.map(data => {
							const avatar = null;

							return (
								<Chip
									key={data.key}
									avatar={avatar}
									label={data.label}
									onDelete={this.onDeleteGroup(data)}
									className="chip"
								/>
							);
						})}
					</div>
				</div>
			);
		case 3:
			return (
				<div className="create-company-step">
					<Typography>Make sure everything is correct</Typography>
					<Typography>{this.state.companyName}</Typography>
					<Typography>{this.state.companyLocation}</Typography>
					<Typography>{this.state.companyFounded}</Typography>
					<Typography>{this.state.roleName}</Typography>
				</div>
			);
		default:
			return "Unknown step";
		}
	};

	render() {
		const steps = this.getSteps();
		const { activeStep } = this.state;

		return (
			<div className="company-container">
				<Card className="create-company-card">
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const props = {};
							const labelProps = {};
							if (this.isStepOptional(index)) {
								labelProps.optional = (
									<Typography variant="caption">Optional</Typography>
								);
							}
							if (this.isStepSkipped(index)) {
								props.completed = false;
							}
							return (
								<Step key={label} {...props}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					{activeStep === steps.length ? (
						<CardContent className="final-step">
							<CircularProgress size={70} />
						</CardContent>
					) : (
						<Fragment>
							<CardContent className="create-company-card-content">
								{this.getStepContent(activeStep)}
							</CardContent>
							<CardActions>
								<Button disabled={activeStep === 0} onClick={this.handleBack}>
									Back
								</Button>
								<Button
									variant="raised"
									color="primary"
									className="create-card-button"
									onClick={
										activeStep === steps.length - 1
											? this.handleFinal
											: this.handleNext
									}
								>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
								{this.isStepOptional(activeStep) && (
									<Button
										variant="raised"
										color="primary"
										className="create-card-button"
										onClick={this.handleSkip}
									>
										Skip
									</Button>
								)}
							</CardActions>
						</Fragment>
					)}
				</Card>
			</div>
		);
	}
}
