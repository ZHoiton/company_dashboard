import React, { Component, Fragment } from 'react';
import { firestore } from 'firebase';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from "@material-ui/core/Chip";
import withRouter from 'react-router-dom/withRouter';

class CreateEvent extends Component {
	static propTypes = {
		isMeeting: PropTypes.string,
		companyId: PropTypes.string,
		isOpen: PropTypes.bool,
		onClose: PropTypes.func,
		defaultDate: PropTypes.object,
		match: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			description: "",
			title: "",
			startTime: null,
			endTime: null,
			emailError: false,
			emailErrorMessage: "",
			email: "",
			usersList: [],
		};
		this.users = [];
	}

	componentDidMount() {
		const { companyId, isMeeting } = this.props;
		const tempArray = this.state.usersList.slice();
		if (companyId){
			firestore()
				.collection('companies')
				.doc(this.props.companyId)
				.collection('Members')
				.get((snapshot)=> {
					snapshot.forEach((doc)=> {
						tempArray.push(`${doc.data().firstName} ${doc.data().lastName}`);
						const tempUser = doc.data();
						tempUser.id = doc.id;
						this.users.push(tempUser);
						this.setState({usersList: tempArray});
					});
				});
		}

		if (isMeeting) {
			firestore().collection("users").doc(isMeeting).get().then((doc)=> {
				tempArray.push(`${doc.data().firstName} ${doc.data().lastName}`);
				const tempUser = doc.data();
				tempUser.id = doc.id;
				this.users.push(tempUser);
				this.setState({usersList: tempArray});
			});
		}
	}

	onChange = event => {
		this.setState({[event.target.id]:event.target.value});
	}

	onCreate = async () => {
		const { description, title, startTime,endTime } = this.state;
		let currentUser;
		await firestore().collection("users").doc(this.props.match.params.userId).get().then((doc)=> {
			currentUser = doc.data();
			currentUser.id = doc.id;
			this.users.push(currentUser);
		});
		let eventId;
		await firestore()
			.collection("events")
			.add({
				description: description,
				title: title,
				startTime: new Date(startTime),
				endTime: new Date(endTime)
			}).then(doc=>{
				eventId = doc.id;
			});
		const batch = firestore().batch();
		for (const user of this.users) {
			const ref = firestore().collection("users").doc(user.id).collection('events').doc(eventId);
			batch.set(ref,{title:title,startTime:new Date(startTime)});
			firestore()
				.collection("events")
				.doc(eventId)
				.collection("attendants")
				.doc(user.id)
				.set({name:`${user.firstName} ${user.lastName}`,avatar: user.photoURL});
		}

		batch.commit();
		this.onClose();
	}

	onAddUser = () => {
		const email = this.state.email;
		const tempArray = this.state.usersList.slice();

		firestore()
			.collection("users")
			.where("email", "==", email)
			.get()
			.then(docs => {
				docs.forEach(doc => {
					if (doc.exists){
						if (tempArray.includes(`${doc.data().firstName} ${doc.data().lastName}`)) {
							this.setState({ emailErrorMessage: "User already added!", emailError: true });
							return;
						}
						tempArray.push(`${doc.data().firstName} ${doc.data().lastName}`);
						const tempUser = doc.data();
						tempUser.id = doc.id;
						this.users.push(tempUser);
						this.setState({usersList: tempArray});
					} else {
						this.setState({ emailErrorMessage: "No such user!", emailError: true });
					}
				});
			})
			.catch(function(error) {
				console.debug("Error getting documents: ", error);
			});
	};

	onClose = () => {
		this.users = [];
		this.setState({usersList:[],email:"",description:"",title:"",startTime:"",endTime:""});
		this.props.onClose();
	}

	render() {
		const {isOpen, defaultDate, isMeeting, companyId} = this.props;
		const { description, title, email, emailError, emailErrorMessage, usersList, startTime, endTime } = this.state;
		let defaultStart = "";
		let defaultEnd = "";
		if (defaultDate){
			defaultStart = `${defaultDate.getFullYear()}-0${defaultDate.getMonth()+1}-${defaultDate.getDate()<10? "0" + defaultDate.getDate():defaultDate.getDate()}T12:30`;
			defaultEnd = `${defaultDate.getFullYear()}-0${defaultDate.getMonth()+1}-${defaultDate.getDate()<10? "0" + defaultDate.getDate():defaultDate.getDate()}T14:30`;
			if (!startTime && !endTime) this.setState({startTime:defaultStart,endTime:defaultEnd});
		}

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
							id="title"
							label="Title"
							value={title}
							onChange={this.onChange}
							margin="normal"
						/>
						<TextField
							id="description"
							label="Description"
							value={description}
							onChange={this.onChange}
							margin="normal"
						/>
						<TextField
							id="startTime"
							label="Start of meeting"
							type="datetime-local"
							defaultValue={defaultStart}
							onChange={this.onChange}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>
						<TextField
							id="endTime"
							label="End of meeting"
							type="datetime-local"
							defaultValue={defaultEnd}
							onChange={this.onChange}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>
					</FormControl>
					{!isMeeting && !companyId?
						<Fragment>
							{usersList.map((user,index)=> {
								return (
									<Chip key={index} label={user} className="chip" />
								);
							})}
							<FormControl fullWidth={true}>
								<TextField
									id="email"
									label="Email"
									value={email}
									onChange={this.onChange}
									margin="normal"
								/>
								{emailError ? (
									<FormHelperText className="error" id="email-error-text">
										{emailErrorMessage}
									</FormHelperText>
								) : (
									undefined
								)}
								<Button onClick={this.onAddUser} color="primary">
								Add to Event
								</Button>
							</FormControl>
						</Fragment>:undefined
					}

				</DialogContent>
				<DialogActions>
					<Button onClick={this.onClose} color="primary">
						Discard
					</Button>
					<Button onClick={this.onCreate} color="primary" autoFocus>
						Schedule
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withRouter(CreateEvent);
