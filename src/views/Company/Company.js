import React, { Component } from "react";
import CompanyCreate from "../Company/CompanyCreate";
import CompanyOverview from "../Company/CompanyOverview";
import CompanyLeftMenu from "../Company/CompanyLeftMenu";
import { Route, Switch } from "react-router-dom";
import "../styles/ContainerStyles.css";


export default class Company extends Component {
	render() {
		return (
			<div className="company-container">
				<CompanyLeftMenu/>
				<Switch>
					<Route exact path="/company" component={CompanyCreate} />
					<Route exact path="/company/overview" component={CompanyOverview} />
				</Switch>
			</div>
		);
	}
}
