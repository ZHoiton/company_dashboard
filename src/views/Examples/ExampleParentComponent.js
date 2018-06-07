import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExampleChildOne from './ExampleChildOne';
import ExampleChildTwo from './ExampleChildTwo';
import ExampleChildThree from './ExampleChildThree';
import Switch from '@material-ui/core/Switch';
import './styles.css';

export default class ExampleParentComponent extends Component {
	// default props are optional
	static defaultProps = {
		exampleProp: 'This is the default value'
	};
	// props are optional
	static propTypes = {
		requiredExampleProp: PropTypes.string.isRequired,
		exampleProp: PropTypes.any
	};

	// state is optional
	constructor(props) {
		super(props);

		this.state = {
			showFirstChild: false,
			showSecondChild: false,
			showThirdChild: true,
		};
	}

	onClickFirst = () => {
		const {showFirstChild} = this.state;
		this.setState({showFirstChild:!showFirstChild});
	};

	onClickSecond = () => {
		const {showSecondChild} = this.state;
		this.setState({showSecondChild:!showSecondChild});

	};

	onClickThird = () => {
		const {showThirdChild} = this.state;
		this.setState({showThirdChild:!showThirdChild});
	};


	// This event does the same as the 3 events above
	handleToggle = (event) => {
		const { value, checked } = event.target;
		this.setState({ [value]: checked });
	}
	/* Component lifecycle methods
	componentWillReceiveProps(nextProps)
	shouldComponentUpdate(nextProps, nextState)
	componentWillMount(nextProps,nextState)
	componentDidMount(prevProps, prevState)
	*/

	// required for every component
	render() {
		const {	showFirstChild, showSecondChild, showThirdChild	} = this.state;
		const { requiredExampleProp, exampleProp } = this.props;
		return (
			<div>
				{showFirstChild?<ExampleChildOne/>:undefined}
				{showSecondChild?<ExampleChildTwo/>:undefined}
				{showThirdChild?<ExampleChildThree/>:undefined}
				<div style={{display:'flex',width:'200px',margin:'auto', flexDirection: 'column'}}>
					<Switch value={requiredExampleProp} onChange={this.handleToggle}/>
					<Switch value='showSecondChild' onChange={this.handleToggle}/>
					<Switch value='showThirdChild' onChange={this.onClickThird} checked={showThirdChild}/>
					{exampleProp}
				</div>
			</div>
		);
	}
}
