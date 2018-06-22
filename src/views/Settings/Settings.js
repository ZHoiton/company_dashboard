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
import firebase from "firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import { firestore } from "firebase";
class Settings extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			password1: "",
			password2: "",
			passwordError: false,
			passwordErrorMessage: "",
			firstName: "",
			lastName: "",
			phoneNumber: "",
			birthDay: "",
			description: ""
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	onChange = event => {
		const state = {};
		state[event.target.id] = event.target.value;
		this.setState(state);
	};
	handleChangeIndex = index => {
		this.setState({ value: index });
	};
	onSubmit = () => {
		const { password1, password2 } = this.state;
		this.setState({ passwordError: false });
		if (password1 === password2) {
			firebase.auth().currentUser.updatePassword(password1);
		} else {
			this.setState({
				passwordErrorMessage: "Passwords do not match",
				passwordError: true
			});
		}
	};
	onSaveClick = () => {
		const {
			firstName,
			lastName,
			phoneNumber,
			birthDay,
			description
		} = this.state;
		firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.update({
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber,
				birthDay: birthDay,
				personalDescription: description
			});
	};
	loadPersonalData = () => {
		firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then(doc => {
				if (!doc.exists) {
					console.log("No such document!");
				} else {
					console.log("Document data:", doc.data(), doc.data().firstName);
					this.setState({
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						phoneNumber: doc.data().phoneNumber,
						birthDay: doc.data().birthDay,
						description: doc.data().personalDescription
					});
				}
			})
			.catch(err => {
				console.log("Error getting document", err);
			});
	};
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.loadPersonalData();
			} else {
				// No user is signed in.
			}
		});
	}
	render() {
		const { classes } = this.props;
		const { value } = this.state;
		const { password1 } = this.state;
		const { password2 } = this.state;
		const { passwordError } = this.state;
		const { passwordErrorMessage } = this.state;
		const { firstName } = this.state;
		const { lastName } = this.state;
		const { phoneNumber } = this.state;
		const { birthDay } = this.state;
		const { description } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<div className="lTabs">
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							fullWidth
						>
							<Tab className="tabPersonal" label="Personal Settings " />
							<Tab className="tabCompany" label="Company Settings" />
						</Tabs>
					</div>
				</AppBar>
				{value === 0 && (
					<div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<TextField
									id="firstName"
									label="First Name"
									className="txtFieldWidth"
									value={firstName}
									onChange={this.onChange}
									margin="normal"
								/>
							</FormControl>
							<TextField
								id="password1"
								value={password1}
								label="New Password"
								onChange={this.onChange}
								className="passTextField"
								type="password"
								autoComplete="current-password"
								margin="normal"
							/>
						</div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<TextField
									id="lastName"
									label="Last Name"
									className="txtFieldWidth"
									value={lastName}
									onChange={this.onChange}
									margin="normal"
								/>
							</FormControl>
							<TextField
								id="password2"
								value={password2}
								label="Confirm Password"
								onChange={this.onChange}
								className="passTextField"
								type="password"
								autoComplete="current-password"
								margin="normal"
							/>
							{passwordError ? (
								<FormHelperText
									className="passErrorMessage"
									id="password-error-text"
								>
									{passwordErrorMessage}
								</FormHelperText>
							) : (
								undefined
							)}
						</div>
						<div className="settingsFields">
							<form className={classes.container} noValidate>
								<TextField
									id="birthDay"
									label="Date of birth"
									type="date"
									value={birthDay}
									onChange={this.onChange}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</form>
							<Button
								size="large"
								variant="raised"
								color="primary"
								onClick={this.onSubmit}
								className="changePassButton"
							>{`Change Password`}</Button>
						</div>
						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="uncontrolled-native">Gender</InputLabel>
								<NativeSelect
									className="txtFieldWidth"
									input={<Input id="uncontrolled-native" />}
								>
									<option value={"Male"}>Male</option>
									<option value={"Female"}>Female</option>
									<option value={"Alien"}>Alien</option>
								</NativeSelect>
							</FormControl>
						</div>

						<div className="settingsFields">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="uncontrolled-native">
									Department
								</InputLabel>
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
							<FormControl className={classes.formControl}>
								<TextField
									id="phoneNumber"
									label="Phone Number"
									type="number"
									className="txtFieldWidth"
									value={phoneNumber}
									onChange={this.onChange}
									margin="normal"
								/>
							</FormControl>
						</div>
						<div className="settingsFields">
							<TextField
								id="description"
								label="Description"
								value={description}
								onChange={this.onChange}
								fullWidth
								multiline
								rowsMax="4"
								margin="normal"
							/>
						</div>
						<Button
							size="large"
							variant="raised"
							onClick={this.onSaveClick}
							color="primary"
							className="btnSave"
						>
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
								<Input id="name-Location" className="txtFieldWidth" />
							</FormControl>
						</div>
						<Button
							size="large"
							variant="raised"
							color="primary"
							className="btnSave"
						>{`Save`}</Button>
					</div>
				)}
			</div>
		);
	}
}

export default withStyles({ withTheme: true })(Settings);
