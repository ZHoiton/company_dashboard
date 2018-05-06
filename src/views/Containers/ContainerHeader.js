import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import Context from "../../context/contexts";

class ContainerHeader extends Component {
	static propTypes = {
		history: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
	}

	onLoginClick = () => {
		this.props.history.push("/login");
		this.setState({ clicked: true });
	};

	onRegisteClick = () => {
		this.props.history.push("/register");
		this.setState({ clicked: true });
	};

	onSignOutClick = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
				this.props.history.push("/");
			})
			.catch(() => {
				// An error happened.
			});
	};

	render() {
		return (
			<AppBar position="static">
				<Toolbar className="nav-bar">
					<IconButton color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="title" color="inherit">
						eZLink
					</Typography>
					<Context>
						{context =>
							!context.userIsLoggedIn ? (
								<Fragment>
									<Button
										className="nav-bar-button-right"
										color="primary"
										onClick={this.onLoginClick}
									>
										<Typography variant="button" color="inherit">
											Login
										</Typography>
									</Button>
									<Button
										className="nav-bar-button-right"
										color="primary"
										onClick={this.onRegisteClick}
									>
										<Typography variant="button" color="inherit">
											Register
										</Typography>
									</Button>
								</Fragment>
							) : (
								<Fragment>
									<Button
										className="nav-bar-button-right"
										color="primary"
										onClick={() => {
											this.props.history.push("/profile");
										}}
									>
										<Typography variant="button" color="inherit">
											Prpo
										</Typography>
									</Button>
									<Button
										className="nav-bar-button-right"
										color="primary"
										onClick={this.onSignOutClick}
									>
										<Typography variant="button" color="inherit">
											Sign out
										</Typography>
									</Button>
								</Fragment>
							)
						}
					</Context>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withRouter(ContainerHeader);
