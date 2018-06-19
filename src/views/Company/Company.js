import React, { Component, Fragment } from "react";
import CompanyCreate from "../Company/CompanyCreate";
import CompanyOverview from "../Company/CompanyOverview";
import CompanyLeftMenu from "../Company/CompanyLeftMenu";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context/AppContext";
import "../styles/ContainerStyles.css";

export default class Company extends Component {
	render() {
		return (
			<div className="company-container">
				<AuthContext>
					{context => {
						return context.userIsLoggedIn ? (
							<Fragment>
								<CompanyLeftMenu user={context.user} />

								<Switch>
									<Route exact path="/company" render={(props) => <CompanyCreate {...props} user={context.user} />}/>
									<Route exact path="/company/overview" component={CompanyOverview} />
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
