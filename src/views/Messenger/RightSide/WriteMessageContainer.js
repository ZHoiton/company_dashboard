import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class WriteMessageContainer extends Component {
	static propTypes = {
		history: PropTypes.object,
		user: PropTypes.object,
		targetUser: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			multiline: "",
			users: firebase.firestore().collection("users")
		};
	}

	componentDidUpdate() {}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	sendMessage = text => {
		if (text !== null || text !== "") {
			const { users } = this.state;
			const { user, targetUser } = this.props;
			const newMessageOwner = users
				.doc(user.id)
				.collection("conversations")
				.doc(targetUser.key);

			newMessageOwner.get().then(docSnapshot => {
				if (docSnapshot.exists) {
					const batch = firebase.firestore().batch();

					batch.update(newMessageOwner, {
						last_message: text // eslint-disable-line
					});

					const owner_messages = newMessageOwner.collection("messages").doc(); // eslint-disable-line

					batch.set(owner_messages, {
						content: text,
						is_from_owner: true, // eslint-disable-line
						is_read: false, // eslint-disable-line
						send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
					});
					batch.commit();
					newMessageOwner
						.collection("messages")
						.doc()
						.set({
							content: text,
							is_from_owner: true, // eslint-disable-line
							is_read: false, // eslint-disable-line
							send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
						});
				} else {
					const batch = firebase.firestore().batch();
					const owner_user = users // eslint-disable-line
						.doc(user.id)
						.collection("conversations")
						.doc(targetUser.key);
					batch.set(owner_user, {
						last_message: text, // eslint-disable-line
						notify: true,
						owner_user_color: "", // eslint-disable-line
						target_user_color: "", // eslint-disable-line
						target_user_first_name: targetUser.data.target_user_first_name, // eslint-disable-line
						target_user_photo_URL: targetUser.data.target_user_photo_URL, // eslint-disable-line
						target_user_second_name: targetUser.data.target_user_second_name // eslint-disable-line
					});

					const owner_messages = owner_user.collection("messages").doc(); // eslint-disable-line

					batch.set(owner_messages, {
						content: text,
						is_from_owner: true, // eslint-disable-line
						is_read: false, // eslint-disable-line
						send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
					});
					batch.commit();
				}
			});

			const newMessageTarget = users
				.doc(targetUser.key)
				.collection("conversations")
				.doc(user.id);

			newMessageTarget.get().then(docSnapshot => {
				if (docSnapshot.exists) {
					const batch = firebase.firestore().batch();

					batch.update(newMessageTarget, {
						last_message: text // eslint-disable-line
					});

					const owner_messages = newMessageTarget.collection("messages").doc(); // eslint-disable-line

					batch.set(owner_messages, {
						content: text,
						is_from_owner: true, // eslint-disable-line
						is_read: false, // eslint-disable-line
						send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
					});
					batch.commit();
					newMessageTarget
						.collection("messages")
						.doc()
						.set({
							content: text,
							is_from_owner: true, // eslint-disable-line
							is_read: false, // eslint-disable-line
							send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
						});
				} else {
					const batch = firebase.firestore().batch();
					const tar_user = users // eslint-disable-line
						.doc(targetUser.key)
						.collection("conversations")
						.doc(user.id);

					const tar_messages = tar_user.collection("messages").doc(); // eslint-disable-line
					batch.set(tar_user, {
						last_message: text, // eslint-disable-line
						notify: true,
						owner_user_color: "", // eslint-disable-line
						target_user_color: "", // eslint-disable-line
						target_user_first_name: user.firstName, // eslint-disable-line
						target_user_photo_URL: user.picture, // eslint-disable-line
						target_user_second_name: user.lastName // eslint-disable-line
					});
					batch.set(tar_messages, {
						content: text,
						is_from_owner: true, // eslint-disable-line
						is_read: false, // eslint-disable-line
						send_time: firebase.firestore.FieldValue.serverTimestamp() // eslint-disable-line
					});
					batch.commit();
				}
			});
			this.setState({ multiline: "" });
		}
	};

	render() {
		return (
			<div className="messenger-write-message-container">
				<TextField
					id="multiline-flexible"
					label="Multiline"
					multiline
					rowsMax="2"
					value={this.state.multiline}
					onChange={this.handleChange("multiline")}
					className="messenger-write-message-container-input"
					margin="normal"
				/>
				<Button variant="contained" color="primary" onClick={this.sendMessage.bind(this, this.state.multiline)}>
					Send
				</Button>
			</div>
		);
	}
}
