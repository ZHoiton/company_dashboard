import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestore } from "firebase";

class CompanyOverview extends Component {
	static propTypes = {
		companyId: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			companyRef: firestore().collection("companies"),
			company: null
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.companyId !== prevProps.companyId) {
			this.getCompanyDetails();
		}
		if (this.state.company !== prevState.company) {
			this.companyCollectionsListener("Groups");
			this.companyCollectionsListener("Roles");
			console.log(this.state.company);
		}
	}

	getCompanyDetails = () => {
		this.state.companyRef.doc(this.props.companyId).onSnapshot(doc => {
			let tempObj = {};
			tempObj = doc.data();
			tempObj["key"] = doc.id;
			this.setState({ company: tempObj });
		});
	};

	companyCollectionsListener = collectionName => {
		this.state.companyRef
			.doc(this.props.companyId)
			.collection(collectionName)
			.onSnapshot(snapshot => {
				const tempCompany = this.state.company;
				const tempList = [];
				snapshot.forEach(doc => {
					let tempGroup = {};
					tempGroup = doc.data();
					tempGroup["key"] = doc.id;
					tempList.push(tempGroup);
				});
				tempCompany[collectionName] = tempList;
				this.setState({ company: tempCompany });
			});
	};

	render() {
		return <div>asd</div>;
	}
}

export default CompanyOverview;
