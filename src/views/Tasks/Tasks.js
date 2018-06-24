import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import withRouter from "react-router-dom/withRouter";
import { firestore } from "firebase";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Tasks extends Component {
	static propTypes = {
		match: PropTypes.object,
		numb: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			tasks: [],
			title: "",
			CreatedAt: "",
			deadline: "",
			description: "",
			createdBy: "",
			companyId: "",
			checked: true,
			eventOpen: false
		};
	}

	getCompanies = userId => {
		const tasks = this.state.ref.doc(userId).collection("tasks");
		tasks.onSnapshot(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				let tempObj = {};
				tempObj = doc.data();
				tempObj["key"] = doc.id;
				list.push(tempObj);
			});
			this.setState({ eventOpen: true, tasks: list });
		});
	};

	onCloseEventTile = (e) => {
		e.stopPropagation();
		this.setState({ eventOpen: false });
	};

	onSelectTask = (e,taskId) => {
		e.stopPropagation();
		firestore()
			.collection("tasks")
			.doc(taskId)
			.get()
			.then(info => {
				const title = info.data().title;
				const CreatedAt = info.data().createdAt.toDate().toDateString();
				const deadline = info.data().deadline.toDate().toDateString();
				const description = info.data().description;
				const createdBy = info.data().createdBy;
				const companyId = info.data().companyId;
				this.setState({ eventOpen:true, title: title, CreatedAt: CreatedAt, deadline: deadline, description: description, createdBy: createdBy, companyId :companyId });
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
		firestore()
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
		const { tasks, title, CreatedAt, deadline, description, createdBy, companyId } = this.state;
		const { numb } = this.props;
		let s = true;
		return (
			<div>
				{tasks.length > 0 ? tasks.map((task, index) => {
					switch (numb) {
					case "1":
						s = task.isCompleted;
						break;
					case "2":
						s = !task.isCompleted;
						break;
					case "0":
						s = true;
						break;
					}
					if (s)
					{
						return (
							<Card key={index}>
								<CardHeader onClick={(e) => this.onSelectTask(e, task.key)} title={task.title}  />
								{title?
									<Dialog
										open={this.state.eventOpen}
										onClose={this.onCloseEventTile}
										aria-labelledby="responsive-dialog-title"
									>
										<DialogTitle>{title}</DialogTitle>
										<DialogContent>
											<DialogContentText>
												CreatedAt: {CreatedAt}
											</DialogContentText>
											<DialogContentText>
												Deadline: {deadline}
											</DialogContentText>
											<DialogContentText>{description}</DialogContentText>
											<DialogContentText>{createdBy}</DialogContentText>
											<DialogContentText>{companyId}</DialogContentText>
										</DialogContent>
									</Dialog>
									: (undefined)}
								<CardContent>Deadline: {task.deadline.toDate().toDateString()}</CardContent>
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
					}
				})
					: undefined}
			</div>
		);
	}
}

export default withRouter(Tasks);
