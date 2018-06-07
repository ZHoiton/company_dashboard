import React, { Component } from 'react';
import Container from './views/Containers/Container';
import { AuthContextComponent } from './context/AppContext';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import DrawerContextComponent from './context/DrawerContext';
import './views/styles/ContainerStyles.css';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = 'jss-insertion-point';


class App extends Component {
	render() {
		return (
			<JssProvider jss={jss} generateClassName={generateClassName}>
				<div className="root">
					<AuthContextComponent>
						<DrawerContextComponent>
							<Container/>
						</DrawerContextComponent>
					</AuthContextComponent>
				</div>
			</JssProvider>
		);
	}
}

export default App;
