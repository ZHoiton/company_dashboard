import React, { Component } from "react";
import StepperContainer from "../Stepper/Stepper";
import PropTypes from "prop-types";
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import "../styles/CompanyStyles.css";

export default class CompanyCreate extends Component {
	static propTypes = {
		history: PropTypes.object,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			companies: firebase.firestore().collection("companies"),
			steps: [
				{ index: 0, text: "Company Information", completed: false, optional: false, isLast: false },
				{ index: 1, text: "Add Roles", completed: false, optional: true, data: [], isLast: false },
				{ index: 2, text: "Add Groups", completed: false, optional: true, data: [], isLast: false },
				{ index: 3, text: "Create Company", completed: false, optional: false, isLast: true }
			],
			roleList: [],
			groupList: [],
			company: {},
			name: "",
			location: "",
			founded: ""
		};
	}

	onStepChange = currentStep => {
		const { company, name, location, founded, steps } = this.state;
		const tempCompany = company;
		switch (currentStep) {
		case 0:
			tempCompany.Name = name;
			tempCompany.Location = location;
			tempCompany.Founded = founded;
			tempCompany.FoundedBy = this.props.user.id;
			this.setState({ company: tempCompany });
			break;
		case 1:
			this.setState({ roleList: steps[currentStep].data });
			break;
		case 2:
			this.setState({ groupList: steps[currentStep].data });
			break;
		case 3:
			this.onFinishClick();
			break;
		default:
			break;
		}
	};

	onTextChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	onDeleteChip = (index, step) => {
		const { steps } = this.state;
		const temp = steps.slice();
		temp[step].data.splice(index, 1);
		this.setState({ steps: temp });
	};

	onAddChip = index => {
		const { name, steps } = this.state;
		const temp = steps.slice();
		temp[index].data.push(name);
		this.setState({ steps: temp });
	};

	onFinishClick = () => {
		const { companies, company, steps, roleList, groupList } = this.state;
		steps[steps.length - 1].completed = true;

		const key = companies.doc().id;

		companies
			.doc(key)
			.set(company)
			.then(() => {
				this.props.history.push("/");
			});
		roleList.map(role =>
			companies
				.doc(key)
				.collection("Roles")
				.add({ Name: role })
		);
		groupList.map(group =>
			companies
				.doc(key)
				.collection("Groups")
				.add({ Name: group })
		);

		//* Adding the company to the user(owner)
		firebase
			.firestore()
			.collection("users")
			.doc(this.props.user.id)
			.collection("companies")
			.doc(key)
			.set({
				avatar: null,
				name: company.Name,
				founded_by_user: true // eslint-disable-line
			});
	};

	render() {
		const { company, steps, roleList, groupList } = this.state;

		return (
			<div className="company-create-container">
				<Card className="create-company-card">
					<StepperContainer
						steps={steps}
						onStepChange={this.onStepChange}
						onTextChange={this.onTextChange}
						onDeleteChip={this.onDeleteChip}
						onAddChip={this.onAddChip}
						onFinishClick={this.onFinishClick}
						review={{ ...company, Roles: roleList, Groups: groupList }}
					/>
				</Card>
			</div>
		);
	}
}
