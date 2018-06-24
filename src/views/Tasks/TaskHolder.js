import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Tasks from "./Tasks";

class TaskHolder extends Component {
	render() {
		return (
			<Card className="TaskHolder-page">
				<CardHeader title="Pesho" />
				<CardContent>
					<Tasks />
				</CardContent>
			</Card>
		);
	}
}

export default TaskHolder;
