import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExampleChildOne from './ExampleChildOne';
import ExampleChildTwo from './ExampleChildTwo';
import Toggle from 'material-ui/Toggle';
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

	/* Component lifecycle methods
	componentWillReceiveProps(nextProps)
	shouldComponentUpdate(nextProps, nextState)
	componentWillMount(nextProps,nextState)
	componentDidMount(prevProps, prevState)
	*/

	// required for every component
	render() {
		const {	showFirstChild, showSecondChild	} = this.state;
		const { requiredExampleProp, exampleProp } = this.props;
		return (
			<div>
				{showFirstChild?<ExampleChildOne/>:undefined}
				{showSecondChild?<ExampleChildTwo/>:undefined}
				<div style={{display:'flex',width:'200px',margin:'auto', flexDirection: 'column'}}>
					<Toggle label={requiredExampleProp} onToggle={this.onClickFirst}/>
					<Toggle label={'Show Second Child'} onToggle={this.onClickSecond}/>
					{exampleProp}
				</div>
			</div>
		);
	}
}