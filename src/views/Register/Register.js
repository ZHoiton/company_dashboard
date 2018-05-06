import Card, { CardContent, CardHeader } from "material-ui/Card";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField/TextField";
import { FormControl, FormHelperText } from "material-ui/Form";
import "../styles/RegisterStyles.css";
import firebase from "firebase";

export default class Register extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			users: firebase.firestore().collection("users"),
			emailTakenError: false,
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			passwordConfirmMatch: false
		};
	}

	onChange = event => {
		const state = {};
		state[event.target.id] = event.target.value;
		this.setState(state);
	};

	isPasswordMatching = event => {
		if (this.state.password === event.target.value) {
			this.setState({ passwordConfirmMatch: false });
		} else {
			this.setState({ passwordConfirmMatch: true });
		}
	};

	onRegisterClick = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(user => {
				user
					.sendEmailVerification()
					.then(() => {
						// Email sent.
						this.state.users.doc(user.uid).set({
							firstName: this.state.firstName,
							lastName: this.state.lastName
						});
						this.props.history.push("/login");
					})
					.catch(() => {
						// An error happened.
					});
			})
			.catch(error => {
				// Handle Errors here.
				const errorCode = error.code;
				// console.log(errorCode);
				if (errorCode === "auth/email-already-in-use") {
					this.setState({ emailTakenError: true });
				}
				// ...
			});
	};

	render() {
		const { emailTakenError, passwordConfirmMatch } = this.state;
		return (
			<Card className="register-page">
				<CardHeader title="Register" />
				<CardContent className="register-page">
					<TextField
						id="firstName"
						label="First name"
						className="text-field"
						margin="normal"
						onChange={this.onChange}
					/>
					<TextField
						id="lastName"
						label="Last name"
						className="text-field"
						margin="normal"
						onChange={this.onChange}
					/>
					<FormControl fullWidth={true}>
						<TextField
							id="email"
							label="Email"
							className="text-field"
							margin="normal"
							error={emailTakenError}
							onChange={this.onChange}
						/>
						{emailTakenError ? (
							<FormHelperText className="error" id="email-error-text">
								Email already taken
							</FormHelperText>
						) : (
							undefined
						)}
					</FormControl>
					<TextField
						id="password"
						label="Password"
						className="text-field"
						type="password"
						autoComplete="current-password"
						margin="normal"
						onChange={this.onChange}
					/>
					<FormControl fullWidth={true}>
						<TextField
							id="passwordConfirm"
							label="Confirm Password"
							className="text-field"
							type="password"
							autoComplete="current-password"
							error={passwordConfirmMatch}
							margin="normal"
							onChange={this.isPasswordMatching}
						/>

						{passwordConfirmMatch ? (
							<FormHelperText className="error" id="email-error-text">
								Password does not match
							</FormHelperText>
						) : (
							undefined
						)}
					</FormControl>
					<Button
						variant="raised"
						color="primary"
						className="button"
						onClick={this.onRegisterClick}
					>
						Sign up
					</Button>
				</CardContent>
			</Card>
		);
	}
}
