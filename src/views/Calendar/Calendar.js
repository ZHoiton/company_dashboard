import React, { Component } from 'react';
import CalendarInformation from './CalendarInformaton';
import CalendarGrid from './CalendarGrid';
import '../styles/CalendarStyles.css';
class Calendar extends Component {
	constructor(props) {
		super(props);
		const today = new Date();

		this.state = {
			currentMonth: today.getMonth(),
			currentYear: today.getFullYear(),
		};
	}

	onClickChangeMonth = (direction) => {
		const { currentMonth, currentYear } = this.state;
		if (direction === 'forward') {
			if (currentMonth === 11) {
				this.setState({currentMonth: 0});
				this.setState({currentYear: currentYear + 1});
			} else {
				this.setState({currentMonth: currentMonth + 1});
			}

		} else {
			if (currentMonth === 0) {
				this.setState({currentMonth: 11});
				this.setState({currentYear: currentYear - 1});
			} else {
				this.setState({currentMonth: currentMonth - 1});
			}
		}
	}

	render() {
		const { currentMonth, currentYear } = this.state;
		return (
			<div className='calendar-container'>
				<CalendarInformation month={currentMonth} onClickChangeMonth={this.onClickChangeMonth}/>
				<CalendarGrid month={currentMonth} year={currentYear}/>
			</div>
		);
	}
}

export default Calendar;
