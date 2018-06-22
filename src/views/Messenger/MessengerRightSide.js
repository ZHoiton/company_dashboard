import React, { Component } from "react";
import PropTypes from "prop-types";
// import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import MessagesContainer from "./RightSide/MessagesContainer.js";
import WriteMessageContainer from "./RightSide/WriteMessageContainer.js";

export default class MessengerRightSide extends Component {
	static propTypes = {
		user: PropTypes.object,
		targetUser: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidUpdate() {
		// console.log(this.props.userId);
	}

	render() {
		const { targetUser,user } = this.props;
		return (
			<div className="messenger-right-side-container">
				{targetUser === null ? (
					<div className="messenger-empty-chat">
						<Typography variant="headline" component="h3">
							No chat selected.
						</Typography>
					</div>
				) : (
					<div className="messenger-chat-container">
						<MessagesContainer user={user} targetUser={targetUser}/> <WriteMessageContainer user={user} targetUser={targetUser}/>
					</div>
				)}
			</div>
		);
	}
}
