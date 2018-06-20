import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class CompanyMembers extends Component {
	static propTypes = {
		company: PropTypes.object,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			company: {},
			list: {},
			anchorElement: null
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.company) {
			if (this.state.company !== prevProps.company) {
				if (this.props.company.Members) {
					// if (this.isEmpty(this.state.list) || ) {
					this.fillMembersList();
					// }
				}
			}
		}
	}
	fillMembersList = () => {
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

		this.setState({ list: tempList, company: company }, () => {
			console.log(this.state.list);
		});
	};

	handleClick = event => {
		console.dir(event.currentTarget.getBoundingClientRect());
		this.setState({ anchorElement: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorElement: null });
	};

	isEmpty = obj => {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	render() {
		const { list, anchorElement } = this.state;
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
											<Fragment key={item.key}>
												<ListItem button onClick={this.handleClick}>
													<Avatar alt="Profile picture" src={item.avatar} />
													<ListItemText
														primary={item.firstName + " " + item.lastName}
														secondary={item.Roles.map(role => {
															return role + " ";
														})}
													/>
												</ListItem>
												<Menu
													id="simple-menu"
													anchorEl={anchorElement}
													open={Boolean(anchorElement)}
													onClose={this.handleClose}
													anchorReference="anchorPosition"
													anchorPosition={{
														top: anchorElement ? anchorElement.getBoundingClientRect().top + 50 : 0,
														left: anchorElement ? anchorElement.getBoundingClientRect().left + 40 : 0
													}}
													transformOrigin={{
														vertical: "top",
														horizontal: "right"
													}}
												>
													<MenuItem onClick={this.handleClose}>Profile</MenuItem>
													<MenuItem onClick={this.handleClose}>Message</MenuItem>
													<MenuItem onClick={this.handleClose}>Remove</MenuItem>
												</Menu>
											</Fragment>
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
