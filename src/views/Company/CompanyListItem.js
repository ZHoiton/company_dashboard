import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Business from "@material-ui/icons/Business";
import ListItem from "@material-ui/core/ListItem";
import "../styles/CompanyStyles.css";

export default class CompanyListItem extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		company: PropTypes.object,
		onCompanyChange: PropTypes.func,
		openJoinCompany: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {};
		console.log(this.props.company);
	}

	render() {
		const { isOpen, company, onCompanyChange, openJoinCompany } = this.props;
		return (
			<ListItem
				button={isOpen ? true : false}
				className="company-list-item"
				onClick={openJoinCompany ? openJoinCompany.bind(this, company) : onCompanyChange.bind(this, company)}
			>
				{company.avatar ? (
					<Avatar className="material-button" src={company.avatar} />
				) : (
					<Avatar className="material-button">
						<Business />
					</Avatar>
				)}
				{isOpen ? <div className="company-list-item text">{company.name}</div> : undefined}
			</ListItem>
		);
	}
}
