import Card, { CardContent, CardHeader } from 'material-ui/Card';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField/TextField';
import '../styles/LogInStyles.css';

export default class Login extends Component {
	render() {
		return (
			<Card className='profile-page'>
				<CardHeader title='Log In'/>
				<CardContent >
					<div className='login-card'>
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
						<Button variant="raised" color="primary" className='button'>
							Default
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}
}