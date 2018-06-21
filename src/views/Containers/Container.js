import React, { Component, Fragment } from "react";
import Profile from "../Profile/Profile";
import Messenger from "../Messenger/Messenger";
import LogIn from "../LogIn/LogIn";
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

				<AuthContext>
					{context => {
						return context.userIsLoggedIn ? (
							<Fragment>
								<Profile user={context.user} />

								<Switch>
									<Route exact path="/profile" render={props => <Profile {...props} user={context.user}/>} />
								</Switch>
							</Fragment>
						) : (
							undefined
						);
					}}
				</AuthContext>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/calendar" component={LogIn} />
					<Route path="/company" component={Company} />
					{/* <Route path="/profile" component={Profile} /> */}
					<Route path="/messenger" component={Messenger} />
					{/* <Route
						path='*'
						component={Home}
					/> */}
				</Switch>
			</div>
		);
	}
}
