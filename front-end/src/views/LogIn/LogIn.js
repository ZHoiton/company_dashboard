import Card, { CardContent, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField/TextField';
import '../styles/LogInStyles.css';

export default class Login extends Component {

	static propTypes = {
		history: PropTypes.object,
	};


	onLoginClick = () => {
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
