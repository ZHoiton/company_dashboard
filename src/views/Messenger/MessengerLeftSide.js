import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MoreVert from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

export default class MessengerLeftSide extends Component {
	static propTypes = {
		user: PropTypes.object,
		onClick: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			founded: "",
			user: props.user,
			conversationsRef: firebase
				.firestore()
				.collection("users")
				.doc(props.user.id)
				.collection("conversations"),
			conversationsArray: []
		};
	}

	componentDidMount() {
		this.updateConversations();
	}

	componentDidUpdate() {
		if (this.props.user !== this.state.user) {
			this.setState({ user: this.props.user });
		}
	}

	updateConversations = () => {
		this.state.conversationsRef.orderBy("last_message_time_stamp", "desc").onSnapshot(data => {
			const tempList = [];
			// this.setState({ conversationsArray: [] });
			data.forEach(doc => {
				const tempObj = {};
				tempObj["key"] = doc.id;
				tempObj["data"] = doc.data();
				tempList.push(tempObj);
			});
			this.setState({ conversationsArray: tempList });
		});
	};

	render() {
		const { onClick } = this.props;
		const { conversationsArray } = this.state;
		return (
			<div className="messenger-left-side-container">
				<List>
					{conversationsArray.length < 1 ? (
						<ListItem>
							<ListItemText primary="no conversations started yet" />
						</ListItem>
					) : (
						conversationsArray.map(targetUser => {
							return (
								<ListItem button key={targetUser.key} onClick={onClick.bind(this, targetUser)}>
									<Avatar alt="Profile picture" src={targetUser.data.target_user_photo_URL} />
									<ListItemText
										className={!targetUser.data.is_message_read ? "message-not-read" : undefined}
										primary={targetUser.data.target_user_first_name + " " + targetUser.data.target_user_last_name}
										secondary={targetUser.data.last_message.length > 10 ? targetUser.data.last_message.slice(0, 10) + "..." : targetUser.data.last_message}
									/>
									<ListItemSecondaryAction>
										<IconButton aria-label="Settings">
											<MoreVert />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})
					)}
				</List>
			</div>
		);
	}
}
