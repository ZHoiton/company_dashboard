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
			image: "",
			height: "",
			weight: "",
			country: "",
			position: "",
		};

		this.heightChange = this.heightChange.bind(this);
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
				const 	Height = info.data().height;
				console.log(Height);
				this.setState({height: Height});
				const 	Weight = info.data().weight;
				const 	Country = info.data().country;
				const 	Position= info.data().position;
				this.setState({ first: firstName, last: lastName, image: image, height : Height, weight:Weight, country : Country, position : Position });
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

	getHeight() {
		const Height = this.state.height;
		if(Height === undefined){
			return(false);
		}
		else{
			return(true);
		}
	}

	getWeight() {
		if(this.state.weight == "" || this.state.weight === undefined){
			return("Unknown");
		}
		else{
			return("${this.state.weight} +  kg");
		}
	}

	getCountry() {
		if(this.state.country == "" || this.state.country=== undefined){
			return("Unknown");
		}
		else{
			return("${this.state.country}");
		}
	}

	getPosition() {
		if(this.state.position == "" || this.state.position === undefined){
			return("Unknown");
		}
		else{
			return("${this.state.weight}");
		}
	}
	componentDidMount(){
		this.getUser(this.props.match.params.userId);
		this.getCompanies(this.props.match.params.userId);
	}

	heightChange = (event)=>{
		event.preventDefault();
		this.setState({height : event.target.value});
		console.log(this.state.height);
		const h = this.state.height;
		if(h !== "" || h !== undefined){
			this.state.ref.doc(this.props.match.params.userId).update(
				{height:h}
			);
		}
	}
	weightChange = (event)=>{
		event.preventDefault();
		this.setState({weight : event.target.value});
		console.log(this.state.weight);
		const w = this.state.weight;
		if(w !== "" || w !== undefined){
			this.state.ref.doc(this.props.match.params.userId).update(
				{weight:w}
			);
		}
	}

	countryChange = (event)=>{
		event.preventDefault();
		this.setState({country : event.target.value});
		console.log(this.state.country);
		const h = this.state.height;
		if(h !== "" || h !== undefined){
			this.state.ref.doc(this.props.match.params.userId).update(
				{height:h}
			);
		}
	}
	render() {
		const { first, last, image, companies , height} = this.state;
		return (
			<Card className="profile-page">
				<CardHeader title={first + " " + last} />
				<CardContent>
					<div className="profile-info-box">
						<Avatar alt="Remy Sharp" src={image} className="profile-picture" />
						<Card className="profile-info">
							<form>
								<label>
									Height
									<input type="text" name="height" defaultValue={ height } onChange={(event) => this.heightChange(event)} />
									: cm
								</label>
								<br/>
								<label>
									Weight:
									<input type="text" name="weight" defaultValue={this.getWeight()} onChange={(event) => this.weightChange(event)} />
									: kg
								</label>
								<br/>
							</form>
							<p>Position: {this.getPosition()}</p>
							<p>Company:</p>
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
