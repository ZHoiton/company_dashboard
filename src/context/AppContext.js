import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

const AuthContext = React.createContext();

export default class AuthContextComponent extends Component {
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
		this.onAuthStateChanged();
	}

	componentDidMount() {
		// firebase.auth().signOut();
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
								user.firstName = doc.data().firstName;
								user.lastName = doc.data().lastName;
								user.picture = doc.data().photoURL;
								if (!user.picture) {
									firebase
										.storage()
										.ref()
										.child("images/default.png")
										.getDownloadURL()
										.then(url => {
											user.picture = url;
											this.setState({
												userIsLoggedIn: true,
												user
											});
										});
								} else {
									this.setState({
										userIsLoggedIn: true,
										user
									});
								}
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
				this.setState({ userIsLoggedIn: false, user: {} });
			}
		});
	};

	render() {
		return <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>;
	}
}

export { AuthContext, AuthContextComponent };
