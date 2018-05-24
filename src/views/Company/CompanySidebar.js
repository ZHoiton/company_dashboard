import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CompanySidebar extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		children: PropTypes.any,
	}
	render() {
		const { isOpen, children } = this.props;
		return (
			<div
				className={classNames('sidebar', !isOpen ? 'collapsed' : undefined)}
			>
				<div className="sidebar-content">
					{children}
				</div>
			</div>
		);
	}
}

export default CompanySidebar;
