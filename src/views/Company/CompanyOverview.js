import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { firestore } from "firebase";
import CompanyMembers from "../Company/CompanyMembers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
// import CreateEvent from "../Event/CreateEvent";
import { DrawerContext } from "../../context/DrawerContext";

/**
 * used for the Dialog's animation
 * @param {PropTypes} props
 */
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class CompanyOverview extends Component {
	static propTypes = {
		companyId: PropTypes.string,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			error: "",
			errorMessage: "",
			clickedCard: "",
			companyRef: firestore().collection("companies"),
			company: null,
			fieldValue: "",
			openCreateEvent: false,
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
				this.setState({ company: tempCompany }, () => {
					console.log(this.state.company);
				});
			});
	};

	/**
	 * used to update the value for the @param name variable in the state
	 */
	handleFieldChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleOpenDialog = entityType => {
		this.setState({ openDialog: true, clickedCard: entityType });
	};

	handleCloseDialog = () => {
		this.setState({ openDialog: false });
	};

	handleOpenCreateEventDialog = () => {
		this.setState({ openCreateEvent: true });
	};

	handleCloseCreateEventDialog = () => {
		this.setState({ openCreateEvent: false });
	};

	addEntity = () => {
		firestore()
			.collection("companies")
			.doc(this.state.company.key)
			.collection(this.state.clickedCard)
			.doc()
			.set({ Name: this.state.fieldValue, Weight: 1 });
	};

	render() {
		const { user } = this.props;
		const { events, company, error, errorMessage, clickedCard } = this.state;
		return (
			<DrawerContext>
				{context => (
					<div className={context.isOpen ? "company-wrapper open" : "company-wrapper"}>
						{company ? (
							<Fragment>
								<div className="company-overview">
									<div className="company-cover-wrapper">
										<div className="company-cover" style={{ backgroundImage: company.Cover ? "url(" + company.Cover + ")" : undefined, backgroundSize: "Cover" }}>
											{/* <img src={company.Cover ? company.Cover : undefined} alt={"Company Cover"} /> */}
											<Avatar className="company-avatar" src={company.Avatar ? company.Avatar : undefined} />
										</div>
									</div>
									<div className="company-overview-content">
										<div className="company-title">{company.Name ? company.Name : undefined}</div>
										<div className="company-description">{company.Description ? company.Description : undefined}</div>
										<div className="company-title">events</div>
										<div className="company-events-container">
											<div className="event-list">
												{user && company ? (
													user.id === company.FoundedBy ? (
														<Card className="event" onClick={this.handleOpenCreateEventDialog}>
															<div className="event-add-icon">
																<AddCircleOutline className="add-icon" />
															</div>
															<CardMedia title={"Add Event"} image="none" />
															<CardContent>
																<Typography gutterBottom variant="headline" component="h2">
																	{"Add Event"}
																</Typography>
																<Typography component="p" className="event-desc">
																	{"add new event for the whole company, a group or member"}
																</Typography>
															</CardContent>
															<CardActions className="event-actions">
																<Typography component="p" className="event-date" />
															</CardActions>
														</Card>
													) : (
														undefined
													)
												) : (
													undefined
												)}
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
																	<Typography component="p" className="event-desc">
																		{event.description}
																	</Typography>
																</CardContent>
																<CardActions className="event-actions">
																	<Typography component="p" className="event-date">
																		<AccessTime />
																		{event.startTime.toDate().toDateString()}
																	</Typography>
																</CardActions>
															</Card>
														);})
													: undefined}
											</div>
										</div>
										<div className="company-title">Groups</div>
										<div className="company-events-container">
											<div className="event-list">
												{user && company ? (
													user.id === company.FoundedBy ? (
														<Card className="event" onClick={this.handleOpenDialog.bind(this, "Groups")}>
															<img
																src={
																	"https://firebasestorage.googleapis.com/v0/b/proep-project.appspot.com/o/images%2Fadd_group.png?alt=media&token=8b8d91fd-dd34-4be9-906d-dc75cc3a1409"
																}
																alt={"Add Group"}
																className="event-image"
															/>
															<CardMedia title={"Add Group"} image="none" />
															<CardContent>
																<Typography gutterBottom variant="headline" component="h2">
																	{"Add Group"}
																</Typography>
																<Typography component="p" className="event-desc">
																	{""}
																</Typography>
															</CardContent>
															<CardActions className="event-actions">
																<Typography component="p" className="event-date" />
															</CardActions>
														</Card>
													) : (
														undefined
													)
												) : (
													undefined
												)}
												{company.Groups
													? company.Groups.length > 0
														? company.Groups.map((group, index) => {
															return (
																<Card key={index} className="event">
																	<img
																		src={
																			"https://firebasestorage.googleapis.com/v0/b/proep-project.appspot.com/o/images%2Fgroup.png?alt=media&token=9f683f35-1526-4488-bccd-d1f5b3f61dc5"
																		}
																		alt={"Group"}
																		className="event-image"
																	/>
																	<CardMedia title={group.Name} image="none" />
																	<CardContent>
																		<Typography gutterBottom variant="headline" component="h2">
																			{group.Name}
																		</Typography>
																		<Typography component="p" className="event-desc" />
																	</CardContent>
																	<CardActions className="event-actions">
																		<Typography component="p" className="event-date" />
																	</CardActions>
																</Card>
															);})
														: undefined
													: undefined}
											</div>
										</div>
										<div className="company-title">Roles</div>
										<div className="company-events-container">
											<div className="event-list">
												{user && company ? (
													user.id === company.FoundedBy ? (
														<Card className="event" onClick={this.handleOpenDialog.bind(this, "Roles")}>
															<img
																src={
																	"https://firebasestorage.googleapis.com/v0/b/proep-project.appspot.com/o/images%2Fadd_role.png?alt=media&token=7482e32e-ebbc-4787-a3f5-6b7d694744dc"
																}
																alt={"Add Role"}
																className="event-image"
															/>
															<CardMedia title={"Add Role"} image="none" />
															<CardContent>
																<Typography gutterBottom variant="headline" component="h2">
																	{"Add Role"}
																</Typography>
																<Typography component="p" className="event-desc">
																	{""}
																</Typography>
															</CardContent>
															<CardActions className="event-actions">
																<Typography component="p" className="event-date" />
															</CardActions>
														</Card>
													) : (
														undefined
													)
												) : (
													undefined
												)}
												{company.Roles
													? company.Roles.length > 0
														? company.Roles.map((role, index) => {
															return (
																<Card key={index} className="event">
																	<img
																		src={
																			"https://firebasestorage.googleapis.com/v0/b/proep-project.appspot.com/o/images%2Fperson.png?alt=media&token=f2b7496b-4a5a-4207-8da0-ca867a9ca1c4"
																		}
																		alt={"Role"}
																		className="event-image"
																	/>
																	<CardMedia title={role.Name} image="none" />
																	<CardContent>
																		<Typography gutterBottom variant="headline" component="h2">
																			{role.Name}
																		</Typography>
																		<Typography component="p" className="event-desc" />
																	</CardContent>
																	<CardActions className="event-actions">
																		<Typography component="p" className="event-date" />
																	</CardActions>
																</Card>
															);
														}): undefined: undefined}
											</div>
										</div>
										<Dialog
											open={this.state.openDialog}
											TransitionComponent={Transition}
											keepMounted
											onClose={this.handleCloseDialog}
											aria-labelledby="alert-dialog-slide-title"
											aria-describedby="alert-dialog-slide-description"
										>
											<DialogTitle id="alert-dialog-slide-title">{"Add " + clickedCard.slice(0, clickedCard.length - 1)}</DialogTitle>
											<DialogContent>
												<FormControl fullWidth={true}>
													<TextField
														id="addMemberFieldValue"
														label={clickedCard.slice(0, clickedCard.length - 1)}
														value={this.state.addMemberFieldValue}
														onChange={this.handleFieldChange("fieldValue")}
														margin="normal"
													/>

													{error ? (
														<FormHelperText className="error" id="email-error-text">
															{errorMessage}
														</FormHelperText>
													) : (
														undefined
													)}
												</FormControl>
											</DialogContent>
											<DialogActions>
												<Button onClick={this.handleCloseDialog} color="primary">
													Cancel
												</Button>
												<Button onClick={this.addEntity} variant="contained" color="primary">
													Add
												</Button>
											</DialogActions>
										</Dialog>
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
