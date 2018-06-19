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

export default class CompanyLeftMenu extends Component {
	static propTypes = {
		user: PropTypes.any
	};
	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			ownedCompanies: [],
			companies: []
		};
	}

	componentDidMount() {
		const { user } = this.props;
		const { ref } = this.state;
		//* adding the companies which are NOT owned by the user
		ref
			.doc(user.id)
			.collection("companies")
			.where("is_founded_by_user", "==", false)
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				this.setState({ companies: list });
			});
		//* adding the companies which are owned by the user
		ref
			.doc(user.id)
			.collection("companies")
			.where("is_founded_by_user", "==", true)
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				this.setState({ ownedCompanies: list });
			});
	}

	// componentDidUpdate(prevProps) {}

	render() {
		const { companies, ownedCompanies } = this.state;
		return (
			<DrawerContext>
				{context => (
					<CompanySidebar variant="permanent" className="drawer" isOpen={context.isOpen}>
						{ownedCompanies.length > 0 ? (
							<Fragment>
								<List>
									{ownedCompanies.map(
										(company, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={company} />
									)}
								</List>
								<Divider />
							</Fragment>
						) : (
							undefined
						)}
						{companies.length > 0 ? (
							<Fragment>
								<List>
									{companies.map(
										(company, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={company} />
									)}
								</List>
								<Divider />
							</Fragment>
						) : (
							undefined
						)}
						<List>
							<div className="company-list-item">
								<Avatar className="material-button">
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
