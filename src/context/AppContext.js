import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "./contexts";
import firebase from "firebase";

export default class AppContext extends Component {
	static propTypes = {
		children: PropTypes.any
	};

	constructor(props) {
		super(props);

		this.state = {
			userIsLoggedIn: false,
			userId: "",
			userPicture: "",
			userFirstName: "",
			userLastName: ""
		};
	}

	componentDidMount() {
		this.onAuthStateChanged();
	}

	onAuthStateChanged = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				if (user.emailVerified) {
					//   this.state.userFirstName = user
					this.setState({
						userIsLoggedIn: true,
						userId: user.uid,
						userPicture: user.photoURL
					});
					firebase
						.firestore()
						.collection("users")
						.doc(this.state.userId)
						.get()
						.then(doc => {
							if (doc.exists) {
								this.setState({
									userFirstName: doc.data().firstName,
									userLastName: doc.data().lastName
								});
								// console.log("Document data:", doc.data());
							} else {
								// doc.data() will be undefined in this case
								// console.log("No such document!");
							}
						})
						.catch(() => {
							// console.log("Error getting document:", error);
						});
				}
			} else {
				// No user is signed in.
				this.setState({ userIsLoggedIn: false, userId: "" });
			}
		});
	};

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}
