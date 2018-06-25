import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { firestore } from "firebase";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar } from '@material-ui/core';
import '../styles/CalendarStyles.css';

class CalendarItem extends Component {
	static propTypes = {
		day: PropTypes.instanceOf(Date),
		userId: PropTypes.string,
		onClick: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			selectedEvent: undefined,
			selectedEventAttendants: [],
			eventOpen: false,
		};
		this.snapshot;
	}

	componentDidMount() {
		const { userId, day } = this.props;

		this.getEvents(userId,day);

	}

	componentDidUpdate(prevProps){
		const { userId, day } = this.props;

		if (prevProps.day.getTime() === day.getTime()) return;
		this.snapshot();
		this.getEvents(userId,day);
	}

	getEvents = (userId, day) => {
		const start = new Date(day.setHours(0,0,0,0));
		const end = new Date(day.setHours(day.getHours() + 23,59,59));

		this.snapshot = firestore()
			.collection("users")
			.doc(userId)
			.collection("events")
			.where("startTime", ">=", start)
			.where("startTime", "<=", end)
			.onSnapshot((snapshot)=> {
				const tempList = [];
				snapshot.forEach(event=> {
					tempList.push(event);
				});
				this.setState({events: tempList});
			});
	}

	onCloseEventTile = e => {
		e.stopPropagation();
		this.setState({eventOpen: false});
	}

	onSelectEvent = (e, eventId) => {
		e.stopPropagation();
		const event = firestore()
			.collection("events")
			.doc(eventId)
			.get();

		const attendants = firestore()
			.collection("events")
			.doc(eventId)
			.collection("attendants")
			.get();

		Promise.all([event,attendants]).then((values)=> {
			let tempEvent = {};
			tempEvent = values[0].data();
			tempEvent.attendants = [];
			values[1].forEach((attendant)=> {
				tempEvent.attendants.push(attendant.data());
			});

			this.setState({eventOpen:true, selectedEvent: tempEvent});
		});
	}

	render() {
		const { day, onClick } = this.props;
		const { events, selectedEvent } = this.state;
		return (
			<div className='calendar-item' onClick={onClick}>
				{day.getDate()}
				{events.map((event,index)=> {
					return (
						<div key={index}>
							<div className="event-outline" onClick={(e) => this.onSelectEvent(e, event.id)}>
								{event.data().title}
							</div>
							{selectedEvent?
								<Dialog
									open={this.state.eventOpen}
									onClose={this.onCloseEventTile}
									aria-labelledby="responsive-dialog-title"
								>
									<DialogTitle>{selectedEvent.title}</DialogTitle>
									<DialogContent>
										<div>
											Start Time: {selectedEvent.startTime.toDate().toLocaleString('en-GB', { timeZone: 'UTC' })}
										</div>
										<div>
											End Time: {selectedEvent.endTime.toDate().toLocaleString('en-GB', { timeZone: 'UTC' })}
										</div>
										<div>
											{selectedEvent.description}
										</div>
										{selectedEvent.attendants.map(att =>{
											return (<Fragment key={att}>
												<Avatar src={att.avatar}/>
												<p>{att.name}</p>
											</Fragment>);
										})}
									</DialogContent>
								</Dialog>:undefined}
						</div>
					);
				})}
			</div>
		);
	}
}

export default CalendarItem;
