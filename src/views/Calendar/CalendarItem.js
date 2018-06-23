import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestore } from "firebase";

class CalendarItem extends Component {
	static propTypes = {
		day: PropTypes.number,
		userId: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		const { userId } = this.props;
		firestore()
			.collection("users")
			.doc(userId)
			.collection("events")
			.onSnapshot((snapshot)=> {
				console.debug(snapshot);
			});
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
