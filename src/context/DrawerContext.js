import React, { Component } from "react";
import PropTypes from "prop-types";

const DrawerContext = React.createContext();

export default class DrawerContextComponent extends Component {
	static propTypes = {
		children: PropTypes.any
	};

	constructor(props) {
		super(props);

		this.onClickOpen = () => {
			this.setState({
				isOpen: !this.state.isOpen
			});
		};

		this.state = {
			isOpen: false,
			onClickOpen: this.onClickOpen,
		};
	}


	render() {
		return (
			<DrawerContext.Provider value={this.state}>
				{this.props.children}
			</DrawerContext.Provider>
		);
	}
}

export {
	DrawerContext,
	DrawerContextComponent
};
