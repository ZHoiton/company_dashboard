import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../styles/ProfileStyles.css";
import "../styles/HomePageStyles.css";
import PropTypes from "prop-types";
import firebase from "firebase";
import { firestore } from "firebase";
import "../styles/HomePageStyles.css";
export default class Home extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		currentUser: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			currentUserData: [],
			taskData: [],
			eventsData: []
		};
	}
	loadUserData = user => {
		firestore()
			.collection("users")
			.doc(user.uid)
			.get()
			.then(doc => {
				if (!doc.exists) {
					console.log("No such document!");
				} else {
					console.log(doc.data());
					this.setState({ currentUserData: doc.data() });
				}
			})
			.catch(err => {
				console.log("Error getting document", err);
			});
	};

	loadTaskData = user => {
		firestore()
			.collection("tasks")
			.where("createdBy", "==", user.uid)
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					let tempObj = {};
					tempObj = doc.data();
					console.log(doc.data());
					tempObj["key"] = doc.id;
					list.push(tempObj);
				});

				console.log("yes");
				this.setState({ taskData: list });
			});
	};

	loadCompanyData = user => {
		firestore()
			.collection("users")
			.doc(user.uid)
			.collection("companies")
			.where("is_founded_by_user", "==", true)
			.onSnapshot(snapshot => {
				const list = [];

				snapshot.forEach(doc => {
					let tempObj = {};
					tempObj = doc.data();
					console.log(doc.data());
					tempObj["key"] = doc.id;
					list.push(tempObj);
				});
				if (list.length > 0) {
					console.log("yes");
					this.setState({ ownedCompanies: list });
				}
			});
	};
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.loadUserData(user);
				this.loadTaskData(user);
				this.loadCompanyData(user);
			} else {
				// No user is signed in.
			}
		});
	}
	render() {
		const { currentUserData } = this.state;
		const { taskData } = this.state;
		return (
			<div>
				<Card className="profile-card"> Welcome to eZLink, {currentUserData.firstName} </Card>
				<Card className="event-card">
					<CardContent>
						{" "}
						Current status of your tasks
						{taskData.map(planet => (
							<Card className="profile-activity" value={planet.key} key={planet.key}>
								<CardContent className="tasksStyle">
								Task: {planet.title}
								</CardContent>
								<CardContent className="tasksStyle">
								Decription:{planet.description}
								</CardContent>
								<CardContent className="tasksStyle">
								Status:{planet.isCompleted}
								</CardContent>
							</Card>
						))}
					</CardContent>
				</Card>
			</div>
		);
	}
}
