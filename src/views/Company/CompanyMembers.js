import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Person from "@material-ui/icons/Person";
import Message from "@material-ui/icons/Message";
import Close from "@material-ui/icons/Close";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { firestore } from "firebase";
import { withRouter } from "react-router-dom";

/**
 * used for the Dialog's animation
 * @param {PropTypes} props
 */
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class CompanyMembers extends Component {
	static propTypes = {
		company: PropTypes.object,
		user: PropTypes.object,
		history: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			company: {},
			memberList: {},
			isSnuckBarOpen: false,
			emailError: false,
			emailErrorMessage: "",
			openDialogAddMember: false,
			anchorElementDropDown: null,
			addMemberFieldValue: "",
			selectedMemberKey: ""
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.company) {
			if (this.state.company !== prevProps.company) {
				if (this.props.company.Members) {
					//* filling the member list only when there is a company
					//* object and it has Members key
					this.fillMembersList();
				}
			}
		}
	}

	/**
	 * filling the list used in the render function for displaying the users in the company
	 */
	fillMembersList = () => {
		const { company } = this.props;

		//* creating and populating a temporaty object which will be assigned the the memberList variable later
		const tempList = {};
		console.log(company);
		//* adding the groups
		if (company.Groups) {
			company.Groups.forEach(group => {
				tempList[group.Name] = [];
			});
		}

		//* adding members to the groups
		if (company.Members&&company.Groups) {
			company.Members.forEach(member => {
				member.Groups.forEach(group => {
					tempList[group].push(member);
				});
			});
		}

		//* setting the list and the company var
		this.setState({ memberList: tempList, company: company }, () => {
			// console.log(this.state.memberList);
			// console.log(this.state.company);
		});
	};

	handleDropDownClick = event => {
		this.setState({
			//* setting the element for which the drop down will be attached to
			anchorElementDropDown: event.currentTarget,
			//* passing the selected member key got from the target element attributes
			selectedMemberKey: event.currentTarget.attributes.currentmember.value
		});
	};

	handleDropDownClose = () => {
		this.setState({ anchorElementDropDown: null });
	};

	handleOpenDialogAddMember = () => {
		this.setState({ openDialogAddMember: true });
	};

	handleCloseDialogAddMember = () => {
		this.setState({ openDialogAddMember: false });
	};

	/**
	 * used to update the value for the @param name variable in the state
	 */
	handleAddMemberFieldChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	/**
	 * adding a memebr to a company in firebase
	 * @param email string
	 */
	addMemberToCompany = email => {
		//* user object used for validation and store data if found
		let userFound = null;

		//* serach for the user
		firestore()
			.collection("users")
			.where("email", "==", email)
			.get()
			.then(docs => {
				docs.forEach(doc => {
					//* assign user data to var
					userFound = doc.data();
					userFound["key"] = doc.id;
				});

				//* if user was found e.g. not null send invite else display error
				if (userFound !== null) {
					this.sendInvatation(userFound);
				} else {
					this.setState({ emailErrorMessage: "No such user!", emailError: true });
				}
			})
			.catch(function(error) {
				console.debug("Error getting documents: ", error);
			});
	};

	/**
	 * @param user Object
	 */
	sendInvatation = user => {
		//* check if the user is the current user, if it is display error message
		if (user.key !== this.props.user.id) {
			//* getting firestore refference
			const invitesRef = firestore()
				.collection("users")
				.doc(user.key)
				.collection("invites");

			//* checking if there is already an invite
			invitesRef
				.doc(this.state.company.key)
				.get()
				.then(doc => {
					//* if an invite already exists display error, if not send an invite
					if (doc.exists) {
						this.setState({ emailErrorMessage: "Invitation already send!", emailError: true });
					} else {
						//* sending the invite
						invitesRef.doc(this.state.company.key).set({
							avatar: this.state.company.Avatar,
							name: this.state.company.Name
						});

						//* closing the dialog
						this.handleCloseDialogAddMember();
						//* showing the snuckbar
						this.handleClickSnuckBar();
						this.setState({ emailError: false });
					}
				});
		} else {
			this.setState({ emailErrorMessage: "Oops thats you!", emailError: true });
		}
	};

	/**
	 * used to pass the id to the profile page
	 * @param id String
	 */
	onClickProfile = id => {
		const { history } = this.props;
		history.push("/profile/" + id);
	};

	/**
	 * used to pass the id to the message component
	 * @param targetUserId String
	 */
	onClickMessage = targetUserId => {
		const { history } = this.props;
		history.push("/messenger/" + targetUserId);
	};

	removeUser = userKey => {
		//* Removing the company from the user
		firestore()
			.collection("users")
			.doc(userKey)
			.collection("companies")
			.doc(this.state.company.key)
			.delete();

		//* Removing the user from the company
		firestore()
			.collection("companies")
			.doc(this.state.company.key)
			.collection("Members")
			.doc(userKey)
			.delete();
		if (this.props.user.id === userKey) {
			this.props.history.push("/company");
		}
	};

	handleClickSnuckBar = () => {
		this.setState({ isSnuckBarOpen: true });
	};

	handleCloseSnuckBar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({ isSnuckBarOpen: false });
	};

	/**
	 * Check if an object is empty
	 * @param object Object
	 */
	isEmpty = object => {
		for (const key in object) {
			if (object.hasOwnProperty(key)) return false;
		}
		return true;
	};

	render() {
		const { memberList, anchorElementDropDown, emailError, emailErrorMessage, company, selectedMemberKey } = this.state;
		return (
			<Fragment>
				<div className="company-members">
					{!this.isEmpty(memberList) ? (
						<List className="list">
							{Object.keys(memberList).map(group => {
								return (
									<div key={group}>
										<div className="custom-devider">
											<div className="text">{group}</div>
											<div className="line" />
										</div>
										{memberList[group].map(member => {
											return (
												<Fragment key={member.key}>
													<ListItem button currentmember={member.key} onClick={this.handleDropDownClick}>
														<Avatar alt="Profile picture" src={member.avatar} />
														<ListItemText
															primary={member.firstName + " " + member.lastName}
															secondary={member.Roles.map(role => {
																return role + " ";
															})}
														/>
													</ListItem>
												</Fragment>
											);
										})}
										<Menu
											id="simple-menu"
											anchorEl={anchorElementDropDown}
											open={Boolean(anchorElementDropDown)}
											onClose={this.handleDropDownClose}
											anchorReference="anchorPosition"
											anchorPosition={{
												top: anchorElementDropDown ? anchorElementDropDown.getBoundingClientRect().top + 50 : 0,
												left: anchorElementDropDown ? anchorElementDropDown.getBoundingClientRect().left + 40 : 0
											}}
											transformOrigin={{
												vertical: "top",
												horizontal: "right"
											}}
										>
											<MenuItem onClick={this.onClickProfile.bind(this, selectedMemberKey)}>
												<ListItemIcon>
													<Person />
												</ListItemIcon>
												<ListItemText primary="Profile" />
											</MenuItem>

											{this.props.user.id !== selectedMemberKey ? (
												<MenuItem onClick={this.onClickMessage.bind(this, selectedMemberKey)}>
													<ListItemIcon>
														<Message />
													</ListItemIcon>
													<ListItemText primary="Message" />
												</MenuItem>
											) : (
												undefined
											)}

											{company.FoundedBy === this.props.user.id && this.props.user.id !== selectedMemberKey ? (
												<MenuItem onClick={this.removeUser.bind(this, selectedMemberKey)}>
													<ListItemIcon>
														<Close />
													</ListItemIcon>
													<ListItemText primary="Remove" />
												</MenuItem>
											) : (
												undefined
											)}

											{company.FoundedBy !== this.props.user.id && this.props.user.id === selectedMemberKey ? (
												<MenuItem onClick={this.removeUser.bind(this, selectedMemberKey)}>
													<ListItemIcon>
														<ExitToApp />
													</ListItemIcon>
													<ListItemText primary="Leave" />
												</MenuItem>
											) : (
												undefined
											)}
										</Menu>
									</div>
								);
							})}
						</List>
					) : (
						undefined
					)}

					<Button variant="fab" color="primary" aria-label="add" className="company-add-member-button" onClick={this.handleOpenDialogAddMember}>
						<AddIcon />
					</Button>
				</div>
				<Dialog
					open={this.state.openDialogAddMember}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleCloseDialogAddMember}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">{"Add User"}</DialogTitle>
					<DialogContent>
						<FormControl fullWidth={true}>
							<TextField
								id="addMemberFieldValue"
								label="Email"
								value={this.state.addMemberFieldValue}
								onChange={this.handleAddMemberFieldChange("addMemberFieldValue")}
								margin="normal"
							/>

							{emailError ? (
								<FormHelperText className="error" id="email-error-text">
									{emailErrorMessage}
								</FormHelperText>
							) : (
								undefined
							)}
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseDialogAddMember} color="primary">
							Cancel
						</Button>
						<Button onClick={this.addMemberToCompany.bind(this, this.state.addMemberFieldValue)} variant="contained" color="primary">
							Add
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.isSnuckBarOpen}
					autoHideDuration={4000}
					onClose={this.handleCloseSnuckBar}
				>
					<SnackbarContent
						className="success"
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar" className="message-snuckbar">
								<div className="msg">Invitation send!</div>
							</span>
						}
						action={[
							<IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleCloseSnuckBar}>
								<CloseIcon />
							</IconButton>
						]}
					/>
				</Snackbar>
			</Fragment>
		);
	}
}

export default withRouter(CompanyMembers);
