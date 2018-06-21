import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import "../styles/MessengerStyles.css";
import { AuthContext } from "../../context/AppContext";
import MessengerLeft from "./MessengerLeftSide.js";
import MessengerRight from "./MessengerRightSide.js";

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			targetUser: null
		};
	}

	onUserClick = key => {
		this.setState({ targetUser: key });
	};

	render() {
		const { targetUser } = this.state;
		return (
			<div className="messenger-wrapper">
				<Card className="messenger-container">
					<AuthContext>
						{context => {
							return context.userIsLoggedIn ? (
								<Fragment>
									<MessengerLeft user={context.user} onClick={this.onUserClick} />
									<MessengerRight user={context.user} targetUser={targetUser} />
								</Fragment>
							) : (
								undefined
							);
						}}
					</AuthContext>
				</Card>
			</div>
		);
	}
}
