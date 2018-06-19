import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import Business from '@material-ui/icons/Business';
import '../styles/CompanyStyles.css';


export default class CompanyListItem extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		company: PropTypes.object,
		onClick: PropTypes.func,
	}

	render() {
		const { isOpen, company, onClick} = this.props;
		return (
			<div className="company-list-item" onClick={onClick}>
				{company.avatar? <Avatar src={company.avatar}/>:
					<Avatar>
						<Business/>
					</Avatar>}
				{isOpen?
					<div className="company-list-item text">
						{company.name}
					</div>:undefined}
			</div>
		);
	}
}
