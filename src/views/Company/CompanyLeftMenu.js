import React, { Component } from "react";
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Business from '@material-ui/icons/Business';
import '../styles/CompanyStyles.css';
import CompanySidebar from './CompanySidebar';
import { DrawerContext } from '../../context/DrawerContext';

export default class CompanyLeftMenu extends Component {
	render() {
		return (
			<DrawerContext>
				{context => (
					<CompanySidebar variant="permanent" className="drawer" isOpen={context.isOpen}>
						<div />
						<List>
							<Avatar>
								<Business/>
							</Avatar>
							<Avatar>
								<Business/>
							</Avatar>
							<Avatar>
								<Business/>
							</Avatar>
						</List>
						<Divider />
						<List>
							<Avatar>
								<Business/>
							</Avatar>
							<Avatar>
								<Business/>
							</Avatar>
							<button>dfasd</button>
						</List>
					</CompanySidebar>
				)}
			</DrawerContext>
		);
	}
}
