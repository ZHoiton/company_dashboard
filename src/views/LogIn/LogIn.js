import Card, { CardContent, CardHeader } from "material-ui/Card";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField/TextField";
import { FormControl, FormHelperText } from "material-ui/Form";
import "../styles/LogInStyles.css";
import firebase from "firebase";

export default class Login extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			users: firebase.firestore().collection("users"),
			email: "",
			password: "",
			emailError: false
		};
	}

	onLoginClick = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				// console.log(user);
				// console.log(user.emailVerified);
				if (!user.emailVerified) {
					this.setState({ emailError: true });
				}else {
					this.props.history.push("/");
				}
			});
		// .catch(error => {
		// 	// Handle Errors here.
		// 	const errorCode = error.code;
		// 	// console.log(errorCode);
		// 	const errorMessage = error.message;
		// 	// console.log(errorMessage);
		// 	// ...
		// });
	};

	onChange = event => {
		const state = {};
		state[event.target.id] = event.target.value;
		this.setState(state);
	};

	render() {
		const { email, emailError } = this.state;
		return (
			<Card className="login-page">
				<CardHeader title="Log In" />
				<CardContent className="login-page">
					<FormControl fullWidth={true}>
						<TextField
							id="email"
							label="Email"
							value={email}
							error={emailError}
							className="text-field"
							margin="normal"
							onChange={this.onChange}
						/>
						{emailError ? (
							<FormHelperText className="error" id="email-error-text">
								Verify email
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

					<Button
						variant="raised"
						color="primary"
						className="button"
						onClick={this.onLoginClick}
					>
						Login
					</Button>
				</CardContent>
			</Card>
		);
	}
}
