import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class ContainerHeader extends Component{

	render() {
		return (
			<AppBar position="static">
				<Toolbar className='nav-bar'>
					<IconButton color="inherit" aria-label="Menu">
						<MenuIcon/>
					</IconButton>
					<Typography variant="title" color="inherit">
						eZLink
					</Typography>
					<Button className='nav-bar-button-right'>Login</Button>
				</Toolbar>
			</AppBar>
		);
	}
}
