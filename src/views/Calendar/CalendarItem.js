import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { firestore } from "firebase";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar } from '@material-ui/core';

class CalendarItem extends Component {
	static propTypes = {
		day: PropTypes.instanceOf(Date),
		userId: PropTypes.string,
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

	onCloseEventTile = () => {
		this.setState({eventOpen: false});
	}

	onSelectEvent = (eventId) => {

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
		const { day } = this.props;
		const { events, selectedEvent } = this.state;
		return (
			<div className='calendar-item outline'>
				{day.getDate()}
				{events.map((event,index)=> {
					return (
<<<<<<< HEAD
						<div key={index} className="event-outline">
							{event.title}
						</div>
=======
						<Fragment key={index}>
							<div className="outline" onClick={this.onSelectEvent.bind(this,event.id)}>
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
										<DialogContentText>
											Start Time: {selectedEvent.startTime.toDate().toLocaleString('en-GB', { timeZone: 'UTC' })}
										</DialogContentText>
										<DialogContentText>
											End Time: {selectedEvent.endTime.toDate().toLocaleString('en-GB', { timeZone: 'UTC' })}
										</DialogContentText>
										<DialogContentText>
											{selectedEvent.description}
										</DialogContentText>
										{selectedEvent.attendants.map(att =>{
											return (<Fragment key={att}>
												<Avatar src={att.avatar}/>
												<p>{att.name}</p>
											</Fragment>);
										})}
									</DialogContent>
								</Dialog>:undefined}
						</Fragment>
>>>>>>> 5438eb90ecc014f5349b2590664fa52a848636ec
					);
				})}
			</div>
		);
	}
}

export default CalendarItem;
