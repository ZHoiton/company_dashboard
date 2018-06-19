import React, { Component } from "react";
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
			companies: []
		};
	}

	componentDidMount() {
		const { user } = this.props;
		const { ref } = this.state;
		ref
			.doc(user.id)
			.collection("companies")
			.onSnapshot(snapshot => {
				const list = [];
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				this.setState({ companies: list });
			});
	}

	// componentDidUpdate(prevProps) {}

	render() {
		const { companies } = this.state;
		return (
			<DrawerContext>
				{context => (
					<CompanySidebar variant="permanent" className="drawer" isOpen={context.isOpen}>
						<Divider />
						<List>{companies.length > 0 ? companies.map((company, index) => <CompanyListItem isOpen={context.isOpen} key={index} company={company} />) : undefined}</List>
						<Divider />
						<List>
							<Avatar>
								<Add/>
							</Avatar>
							<button>dfasd</button>
						</List>
					</CompanySidebar>
				)}
			</DrawerContext>
		);
	}
}
