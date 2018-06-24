import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import withRouter from "react-router-dom/withRouter";
import { firestore } from "firebase";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Checkbox from "@material-ui/core/Checkbox";

class Tasks extends Component {
	static propTypes = {
		match: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			tasks: [],
			checked: true
		};
	}

	getCompanies = userId => {
		const tasks = this.state.ref.doc(userId).collection("tasks");
		tasks.onSnapshot(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				let tempObj = {};
				tempObj = doc.data();
				console.log(tempObj);
				tempObj["key"] = doc.id;
				list.push(tempObj);
			});
			this.setState({ tasks: list });
		});
	};

	handleChange = (userId, key, boo) => {
		firestore()
			.collection("users")
			.doc(userId)
			.collection("tasks")
			.doc(key)
			.set(
				{
					isCompleted: !boo
				},
				{ merge: true }
			);
	};

	componentDidMount() {
		this.getCompanies(this.props.match.params.userId);
	}

	render() {
		const { tasks } = this.state;
		console.log(tasks);
		return (
			<div>
				{tasks.length > 0 ? tasks.map((task, index) => {
					return (
						<Card key={index}>
							<CardHeader title={task.title} />
							<CardContent>Deadline: {task.deadline.toDate().toDateString(task.deadline)}</CardContent>
							<CardActions>
								<Checkbox
									checked={task.isCompleted}
									onChange={this.handleChange.bind(
										this,
										this.props.match.params.userId,
										task.key,
										task.isCompleted
									)}
									value="checked"
									color="primary"
								/>
							</CardActions>
						</Card>
					);
				})
					: undefined}
			</div>
		);
	}
}

export default withRouter(Tasks);
