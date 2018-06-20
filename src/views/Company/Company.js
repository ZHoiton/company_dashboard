import React, { Component, Fragment } from "react";
import CompanyCreate from "../Company/CompanyCreate";
import PropTypes from "prop-types";
import CompanyOverview from "../Company/CompanyOverview";
import CompanyLeftMenu from "../Company/CompanyLeftMenu";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context/AppContext";
import "../styles/ContainerStyles.css";

export default class Company extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			companyId: null
		};
	}

	onCompanyChange = id => {
		this.setState({ companyId: id });
		console.log(id);
	};

	render() {
		const { companyId } = this.state;
		return (
			<div className="company-container">
				<AuthContext>
					{context => {
						return context.userIsLoggedIn ? (
							<Fragment>
								<CompanyLeftMenu user={context.user} onCompanyChange={this.onCompanyChange} />

								<Switch>
									<Route exact path="/company" render={props => <CompanyOverview {...props} companyId={companyId} user={context.user}/>} />
									<Route exact path="/company/create" render={props => <CompanyCreate {...props} company={companyId} user={context.user} />} />
								</Switch>
							</Fragment>
						) : (
							undefined
						);
					}}
				</AuthContext>
			</div>
		);
	}
}
