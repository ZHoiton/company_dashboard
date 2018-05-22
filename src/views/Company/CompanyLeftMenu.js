import React, { Component } from "react";
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Business from '@material-ui/icons/Business';

export default class CompanyLeftMenu extends Component {

	state = {};

	render() {
		return (
			<Drawer variant="permanent" className="drawer">
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
			</Drawer>
		);
	}
}
