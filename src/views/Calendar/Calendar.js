import React, { Component, Fragment } from 'react';
import CalendarInformation from './CalendarInformaton';
import CalendarGrid from './CalendarGrid';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<Fragment>
				<CalendarInformation/>
				<CalendarGrid/>
			</Fragment>
		);
	}
}

export default Calendar;
