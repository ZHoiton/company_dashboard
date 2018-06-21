import React, { Component, Fragment } from "react";
import CompanyCreate from "../Company/CompanyCreate";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CompanyOverview from "../Company/CompanyOverview";
import CompanyLeftMenu from "../Company/CompanyLeftMenu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context/AppContext";
import { firestore } from "firebase";
import "../styles/ContainerStyles.css";

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class Company extends Component {
	static propTypes = {
		history: PropTypes.object,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			openDialogJoinCompany: false,
			companyId: null,
			companyInvite: null
		};
	}

	handleOpenJoinCompany = company => {
		if (company.invite) {
			this.setState({ companyInvite: company, openDialogJoinCompany: true });
		}
	};

	joinCompany = company => {
		console.log(company);
		firestore()
			.collection("users")
			.doc(this.props.user.id)
			.get()
			.then(doc => {
				console.log(doc.data());
				// if (userFound !== null) {
				// 	this.sendInvatation(userFound);
				// } else {
				// 	this.setState({ emailErrorMessage: "No such user!", emailError: true });
				// }
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	};

	handleCloseJoinCompany = () => {
		this.setState({ openDialogJoinCompany: false });
	};

	onCompanyChange = company => {
		this.setState({ companyId: company.key });
	};

	render() {
		const { companyId, companyInvite } = this.state;
		return (
			<Fragment>
				<div className="company-container">
					<AuthContext>
						{context => {
							return context.userIsLoggedIn ? (
								<Fragment>
									<CompanyLeftMenu user={context.user} onCompanyChange={this.onCompanyChange} openJoinCompany={this.handleOpenJoinCompany} />

									<Switch>
										<Route exact path="/company" render={props => <CompanyOverview {...props} companyId={companyId} user={context.user} />} />
										<Route exact path="/company/create" render={props => <CompanyCreate {...props} company={companyId} user={context.user} />} />
									</Switch>
								</Fragment>
							) : (
								undefined
							);
						}}
					</AuthContext>
				</div>
				{companyInvite ? (
					<Dialog
						open={this.state.openDialogJoinCompany}
						TransitionComponent={Transition}
						keepMounted
						onClose={this.handleCloseJoinCompany}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">Join Company</DialogTitle>
						<DialogContent>Are you sure you want to join {companyInvite.name} ?</DialogContent>
						<DialogActions>
							<Button onClick={this.handleCloseJoinCompany} color="primary">
								Cancel
							</Button>
							<Button onClick={this.joinCompany.bind(this, companyInvite)} variant="contained" color="primary">
								Join
							</Button>
						</DialogActions>
					</Dialog>
				) : (
					undefined
				)}
			</Fragment>
		);
	}
}
