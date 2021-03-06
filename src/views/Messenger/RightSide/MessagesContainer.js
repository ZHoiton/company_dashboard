import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default class MessagesContainer extends Component {
	static propTypes = {
		user: PropTypes.object,
		targetUser: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			conversationRef: firebase
				.firestore()
				.collection("users")
				.doc(props.user.id)
				.collection("conversations"),
			conversationArray: []
		};
	}

	componentDidMount() {
		this.updateConversation();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.targetUser !== this.props.targetUser) {
			this.updateConversation();
		}
	}

	updateConversation = () => {
		this.state.conversationRef
			.doc(this.props.targetUser.key)
			.collection("messages")
			.orderBy("send_time", "desc")
			.onSnapshot(data => {
				const tempList = [];
				data.forEach(doc => {
					const tempObj = {};
					tempObj["key"] = doc.id;
					tempObj["data"] = doc.data();
					tempList.push(tempObj);
				});
				//* setting the last message as read
				firebase
					.firestore()
					.collection("users")
					.doc(this.props.user.id)
					.collection("conversations")
					.doc(this.props.targetUser.key)
					.set({ is_message_read: true },{merge:true}); // eslint-disable-line
				this.setState({ conversationArray: tempList });
			});
	};

	render() {
		const { targetUser } = this.props;
		const { conversationArray } = this.state;
		return (
			<div className="messenger-messages-container">
				{conversationArray.length < 1 ? (
					<div>
						<Typography variant="headline" component="h3">
							No messages yet.
						</Typography>
					</div>
				) : (
					conversationArray.map(message => {
						return message.data.is_from_owner ? (
							<div className="owner-message" key={message.key}>
								<Paper className="message" elevation={4}>
									{message.data.content}
								</Paper>
							</div>
						) : (
							<div className="target-user-message" key={message.key}>
								<Avatar alt="Profile picture" src={targetUser.data.target_user_photo_URL} />
								<Paper className="message">{message.data.content}</Paper>
							</div>
						);
					})
				)}
			</div>
		);
	}
}
