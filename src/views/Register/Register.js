import Card, { CardContent, CardHeader } from "material-ui/Card";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField/TextField";
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
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			passwordConfirm: ""
		};
	}

	onChange = event => {
		const state = {};
		state[event.target.id] = event.target.value;
		this.setState(state);
	};

	onRegisterClick = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(user => {
				user
					.sendEmailVerification()
					.then(function() {
						// Email sent.
					})
					.catch(function() {
						// An error happened.
					});
			})
			.catch(() => {
				// Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// ...
			});
		// this.props.history.push("/profile");
	};

	render() {
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
					<TextField
						id="email"
						label="Email"
						className="text-field"
						margin="normal"
						onChange={this.onChange}
					/>
					<TextField
						id="password"
						label="Password"
						className="text-field"
						type="password"
						autoComplete="current-password"
						margin="normal"
						onChange={this.onChange}
					/>
					<TextField
						id="passwordConfirm"
						label="Confirm Password"
						className="text-field"
						type="password"
						autoComplete="current-password"
						margin="normal"
						onChange={this.onChange}
					/>
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
