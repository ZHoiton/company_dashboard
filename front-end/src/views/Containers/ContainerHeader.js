import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class ContainerHeader extends Component{

	static propTypes = {
		history: PropTypes.object,
	};
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
		};
	}

	onLoginClick = () => {
		this.props.history.push('/login');
		this.setState({clicked: true});
	}

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
					{!this.state.clicked ?
						<Button className='nav-bar-button-right' color='primary' onClick={this.onLoginClick}>
							<Typography variant="button" color="inherit">
							Login
							</Typography>
						</Button>:undefined}
				</Toolbar>
			</AppBar>
		);
	}
}

export default withRouter(ContainerHeader);
