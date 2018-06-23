import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarItem from './CalendarItem';

class CalendarGrid extends Component {
	static propTypes = {
		month: PropTypes.number,
		year: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			days: [],
		};
	}

	componentDidMount() {
		this.createCalendarArray();
	}

	componentDidUpdate(prevProps) {
		if (this.props.month !== prevProps.month || this.props.year !== prevProps.year){
			this.createCalendarArray();
		}
	}
	createCalendarArray() {
		const { month, year } = this.props;
		const calendarArray = new Array(35);
		calendarArray.fill(1);
		const numberOfDays = new Date(year,month + 1,0).getDate();
		let firstDayOfMonth = new Date(year,month,1).getDay() - 1;
		if (firstDayOfMonth === -1) firstDayOfMonth= 6;
		console.log(numberOfDays,firstDayOfMonth);
		switch (firstDayOfMonth) {
		case 0:
			calendarArray.fill(0,numberOfDays);
			break;
		case 1:
			calendarArray.fill(0,0,1);
			calendarArray.fill(0,1+numberOfDays);
			break;
		case 2:
			calendarArray.fill(0,0,2);
			calendarArray.fill(0,2+numberOfDays);
			break;
		case 3:
			calendarArray.fill(0,0,3);
			calendarArray.fill(0,3+numberOfDays);
			break;
		case 4:
			calendarArray.fill(0,0,4);
			calendarArray.fill(0,4+numberOfDays);
			break;
		case 5:
			calendarArray.fill(0,0,5);
			calendarArray.fill(0,5+numberOfDays);
			break;
		default:
			calendarArray.fill(0,0,6);
			calendarArray.fill(0,6+numberOfDays);
			break;
		}
		let tempNumber = 1;
		calendarArray.forEach((day, index)=> {
			if (day !== 0) {
				calendarArray[index] = new Date(year,month,tempNumber).getDate();
				tempNumber++;
			}
		});
		for (let i = 0; i < firstDayOfMonth; i++) {
			console.log(-firstDayOfMonth+1+i);
			calendarArray[i] = new Date(year,month,-firstDayOfMonth+1+i).getDate();
		}
		for (let i = 0; i < 35-(numberOfDays+firstDayOfMonth); i++) {
			calendarArray[(numberOfDays+firstDayOfMonth)+i] = new Date(year,month,i + 1).getDate();
		}
		console.log(calendarArray);
		this.setState({days: calendarArray});
	}

	render() {
		const { days } = this.state;
		return (
			<div className='calendar-grid outline'>
				{days.map((item,index)=> <CalendarItem key={index} day={item}/>)}
			</div>
		);
	}
}

export default CalendarGrid;
