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
import { firestore } from "firebase";
import { withRouter } from "react-router-dom";

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
			list: {},
			isSnuckBarOpen: false,
			emailError: false,
			emailErrorMessage: "",
			openDialogAddMember: false,
			anchorElementDropDown: null,
			addMemberFieldValue: ""
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.company) {
			if (this.state.company !== prevProps.company) {
				if (this.props.company.Members) {
					// if (this.isEmpty(this.state.list) || ) {
					this.fillMembersList();
					// }
				}
			}
		}
	}

	fillMembersList = () => {
		const { company } = this.props;
		const tempList = {};
		company.Groups.forEach(group => {
			tempList[group.Name] = [];
		});
		company.Members.forEach(member => {
			member.Groups.forEach(group => {
				tempList[group].push(member);
			});
		});

		this.setState({ list: tempList, company: company }, () => {
			console.log(this.state.list);
			console.log(this.state.company);
		});
	};

	handleDropDownClick = event => {
		this.setState({ anchorElementDropDown: event.currentTarget });
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

	handleAddMemberFieldChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	addMemberToCompany = email => {
		let userFound = null;
		firestore()
			.collection("users")
			.where("email", "==", email)
			.get()
			.then(docs => {
				docs.forEach(doc => {
					userFound = doc.data();
					userFound["key"] = doc.id;
					console.debug(doc.data());
				});
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

	sendInvatation = user => {
		console.debug(user);
		if (user.key !== this.props.user.id) {
			const invitesRef = firestore()
				.collection("users")
				.doc(user.key)
				.collection("invites");

			// .add({ Name: "Owner" });
			invitesRef
				.doc(this.state.company.key)
				.get()
				.then(doc => {
					if (doc.exists) {
						this.setState({ emailErrorMessage: "Invitation already send!", emailError: true });
					} else {
						invitesRef.doc(this.state.company.key).set({
							avatar: this.state.company.Avatar,
							name: this.state.company.Name
						});
						this.handleCloseDialogAddMember();
						this.handleClickSnuckBar();
						this.setState({ emailError: false });
					}
				});
		} else {
			this.setState({ emailErrorMessage: "Oops thats you!", emailError: true });
		}
	};

	onClickProfile = id => {
		const { history } = this.props;
		history.push("/profile/" + id);
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
	isEmpty = obj => {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	render() {
		const { list, anchorElementDropDown, emailError, emailErrorMessage, company } = this.state;
		return (
			<Fragment>
				<div className="company-members">
					{!this.isEmpty(list) ? (
						<List className="list">
							{Object.keys(list).map(group => {
								return (
									<div key={group}>
										<div className="custom-devider">
											<div className="text">{group}</div>
											<div className="line" />
										</div>
										{list[group].map(item => {
											return (
												<Fragment key={item.key}>
													<ListItem button onClick={this.handleDropDownClick}>
														<Avatar alt="Profile picture" src={item.avatar} />
														<ListItemText
															primary={item.firstName + " " + item.lastName}
															secondary={item.Roles.map(role => {
																return role + " ";
															})}
														/>
													</ListItem>
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
														<MenuItem onClick={this.onClickProfile.bind(this, item.key)}>Profile</MenuItem>
														<MenuItem onClick={this.handleDropDownClose}>Message</MenuItem>
														{company.FoundedBy === this.props.user.id ? <MenuItem onClick={this.removeUser.bind(this, item.key)}>Remove</MenuItem> : undefined}
													</Menu>
												</Fragment>
											);
										})}
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
