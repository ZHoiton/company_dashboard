import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import "../styles/ProfileStyles.css";
import { firestore } from "firebase";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export default class Profile extends Component {
	static propTypes = {
		currentUser: PropTypes.object,
		match: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			companies: [],
			first: "",
			last: "",
			image: ""
		};
	}

	getUser(userId) {
		const { currentUser } = this.props;
		const { ref } = this.state;

		ref
			.doc(userId?userId: currentUser.id)
			.get()
			.then(info => {
				const firstName = info.data().firstName;
				const lastName = info.data().lastName;
				const image = info.data().photoURL;
				this.setState({ first: firstName, last: lastName, image: image });
			});
	}

	getCompanies = (userId) => {
		const companies = this.state.ref.doc(userId).collection("companies");
		companies.onSnapshot(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				let tempObj = {};
				tempObj = doc.data();
				console.log(tempObj);
				tempObj["key"] = doc.id;
				list.push(tempObj);
			});
			this.setState({ companies: list });
		});
	};

	componentDidMount() {
		this.getUser(this.props.match.params.userId);
		this.getCompanies(this.props.match.params.userId);
	}

	render() {
		const { first, last, image, companies } = this.state;
		return (
			<Card className="profile-page">
				<CardHeader title={first + " " + last} />
				<CardContent>
					<div className="profile-info-box">
						<Avatar alt="Remy Sharp" src={image} className="profile-picture" />
						<Card className="profile-info">
							<p>Height: 135 cm</p>
							<p>Weight: 43 kg</p>
							<p>Country: Netherlands</p>
							<p>Position: CEO</p>
							<p>Company: Fontys</p>
						</Card>
					</div>
					{companies.length > 0
						? companies.map((company, index) => {
							return (
								<Card key={index}>
									<CardMedia src={company.avatar} title={company.title} />
									<CardContent>asd</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											Share
										</Button>
										<Button size="small" color="primary">
											Learn More
										</Button>
									</CardActions>
								</Card>
							);
						})
						: undefined}
					<Card className="profile-activity">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce
						ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut
						vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra
						metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className="profile-activity">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce
						ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut
						vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra
						metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className="profile-activity">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce
						ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut
						vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra
						metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className="profile-activity">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce
						ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut
						vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra
						metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
				</CardContent>
			</Card>
		);
	}
}
