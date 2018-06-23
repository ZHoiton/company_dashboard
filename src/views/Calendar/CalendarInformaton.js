import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';

class CalendarInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTimeframe: false
		};
		this.userName = React.createRef();
	}

	onClickTimeframe = () => {
		const { showTimeframe } = this.state;
		this.setState({showTimeframe: !showTimeframe });
	}

	render() {
		const { showTimeframe } = this.state;
		const date = new Date(),
			day = date.getDate(),
			locale = "en-us",
			month = date.toLocaleString(locale, { month: "long" });
		return (
			<div className='calendar-information-container outline'>
				<div className='calendar-information outline'>
					<KeyboardArrowLeft/>
					<p>{`${month} ${day}`}</p>
					<KeyboardArrowRight/>
				</div>
				<div ref={this.userName}>
					<Button  onClick={this.onClickTimeframe} className='calendar-information-button' variant="contained" color="secondary">
					Month
					</Button>
					<Popover
						open={showTimeframe}
						anchorEl={(this.userName.current)?this.userName.current:null}
						anchorReference='anchorEl'
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
					>
						<ClickAwayListener onClickAway={this.onClickTimeframe}>
							<Grow in={showTimeframe}>
								<Paper>
									<MenuList role="menu">
										<MenuItem onClick={this.handleClick}>Day</MenuItem>
										<MenuItem onClick={this.onProfileClick}>Week</MenuItem>
										<MenuItem onClick={this.onCompanyClick}>Month</MenuItem>
										<MenuItem onClick={this.onCalendarClick}>Year</MenuItem>
									</MenuList>
								</Paper>
							</Grow>
						</ClickAwayListener>
					</Popover>
				</div>
			</div>
		);
	}
}

export default CalendarInformation;
