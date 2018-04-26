import React, {Component, Fragment} from 'react';
import Profile from '../Profile/Profile';
import LogIn from '../LogIn/LogIn';
import Home from '../Home/Home';
import { Route, Switch } from 'react-router-dom';
import ContainerHeader from './ContainerHeader';
import '../styles/ContainerStyles.css';

export default class Container extends Component{


	render() {
		return (
			<Fragment>
				<ContainerHeader/>
				<Switch>
					<Route
						exact
						path='/'
						component={Home}
					/>
					<Route
						exact
						path='/login'
						component={LogIn}
					/>
					<Route
						exact
						path='/calendar'
						component={LogIn}
					/>
					<Route
						path='/profile'
						component={Profile}
					/>
					<Route
						path='*'
						component={Home}
					/>
				</Switch>
			</Fragment>
		);
	}
}
