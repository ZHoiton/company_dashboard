import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
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
			emailError: false,
			passwordError: false,
			emailErrorMessage: ""
		};
	}

	onCLickRegister = () => {
		this.props.history.push("/register");
	};

	onLoginClick = () => {
		const { email, password } = this.state;
		this.setState({emailError: false,
			passwordError: false,});
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				// console.log(user);
				// console.log(user.emailVerified);
				if (!user.emailVerified) {
					this.setState({
						emailErrorMessage: "Email not verified",
						emailError: true
					});
				} else {
					this.props.history.push("/profile");
				}
			})
			.catch(error => {
				// Handle Errors here.
				const errorCode = error.code;

				let state = {};
				if (errorCode === "auth/user-not-found") {
					state = {
						emailErrorMessage: "Email not found",
						emailError: true
					};
				}
				state.passwordError  = errorCode === "auth/wrong-password";
				this.setState(state);
			});
	};

	onChange = event => {
		const state = {};
		state[event.target.id] = event.target.value;
		this.setState(state);
	};

	render() {
		const { email, emailError, emailErrorMessage, passwordError } = this.state;
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
								{emailErrorMessage}
							</FormHelperText>
						) : (
							undefined
						)}
					</FormControl>
					<FormControl fullWidth={true}>
						<TextField
							id="password"
							label="Password"
							className="text-field"
							type="password"
							autoComplete="current-password"
							error={passwordError}
							margin="normal"
							onChange={this.onChange}
						/>
						{passwordError ? (
							<FormHelperText className="error" id="email-error-text">
								Wrong password
							</FormHelperText>
						) : (
							undefined
						)}
					</FormControl>

					<Button
						variant="raised"
						color="primary"
						className="button"
						onClick={this.onLoginClick}
					>
						{`Login`}
					</Button>
					<p
						onClick={this.onCLickRegister}
						className="login-text"
					>{`Don't have an account? Register!`}</p>
				</CardContent>
			</Card>
		);
	}
}
