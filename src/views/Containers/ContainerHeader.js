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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from "../../context/AppContext";
import { DrawerContext } from "../../context/DrawerContext";
import classNames from 'classnames';

class ContainerHeader extends Component {
	static propTypes = {
		history: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
		this.userName = React.createRef();
	}

	onLoginClick = () => {
		this.props.history.push("/login");
	};

	handleClick = () => {
		const { clicked } = this.state;
		this.setState({clicked:!clicked});
	}

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
	}

	onProfileClick = () =>{
		this.handleClick();
		this.props.history.push("/profile");
	}

	onCompanyClick = () =>{
		this.handleClick();
		this.props.history.push("/company");
	}

	render() {
		const { clicked } = this.state;
		return (
			<DrawerContext>
				{context => (
					<AppBar position="static" className={classNames(context.isOpen ? 'small' : 'big')}>
						<Toolbar className="nav-bar">

							<IconButton color="inherit" aria-label="Menu" onClick={context.onClickOpen}>
								<MenuIcon />
							</IconButton>

							<Typography variant="title" color="inherit">
						eZLink
							</Typography>
							<AuthContext>
								{context =>
									!context.userIsLoggedIn ? (

										<Button
											className="nav-bar-button-right"
											color="inherit"
											onClick={this.onLoginClick}
										>
											<Typography variant="button" color="inherit">
											Login
											</Typography>
										</Button>
									) : (
										<div className="nav-bar-buttons" ref={this.userName}>
											<Button
												onClick={this.handleClick}
												color="inherit"
											>
												{context.user.firstName}
											</Button>
											<Avatar alt="Remy Sharp" onClick={this.handleClick} src={context.user.picture} />
											<Popover
												open={clicked}
												anchorEl={(this.userName.current)?this.userName.current:null}
												anchorReference='anchorEl'
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'left',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'left',
												}}
											>
												<ClickAwayListener onClickAway={this.handleClick}>
													<Grow in={clicked}>
														<Paper>
															<MenuList role="menu">
																<MenuItem onClick={this.handleClick}>Dashboard</MenuItem>
																<MenuItem onClick={this.onProfileClick}>Profile</MenuItem>
																<MenuItem onClick={this.onCompanyClick}>Company</MenuItem>
																<MenuItem onClick={this.handleClick}>Calendar</MenuItem>
																<MenuItem onClick={this.onSettingsClick}>Settings</MenuItem>
																<MenuItem onClick={this.handleClick}>Messages</MenuItem>
																<MenuItem onClick={this.onSignOutClick}>Logout</MenuItem>
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
