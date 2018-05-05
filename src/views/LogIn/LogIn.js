import Card, { CardContent, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField/TextField';
import '../styles/LogInStyles.css';
import firebase from 'firebase';

export default class Login extends Component {

	static propTypes = {
		history: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			users: firebase.firestore().collection("users"),
			email: "",
		};
	}

	onLoginClick = () => {
		const { users, email } = this.state;
		users.add({
			first: email,
			last: "Lovelace",
			born: 1815
		})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		this.props.history.push('/profile');
	}

	onChange = (e) =>{
		console.log(e.target);
		this.setState({email: e.target.value});
	}

	render() {
		const {email} = this.state;
		return (
			<Card className='login-page'>
				<CardHeader title='Log In'/>
				<CardContent className='login-page'>
					<TextField
						id="email"
						label="Email"
						value={email}
						className='text-field'
						margin="normal"
						onChange={this.onChange}
					/>
					<TextField
						id="password-input"
						label="Password"
						className='text-field'
						type="password"
						autoComplete="current-password"
						margin="normal"
					/>

					<Button variant="raised" color="primary" className='button' onClick={this.onLoginClick}>
							Login
					</Button>

				</CardContent>
			</Card>
		);
	}
}
