import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { firestore } from "firebase";
import CompanyMembers from "../Company/CompanyMembers";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { DrawerContext } from "../../context/DrawerContext";

class CompanyOverview extends Component {
	static propTypes = {
		companyId: PropTypes.string,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			companyRef: firestore().collection("companies"),
			company: null,
			events: []
		};
	}

	componentDidMount() {
		if (this.props.companyId !== null) {
			this.getCompanyDetails();
			if (this.state.company !== null) {
				this.companyCollectionsListener("Groups");
				this.companyCollectionsListener("Roles");
				this.companyCollectionsListener("Members");
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.companyId !== prevProps.companyId) {
			this.getCompanyDetails();
			this.getEvents();
		}
		if (this.state.company !== prevState.company) {
			this.companyCollectionsListener("Groups");
			this.companyCollectionsListener("Roles");
			this.companyCollectionsListener("Members");
		}
	}

	getEvents = () => {
		firestore()
			.collection("events")
			.where("companyId", "==", this.props.companyId)
			.onSnapshot(snapshot => {
				const tempList = [];
				snapshot.forEach(doc => {
					console.log(doc.data());
					let tempObj = {};
					tempObj = doc.data();
					tempList.push(tempObj);
				});
				this.setState({ events: tempList });
			});
	};

	getCompanyDetails = () => {
		this.state.companyRef.doc(this.props.companyId).onSnapshot(doc => {
			let tempObj = {};
			tempObj = doc.data();
			tempObj["key"] = doc.id;
			this.setState({ company: tempObj }, () => {
				console.log(this.state.company);
			});
		});
	};

	companyCollectionsListener = collectionName => {
		this.state.companyRef
			.doc(this.props.companyId)
			.collection(collectionName)
			.onSnapshot(snapshot => {
				const tempCompany = this.state.company;
				const tempList = [];
				snapshot.forEach(doc => {
					let tempGroup = {};
					tempGroup = doc.data();
					tempGroup["key"] = doc.id;
					tempList.push(tempGroup);
				});
				tempCompany[collectionName] = tempList;
				this.setState({ company: tempCompany });
			});
	};

	render() {
		const { events, company } = this.state;
		return (
			<DrawerContext>
				{context => (
					<div className={context.isOpen ? "company-wrapper open" : "company-wrapper"}>
						{company ? (
							<Fragment>
								<div className="company-overview">
									<div className="company-cover" style={{backgroundImage:company.Cover ? "url("+company.Cover+")" : undefined,backgroundSize:"Cover"}}>
										{/* <img src={company.Cover ? company.Cover : undefined} alt={"Company Cover"} /> */}
										<Avatar className="company-avatar" src={company.Avatar ? company.Avatar : undefined} />
									</div>
									<div className="company-overview-content">
										<div className="company-title">{company.Name ? company.Name : undefined}</div>
										<div className="company-description">{company.Description ? company.Description : undefined}</div>
										<div className="company-title">events</div>
										<div className="company-events-container">
											<div className="event-list">
												{events.length > 0
													? events.map((event, index) => {
														return (
															<Card key={index} className="event">
																<img src={event.image} alt={event.title} className="event-image" />
																<CardMedia title={event.title} image="none" />
																<CardContent>
																	<Typography gutterBottom variant="headline" component="h2">
																		{event.title}
																	</Typography>
																	<Typography component="p">{event.description}</Typography>
																</CardContent>
																<CardActions>date</CardActions>
															</Card>
														);
													  }): undefined}
											</div>
										</div>
									</div>
								</div>
								<CompanyMembers company={this.state.company} user={this.props.user} />
							</Fragment>
						) : (
							undefined
						)}
					</div>
				)}
			</DrawerContext>
		);
	}
}

export default CompanyOverview;
