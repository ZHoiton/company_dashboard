import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import "../styles/SettingsStyles.css";

class CenteredTabs extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<div className="lTabs">
						<Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth>
							<Tab className="tabPersonal" label="Personal Settings " />
							<Tab className="tabCompany" label="Company Settings" />
						</Tabs>
					</div>
				</AppBar>
				{value === 0 && (
					<div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-first">First Name</InputLabel>
								<Input
									className="txtFieldWidth"
									id="name-simple"
								/>
							</FormControl>
							<TextField id="password-input" label="New Password" className="passTextField" type="password" autoComplete="current-password" margin="normal" />
						</div>

						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-last">Last Name</InputLabel>
								<Input
									id="name-simple"
									className="txtFieldWidth"
								/>
							</FormControl>
							<TextField id="password-input" label="Confirm Password" className="passTextField" type="password" autoComplete="current-password" margin="normal" />
						</div>
						<div className="settingsFields">
							<form className={classes.container} noValidate>
								<TextField
									id="date"
									label="Date of birth"
									type="date"
									defaultValue="2017-05-24"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</form>
							<Button size="large" variant="raised" color="primary" className="changePassButton">{`Change Password`}</Button>
						</div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="uncontrolled-native">Gender</InputLabel>
								<NativeSelect className="txtFieldWidth" input={<Input id="uncontrolled-native" />}>
									<option value={"Male"}>Male</option>
									<option value={"Female"}>Female</option>
									<option value={"Alien"}>Alien</option>
								</NativeSelect>
							</FormControl>
						</div>

						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="uncontrolled-native">Department</InputLabel>
								<NativeSelect input={<Input id="uncontrolled-native" />}>
									<option value={"Software"}>Software</option>
									<option value={"HR"}>Human Resources</option>
									<option value={"Finance"}>Finance</option>
								</NativeSelect>
							</FormControl>
						</div>

						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="uncontrolled-native">Position</InputLabel>
								<NativeSelect input={<Input id="uncontrolled-native" />}>
									<option value={"CEO"}>CEO</option>
									<option value={"Junior Developer"}>Junior Developer</option>
									<option value={"Senior Developer"}>Senior Developer</option>
								</NativeSelect>
							</FormControl>
						</div>

						<div className="settingsFields">
							<TextField id="multiline-description" label="Description" fullWidth multiline rowsMax="4" margin="normal" />
						</div>
						<Button size="large" variant="raised" color="primary" className="btnSave">
							{`Save`}
						</Button>
					</div>
				)}
				{value === 1 && (
					<div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-simple">Company Name</InputLabel>
								<Input
									id="name-company"
									className="txtFieldWidth"
									style={{ width: "100%" }}
								/>
							</FormControl>
						</div>

						<div className="settingsFields">
							<form className={classes.container} noValidate>
								<TextField
									id="date"
									label="Founded"
									type="date"
									defaultValue="2017-05-24"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</form>
						</div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="name-simple">Location</InputLabel>
								<Input
									id="name-Location"
									className="txtFieldWidth"
								/>
							</FormControl>
						</div>
						<Button size="large" variant="raised" color="primary" className="btnSave">{`Save`}</Button>
					</div>
				)}
			</div>
		);
	}
}

export default withStyles({ withTheme: true })(CenteredTabs);
