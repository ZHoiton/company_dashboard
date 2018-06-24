import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Tasks from "./Tasks";
import Radio from "@material-ui/core/Radio";

class TaskHolder extends Component {
	state = {
		selectedValue: "0"
	};

	handleChange = event => {
		this.setState({ selectedValue: event.target.value });
	};

	render() {
		const {selectedValue} = this.state;
		return (
			<Card className="TaskHolder-page">
				<CardContent>
					<Radio
						checked={this.state.selectedValue === "0"}
						onChange={this.handleChange}
						value="0"
						name="radio-button-demo"
						aria-label="A"
					/>
                    Show All Tasks
					<Radio
						checked={this.state.selectedValue === "1"}
						onChange={this.handleChange}
						value="1"
						name="radio-button-demo"
						aria-label="B"
					/>
                    Show Finished Tasks
					<Radio
						checked={this.state.selectedValue === "2"}
						onChange={this.handleChange}
						value="2"
						name="radio-button-demo"
						aria-label="B"
					/>
                    Show Tasks In Progres
					<Tasks numb = {selectedValue}/>
				</CardContent>
			</Card>
		);
	}
}

export default TaskHolder;
