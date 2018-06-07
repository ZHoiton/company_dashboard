import React, { Component } from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
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
