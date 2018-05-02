import Card, { CardContent, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField/TextField';
import '../styles/RegisterStyles.css';

export default class Login extends Component {

	static propTypes = {
		history: PropTypes.object,
	};


	onRegisterClick = () => {
		this.props.history.push('/profile');
	}

	render() {
		return (
			<Card className='register-page'>
				<CardHeader title='Register'/>
				<CardContent className='register-page'>
                    <TextField
						id="first_name"
						label="First name"
						className='text-field'
						margin="normal"
					/>
                    <TextField
						id="last_name"
						label="Last name"
						className='text-field'
						margin="normal"
					/>
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
					<TextField
						id="confirm-password-input"
						label="Confirm Password"
						className='text-field'
						type="password"
						autoComplete="current-password"
						margin="normal"
					/>

					<Button variant="raised" color="primary" className='button' onClick={this.onRegisterClick}>
							Sign up
					</Button>

				</CardContent>
			</Card>
		);
	}
}
