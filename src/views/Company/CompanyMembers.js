import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

export default class CompanyMembers extends Component {
	static propTypes = {
		company: PropTypes.object,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			company: {},
			list: {}
		};
	}
	componentDidUpdate() {
		if (this.props.company) {
			if (this.props.company.Members) {
				if (this.isEmpty(this.state.list)) {
					this.asd();
				}
			}
		}
	}
	asd = () => {
		const { company } = this.props;
		const tempList = {};
		company.Groups.forEach(group => {
			tempList[group.Name] = [];
		});
		company.Members.forEach(member => {
			member.Groups.forEach(group => {
				tempList[group].push(member);
			});
		});

		this.setState({ list: tempList }, () => {
			console.log(this.state.list);
		});
	};

	isEmpty = obj => {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	render() {
		const { list } = this.state;
		return (
			<div className="company-members">
				{!this.isEmpty(list) ? (
					<List className="list">
						{Object.keys(list).map(group => {
							return (
								<div key={group}>
									<div className="custom-devider">
										<div className="text">{group}</div>
										<div className="line" />
									</div>
									{list[group].map(item => {
										return (
											<ListItem key={item.key} button>
												<Avatar alt="Profile picture" src={item.avatar} />
												<ListItemText
													primary={item.firstName + " " + item.lastName}
													secondary={item.Roles.map(role => {
														return role + " ";
													})}
												/>
											</ListItem>
										);
									})}
								</div>
							);
						})}
					</List>
				) : (
					undefined
				)}
			</div>
		);
	}
}
