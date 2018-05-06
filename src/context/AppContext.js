import React, { Component } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./contexts";
import firebase from "firebase";

export default class AppContext extends Component {
	static propTypes = {
		children: PropTypes.any
	};

	constructor(props) {
		super(props);

		this.state = {
			userIsLoggedIn: false,
			user: {
				id: "",
				picture: "",
				firstName: "",
				lastName: ""
			}
		};
	}

	componentDidMount() {
		this.onAuthStateChanged();
	}

	onAuthStateChanged = () => {
		const user = {};
		firebase.auth().onAuthStateChanged(auth => {
			if (auth) {
				if (auth.emailVerified) {
					//   this.state.userFirstName = user
					user.id = auth.uid;

					firebase
						.firestore()
						.collection("users")
						.doc(auth.uid)
						.get()
						.then(doc => {
							if (doc.exists) {
								user.firstName =  doc.data().firstName;
								user.lastName = doc.data().lastName;
								user.picture = doc.data().photoURL;
								if (!user.picture) firebase
									.storage()
									.ref()
									.child('images/default.png')
									.getDownloadURL()
									.then(url => {
										user.picture = url;
										this.setState({
											userIsLoggedIn: true,
											user,
										});
									});
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
			<AuthContext.Provider value={this.state}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
