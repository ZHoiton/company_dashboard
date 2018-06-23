import React, { Component, Fragment } from "react";
import Profile from "../Profile/Profile";
import Messenger from "../Messenger/Messenger";
import LogIn from "../LogIn/LogIn";
import Calendar from "../Calendar/Calendar";
import Register from "../Register/Register";
import Company from "../Company/Company";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import { Route, Switch } from "react-router-dom";
import ContainerHeader from "./ContainerHeader";
import "../styles/ContainerStyles.css";
import { AuthContext } from "../../context/AppContext";

export default class Container extends Component {
	render() {
		return (
			<div className="root">
				<ContainerHeader />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/settings" component={Settings} />
					<AuthContext>
						{context => {
							return context.userIsLoggedIn ? (
								<Fragment>
									<Route exact path="/calendar/:userId" component={Calendar} />
									<Route exact path="/profile/:userId" render={props => <Profile {...props} currentUser={context.user} />} />
									<Route path="/company" render={props => <Company {...props} user={context.user} />} />
									<Route exact path="/login" render={props => <Profile {...props} user={context.user} />} />
									<Route path="/messenger/:targetUserId" render={props => <Messenger {...props} user={context.user} />} />
									<Route path="/messenger" render={props => <Messenger {...props} user={context.user} />} />
								</Fragment>
							) : (
								<Fragment>
									<Route exact path="/login" component={LogIn} />
									<Route exact path="/register" component={Register} />
								</Fragment>
							);
						}}
					</AuthContext>
					<Route path="*" component={Home} />
				</Switch>
			</div>
		);
	}
}
