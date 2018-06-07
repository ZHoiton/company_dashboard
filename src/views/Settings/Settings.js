import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import '../styles/SettingsStyles.css';

class CenteredTabs extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes} = this.props; 
		const { value } = this.state;


		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
					>
						<Tab label="Personal Settings" />
						<Tab label="Company Settings" />
					</Tabs>
				</AppBar>
				{value === 0 && <div>
					<div className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="name-simple">First Name</InputLabel>
							<Input
								id="name-simple"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</FormControl>
					</div>

					<div className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="name-simple">Last Name</InputLabel>
							<Input
								id="name-simple"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</FormControl>
					</div>
					<div className={classes.container}>
						<form className={classes.container} noValidate>
							<TextField
								id="date"
								label="Date of birth"
								type="date"
								defaultValue="2017-05-24"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</form>
					</div>
					<div className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="uncontrolled-native">Gender</InputLabel>
							<NativeSelect
								defaultValue={30}
								input={<Input id="uncontrolled-native" />}
							>
								<option value={"Male"}>Male</option>
								<option value={"Female"}>Female</option>
								<option value={"Alien"}>Alien</option>
							</NativeSelect>
						</FormControl>
					</div>

					<div className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="uncontrolled-native">Department</InputLabel>
							<NativeSelect
								defaultValue={30}
								input={<Input id="uncontrolled-native" />}
							>

								<option value={"Software"}>Software</option>
								<option value={"HR"}>Human Resources</option>
								<option value={"Finance"}>Finance</option>
							</NativeSelect>
						</FormControl>
					</div>

					<div className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="uncontrolled-native">Position</InputLabel>
							<NativeSelect
								defaultValue={30}
								input={<Input id="uncontrolled-native" />}
							>
								<option value={"CEO"}>CEO</option>
								<option value={"Junior Developer"}>Junior Developer</option>
								<option value={"Senior Developer"}>Senior Developer</option>
							</NativeSelect>
						</FormControl>
					</div>

					<div className={classes.container}>
						<TextField
							id="multiline-flexible"
							label="Description"
							fullWidth
							multiline
							rowsMax="4"
							margin="normal"
						/>
					</div>
					<Button
						variant="raised"
						color="primary"
						className="button"
					>
						{`Save`}
					</Button>
				</div>}
				{value === 1 &&
					<div>
						Company Settings

						<div className={classes.container}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-simple">Company Name</InputLabel>
								<Input
									id="name-simple"
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</FormControl>
						</div>

						<div className={classes.container}>
							<form className={classes.container} noValidate>
								<TextField
									id="date"
									label="Founded"
									type="date"
									defaultValue="2017-05-24"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</form>
						</div>

						<div className={classes.container}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-simple">Location</InputLabel>
								<Input
									id="name-simple"
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</FormControl>
						</div>
						<Button
							variant="raised"
							color="primary"
							className="button"
						>{`Save`}</Button>
				</div>}
			</div>

		);
	}
}

export default withStyles({ withTheme: true })(CenteredTabs);
