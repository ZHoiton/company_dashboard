import React, { Component, Fragment } from "react";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Add from "@material-ui/icons/Add";
import "../styles/CompanyStyles.css";
import CompanySidebar from "./CompanySidebar";
import { DrawerContext } from "../../context/DrawerContext";
import { firestore } from "firebase";
import CompanyListItem from "./CompanyListItem";
import { withRouter } from "react-router-dom";

class CompanyLeftMenu extends Component {
	static propTypes = {
		user: PropTypes.any,
		history: PropTypes.object,
		onCompanyChange: PropTypes.func
	};
	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			ownedCompanies: [],
			companies: [],
			invites: []
		};
	}

	componentDidMount() {
		const { user } = this.props;
		const { ref } = this.state;
		//* getting the companies which are owned by the user
		ref
			.doc(user.id)
			.collection("companies")
			.where("is_founded_by_user", "==", true)
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					let tempObj = {};
					tempObj = doc.data();
					tempObj["key"] = doc.id;
					list.push(tempObj);
				});
				this.setState({ ownedCompanies: list }, () => {
					this.props.onCompanyChange(this.state.ownedCompanies.length > 0 ? this.state.ownedCompanies[0].key : null);
				});
			});

		//* getting the companies which are NOT owned by the user
		ref
			.doc(user.id)
			.collection("companies")
			.where("is_founded_by_user", "==", false)
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					let tempObj = {};
					tempObj = doc.data();
					tempObj["key"] = doc.id;
					list.push(tempObj);
				});
				this.setState({ companies: list });
			});

		//* getting all the invites
		ref
			.doc(user.id)
			.collection("invites")
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					let tempObj = {};
					tempObj = doc.data();
					tempObj["key"] = doc.id;
					list.push(tempObj);
				});
				this.setState({ invites: list });
			});
	}

	onAddClick = () => {
		this.props.history.push("/company/create");
	};

	// componentDidUpdate(prevProps) {}

	render() {
		const { onCompanyChange } = this.props;
		const { companies, ownedCompanies, invites } = this.state;
		return (
			<DrawerContext>
				{context => (
					<CompanySidebar variant="permanent" className="drawer" isOpen={context.isOpen}>
						{ownedCompanies.length > 0 ? (
							<Fragment>
								<List>
									{ownedCompanies.map((company, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={company} onCompanyChange={onCompanyChange} />)}
								</List>
								<Divider />
							</Fragment>
						) : (
							undefined
						)}
						{companies.length > 0 ? (
							<Fragment>
								<List>
									{companies.map((company, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={company} onCompanyChange={onCompanyChange} />)}
								</List>
								<Divider />
							</Fragment>
						) : (
							undefined
						)}
						{invites.length > 0 ? (
							<Fragment>
								<List>{invites.map((invite, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={invite} onCompanyChange={onCompanyChange} />)}</List>
								<Divider />
							</Fragment>
						) : (
							undefined
						)}
						<List>
							<div className="company-list-item">
								<Avatar className="material-button" onClick={this.onAddClick}>
									<Add />
								</Avatar>
							</div>
						</List>
					</CompanySidebar>
				)}
			</DrawerContext>
		);
	}
}
export default withRouter(CompanyLeftMenu);
