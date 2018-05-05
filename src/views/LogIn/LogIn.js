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
			db: firebase.firestore(),
		};
	}

	onLoginClick = () => {
		const { db } = this.state;
		db.collection("users").add({
			first: "Ada1",
			last: "Lovelace",
			born: 1815
		})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		this.props.history.push('/profile');
	}

	render() {
		return (
			<Card className='login-page'>
				<CardHeader title='Log In'/>
				<CardContent className='login-page'>
					<TextField
						id="email"
						label="Email"
						className='text-field'
						margin="normal"
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
