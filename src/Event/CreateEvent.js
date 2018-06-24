import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class CreateEvent extends Component {
	static propTypes = {
		day: PropTypes.instanceOf(Date),
		match: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<Dialog
				fullScreen={true}
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
              Disagree
					</Button>
					<Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default CreateEvent;
