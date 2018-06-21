import React, { Component } from 'react';
import CalendarInformation from './CalendarInformaton';
import CalendarGrid from './CalendarGrid';
import '../styles/CalendarStyles.css';
class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<div className='calendar-container'>
				<CalendarInformation/>
				<CalendarGrid/>
			</div>
		);
	}
}

export default Calendar;
