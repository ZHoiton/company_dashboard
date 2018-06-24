import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Popover from "@material-ui/core/Popover";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Business from "@material-ui/icons/Business";
import DateRange from "@material-ui/icons/DateRange";
import Settings from "@material-ui/icons/Settings";
import Message from "@material-ui/icons/Message";
import Badge from "@material-ui/core/Badge";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../../context/AppContext";
import { DrawerContext } from "../../context/DrawerContext";
import { firestore } from "firebase";
import classNames from "classnames";

class ContainerHeader extends Component {
	static propTypes = {
		history: PropTypes.object,
		location: PropTypes.object,
		user: PropTypes.object,
		isUserLoggedIn: PropTypes.bool
	};
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			unReadMessages: 0,
			companyInvites: 0
		};
		this.userName = React.createRef();
	}
	componentDidUpdate(prevPorps) {
		if (prevPorps.user !== this.props.user) {
			if (this.props.isUserLoggedIn) {
				this.unReadMessagesListener(this.props.user.id);
			}
		}
	}

	onLoginClick = () => {
		this.props.history.push("/login");
	};

	handleClick = () => {
		const { clicked } = this.state;
		this.setState({ clicked: !clicked });
	};

	onSignOutClick = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
				this.handleClick();
				this.props.history.push("/");
			})
			.catch(() => {
				// An error happened.
			});
	};

	onSettingsClick = () => {
		this.handleClick();
		this.props.history.push("/settings");
	};

	onProfileClick = userId => {
		this.handleClick();
		this.props.history.push("/profile/" + userId);
	};
	onMessageClick = () => {
		this.handleClick();
		this.props.history.push("/messenger");
	};

	onCompanyClick = () => {
		this.handleClick();
		this.props.history.push("/company");
	};

	onCalendarClick = userId => {
		this.handleClick();
		this.props.history.push("/calendar/" + userId);
	};

	unReadMessagesListener = userId => {
		firestore()
			.collection("users")
			.doc(userId)
			.collection("conversations")
			.where("is_message_read", "==", false)
			.onSnapshot(snapshot => {
				let count = 0;
				snapshot.forEach(() => {
					count++;
				});
				this.setState({ unReadMessages: count });
			});
	};

	companyInvitesListener = userId => {
		firestore()
			.collection("users")
			.doc(userId)
			.collection("invites")
			.onSnapshot(snapshot => {
				let count = 0;
				snapshot.forEach(() => {
					count++;
				});
				this.setState({ companyInvites: count });
			});
	};

	render() {
		const { location } = this.props;
		const { clicked, unReadMessages, companyInvites } = this.state;
		return (
			<DrawerContext>
				{context => (
					<AppBar position="static" className={classNames(context.isOpen ? "small" : "big")}>
						<Toolbar className="nav-bar">
							<div>
								{location.pathname.includes("/company") ? (
									<IconButton color="inherit" aria-label="Menu" onClick={context.onClickOpen}>
										<MenuIcon />
									</IconButton>
								) : (
									undefined
								)}
							</div>
							<Typography variant="title" color="inherit">
								eZLink
							</Typography>
							<AuthContext>
								{context =>
									!context.userIsLoggedIn ? (
										<Button className="nav-bar-button-right" color="inherit" onClick={this.onLoginClick}>
											<Typography variant="button" color="inherit">
												Login
											</Typography>
										</Button>
									) : (
										<div className="nav-bar-buttons" ref={this.userName}>
											<Button onClick={this.handleClick} color="inherit">
												<Avatar alt="Remy Sharp" onClick={this.handleClick} src={context.user.picture} className="nav-bar-avatar" />
												{context.user.firstName}
											</Button>
											<Popover
												open={clicked}
												anchorEl={this.userName.current ? this.userName.current : null}
												anchorReference="anchorEl"
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "left"
												}}
												transformOrigin={{
													vertical: "top",
													horizontal: "left"
												}}
											>
												<ClickAwayListener onClickAway={this.handleClick}>
													<Grow in={clicked}>
														<Paper>
															<MenuList role="menu">
																<MenuItem onClick={this.handleClick}>
																	<ListItemIcon>
																		<Dashboard />
																	</ListItemIcon>
																	<ListItemText primary="Dashboard" />
																</MenuItem>
																<MenuItem onClick={this.onProfileClick.bind(this, context.user.id)}>
																	<ListItemIcon>
																		<Person />
																	</ListItemIcon>
																	<ListItemText primary="Profile" />
																</MenuItem>
																<MenuItem onClick={this.onCompanyClick}>
																	<ListItemIcon>
																		{companyInvites > 0 ? (
																			<Badge badgeContent={companyInvites} color="primary">
																				<Business />
																			</Badge>
																		) : (
																			<Business />
																		)}
																	</ListItemIcon>
																	<ListItemText primary="Companies" />
																</MenuItem>
																<MenuItem onClick={this.onCalendarClick.bind(this, context.user.id)}>
																	<ListItemIcon>
																		<DateRange />
																	</ListItemIcon>
																	<ListItemText primary="Calendar" />
																</MenuItem>
																<MenuItem onClick={this.onSettingsClick}>
																	<ListItemIcon>
																		<Settings />
																	</ListItemIcon>
																	<ListItemText primary="Settings" />
																</MenuItem>
																<MenuItem onClick={this.onMessageClick}>
																	<ListItemIcon>
																		{unReadMessages > 0 ? (
																			<Badge badgeContent={unReadMessages} color="primary">
																				<Message />
																			</Badge>
																		) : (
																			<Message />
																		)}
																	</ListItemIcon>
																	<ListItemText primary="Messages" />
																</MenuItem>
																<MenuItem onClick={this.onSignOutClick}>
																	<ListItemIcon>
																		<ExitToApp />
																	</ListItemIcon>
																	<ListItemText primary="Logout" />
																</MenuItem>
															</MenuList>
														</Paper>
													</Grow>
												</ClickAwayListener>
											</Popover>
										</div>
									)
								}
							</AuthContext>
						</Toolbar>
					</AppBar>
				)}
			</DrawerContext>
		);
	}
}

export default withRouter(ContainerHeader);
