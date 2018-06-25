/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import "../styles/ProfileStyles.css";
import TextField from '@material-ui/core/TextField';
import { firestore,storage } from "firebase";
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
			experience:"",
			education: ""
		};

		this.heightChange = this.heightChange.bind(this);
		this.handleUploadImage= this.handleUploadImage.bind(this);
	}
	getUser(userId) {
		const { currentUser } = this.props;
		const { ref } = this.state;

		if (!currentUser) return;
		ref
			.doc(userId?userId: currentUser.id)
			.get()
			.then(info => {
				const firstName = info.data().firstName;
				const lastName = info.data().lastName;
				const image = info.data().photoURL;
				const 	Height = info.data().height;
				this.setState({height: Height});
				const 	Weight = info.data().weight;
				const 	Country = info.data().country;
				const 	Position= info.data().position;
				const Education = info.data().education;
				const Experience = info.data().experience;
				this.setState({ first: firstName, last: lastName, image: image, height : Height, weight:Weight, country : Country, position : Position, experience : Experience, education: Education });
			});
	}

	getCompanies = (userId) => {
		const companies = this.state.ref.doc(userId).collection("companies");
		companies.onSnapshot(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				let tempObj = {};
				tempObj = doc.data();
				tempObj["key"] = doc.id;
				list.push(tempObj);
			});
			this.setState({ companies: list });
		});
	};

	componentDidMount(){
		this.getUser(this.props.match.params.userId);
		this.getCompanies(this.props.match.params.userId);
	}

	heightChange = (event)=>{
		event.preventDefault();
		this.setState({height : event.target.value});
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
		const w = this.state.weight;
		if(w !== undefined){
			this.state.ref.doc(this.props.match.params.userId).update(
				{weight:w}
			);
		}
	}
	handleUploadImage(event) {
		event.preventDefault();
		const data = new FormData();
		data.append('file', event.target.files[0]);
		data.append('filename', event.target.files[0]);
		const filename = event.target.files[0].name;
 		storage().ref('/images/').child(filename).put(event.target.files[0]).then((snapshot)=> {
 			this.setState({image : snapshot.downloadURL});
			this.state.ref.doc(this.props.match.params.userId).update(
				{photoURL: snapshot.downloadURL}
			);
		});
	}

	countryChange = (event)=>{
		event.preventDefault();
		this.setState({country : event.target.value});
		const c = this.state.country;
		if(c !== undefined){
			this.state.ref.doc(this.props.match.params.userId).update(
				{country: c}
			);
		}
	}

	educationChange = (event)=>{
		event.preventDefault();
		this.setState({education : event.target.value});
		const e = this.state.education;
		if(e.toString().length > 0){
			this.state.ref.doc(this.props.match.params.userId).update(
				{education: e}
			);
		}
	}
	render() {
		const { first, last, image, companies ,country,position, education} = this.state;
		return (
			<Card className="profile-page">
				<CardHeader title={first + " " + last} />
				<CardContent>
					<div className="profile-info-box">
						<Avatar alt="Remy Sharp" src={image} className="profile-picture"/>
						<Card className="profile-info">
							<form>
								<label>
									Gender:
									<TextField className="profile-info-field1" type="text"  key={Math.floor((Math.random()*10))} name="height" defaultValue={'Male'} onChange={(event) => this.heightChange(event)} />
								</label>
								<br/>
								<label>
									Country
									<TextField className="profile-info-field2" type="text" key={Math.floor((Math.random()*10))} name="weight" defaultValue={country} onChange={(event) => this.weightChange(event)} />
								</label>
								<br/>
							</form>
							<p>Position: {position !== ""? position : "Not Yet Assigned" }</p>
						</Card>
					</div>
					{companies.length > 0
						? companies.map((company, index) => {
							return (
								<Card className="profile-company" key={index}>
									<CardMedia src={company.avatar} title={company.title} />
									<CardContent>Company Name: {company.name}</CardContent>
									<CardActions>
										<Button className="button-company" size="small" color="primary" variant="contained">
											Share
										</Button>
										<Button className="button-company" size="small" color="primary" variant="contained">
											Learn More
										</Button>
									</CardActions>
								</Card>
							);
						})
						: "No Company"}
					<Card className="profile-education">
						Education:
						<input type="text" className="education-field" key={Math.floor((Math.random()*10))} name="education" defaultValue={education !== null ||education.toString().length > 0 ? education : "Unknown" } onChange={(event) => this.educationChange(event)} />
					</Card>
				</CardContent>
			</Card>
		);
	}
}
