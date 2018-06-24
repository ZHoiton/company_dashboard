import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class CreateEvent extends Component {
	static propTypes = {
		isMeeting: PropTypes.bool,
		isCompany: PropTypes.bool,
		isOpen: PropTypes.bool,
		onClose: PropTypes.func,
		day: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			description: "",
			title: "",
		};
	}

	onChange = event => {
		console.log(event.target.id);
	}

	render() {
		const {isOpen, onClose, day} = this.props;
		const { description, title } = this.state;
		let defaultStart = "";
		let defaultEnd = "";
		if (day){
			defaultStart = `${day.toDate().getFullYear()}-${day.toDate().getMonth()}-${day.toDate().getDate()}T12:30`;
			defaultEnd = `${day.toDate().getFullYear()}-${day.toDate().getMonth()}-${day.toDate().getDate()}T14:30`;
		}
		console.log(defaultStart,defaultEnd);
		return (
			<Dialog
				open={isOpen}
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Create an event"}</DialogTitle>
				<DialogContent>
					<FormControl fullWidth={true}>
						<TextField
							id="description"
							label="Description"
							value={description}
							onChange={this.onChange}
							margin="normal"
						/>
						<TextField
							id="title"
							label="Title"
							value={title}
							onChange={this.onChange}
							margin="normal"
						/>
						<TextField
							id="datetime-local"
							label="Start of meeting"
							type="datetime-local"
							defaultValue={defaultStart}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>
						<TextField
							id="datetime-local"
							label="End of meeting"
							type="datetime-local"
							defaultValue={defaultEnd}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
              Disagree
					</Button>
					<Button onClick={onClose} color="primary" autoFocus>
              Agree
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default CreateEvent;
