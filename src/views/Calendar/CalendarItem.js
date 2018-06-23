import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalendarItem extends Component {
	static propTypes = {
		day: PropTypes.number,
	};

	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		const { day } = this.props;
		return (
			<div className='calendar-item outline'>
				{day}
			</div>
		);
	}
}

export default CalendarItem;
