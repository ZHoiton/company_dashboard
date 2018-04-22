import React, {Component, Fragment} from 'react';
import Profile from '../Profile/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContainerHeader from './ContainerHeader';
import '../styles/ContainerStyles.css';

export default class Container extends Component{


	render() {
		return (
			<Fragment>
				<ContainerHeader/>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path='/'
							component={Profile}
						/>
						<Route
							exact
							path='/login'
							component={Profile}
						/>
						<Route
							exact
							path='/calendar'
							component={Profile}
						/>
						<Route
							path='/profile'
							component={Profile}
						/>
						<Route
							path='*'
							component={Profile}
						/>
					</Switch>
				</BrowserRouter>
			</Fragment>
		);
	}
}
