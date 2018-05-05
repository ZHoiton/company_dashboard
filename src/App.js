import React, { Component } from 'react';
import Container from './views/Containers/Container';
import ExampleProvider from './context/ExampleProvider';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = 'jss-insertion-point';

class App extends Component {
	render() {
		return (
			<JssProvider jss={jss} generateClassName={generateClassName}>
				<div>
					<ExampleProvider>
						<Container/>
					</ExampleProvider>
				</div>
			</JssProvider>
		);
	}
}

export default App;
