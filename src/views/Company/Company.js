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
			.collection("invites")
			.doc(company.key)
			.delete()
			.then(() => {
				console.log("Deleted!");
			})
			.catch(function(error) {
				console.log("Error deletting documents: ", error);
			});

		firestore()
			.collection("users")
			.doc(this.props.user.id)
			.collection("companies")
			.doc(company.key)
			.set({
				avatar: company.avatar,
				is_founded_by_user: false, // eslint-disable-line
				name: company.name
			});

		firestore()
			.collection("companies")
			.doc(company.key)
			.collection("Members")
			.doc(this.props.user.id)
			.set({
				Groups: ["Members"],
				Roles: ["Member"],
				avatar: company.avatar,
				firstName: this.props.user.firstName,
				lastName: this.props.user.lastName
			})
			.then(() => {
				this.handleCloseJoinCompany();
			});
	};

	handleCloseJoinCompany = () => {
		this.setState({ openDialogJoinCompany: false });
	};

	onCompanyChange = company => {
		if (company) {
			this.setState({ companyId: company.key });
		}
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
