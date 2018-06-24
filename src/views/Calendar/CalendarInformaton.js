import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';

class CalendarInformation extends Component {
	static propTypes = {
		month: PropTypes.number,
		onClickChangeMonth: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		this.state = {
			showTimeframe: false,
		};


		this.userName = React.createRef();
	}

	onClickTimeframe = () => {
		const { showTimeframe } = this.state;
		this.setState({showTimeframe: !showTimeframe });
	}

	render() {
		const { onClickChangeMonth, month } = this.props;
		const { showTimeframe } = this.state;
		const monthName = this.monthNames[month];

		return (
			<div className='calendar-information-container'>
				<div className='calendar-information outline'>
					<KeyboardArrowLeft onClick={onClickChangeMonth.bind(this,'back')} className="calendar-arrow-backwards outline"/>
					<p>{monthName}</p>
					<KeyboardArrowRight onClick={onClickChangeMonth.bind(this,'forward')} className="calendar-arrow-forwards outline"/>
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
