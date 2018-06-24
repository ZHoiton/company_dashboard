import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestore } from "firebase";

class CalendarItem extends Component {
	static propTypes = {
		day: PropTypes.instanceOf(Date),
		userId: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			events: []
		};
	}

	componentDidMount() {
		const { userId, day } = this.props;

		this.getEvents(userId,day);

	}

	componentDidUpdate(prevProps){
		const { userId, day } = this.props;

		if (prevProps.day.getTime() === day.getTime()) return;

		this.getEvents(userId,day);
	}

	getEvents = (userId, day) => {
		const start = new Date(day.setHours(0,0,0,0));
		const end = new Date(day.setHours(day.getHours() + 23,59,59));

		firestore()
			.collection("users")
			.doc(userId)
			.collection("events")
			.where("date", ">=", start)
			.where("date", "<=", end)
			.get().then((snapshot)=> {
				const tempList = [];
				snapshot.forEach(event=> {
					tempList.push(event.data());
				});
				this.setState({events: tempList});
			});
	}

	render() {
		const { day } = this.props;
		const { events } = this.state;
		return (
			<div className='calendar-item outline'>
				{day.getDate()}
				{events.map((event,index)=> {
					return (
						<div key={index} className="event-outline">
							{event.title}
						</div>
					);
				})}
			</div>
		);
	}
}

export default CalendarItem;
