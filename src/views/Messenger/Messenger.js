import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import "../styles/MessengerStyles.css";
import PropTypes from "prop-types";
import MessengerLeft from "./MessengerLeftSide.js";
import MessengerRight from "./MessengerRightSide.js";
import { firestore } from "firebase";

export default class Messenger extends Component {
	static propTypes = {
		match: PropTypes.object,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			targetUser: null
		};
	}
	componentDidMount() {
		if (this.props.match.params.targetUserId) {
			this.createNewMessageInstance(this.props.match.params.targetUserId);
		}
	}

	createNewMessageInstance = targetUserId => {
		//* get target user data
		firestore()
			.collection("users")
			.doc(targetUserId)
			.get()
			.then(targetUserDoc => {
				firestore()
					.collection("users")
					.doc(this.props.user.id)
					.collection("conversations")
					.doc(targetUserId)
					.get()
					.then(doc => {
						if (!doc.exists) {
							firestore()
								.collection("users")
								.doc(this.props.user.id)
								.collection("conversations")
								.doc(targetUserId)
								.set({
									last_message: "", // eslint-disable-line
									last_message_time_stamp: firestore.FieldValue.serverTimestamp(), // eslint-disable-line
									is_message_read: true, // eslint-disable-line
									last_message: "", // eslint-disable-line
									notify: true,
									owner_user_color: "", // eslint-disable-line
									target_user_color: "", // eslint-disable-line
									target_user_first_name: targetUserDoc.data().firstName, // eslint-disable-line
									target_user_photo_URL: targetUserDoc.data().photoURL, // eslint-disable-line
									target_user_last_name: targetUserDoc.data().lastName // eslint-disable-line
								});
						} else {
							firestore()
								.collection("users")
								.doc(this.props.user.id)
								.collection("conversations")
								.doc(targetUserId)
								.get()
								.then(doc => {
									const tempObj = {};
									tempObj["data"] = doc.data();
									tempObj["key"] = doc.id;
									this.setState({ targetUser: tempObj });
								});
						}
					});
			});
	};

	onUserClick = userObject => {
		//* setting the last message as read
		firestore()
			.collection("users")
			.doc(this.props.user.id)
			.collection("conversations")
			.doc(userObject.key)
			.set({ is_message_read: true }, { merge: true }); // eslint-disable-line

		this.setState({ targetUser: userObject });
	};

	render() {
		const { targetUser } = this.state;
		const { user } = this.props;
		return (
			<div className="messenger-wrapper">
				<Card className="messenger-container">
					<Fragment>
						<MessengerLeft user={user} onClick={this.onUserClick} />
						<MessengerRight user={user} targetUser={targetUser} />
					</Fragment>
				</Card>
			</div>
		);
	}
}
