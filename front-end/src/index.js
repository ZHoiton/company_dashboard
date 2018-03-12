import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// const request = new XMLHttpRequest();
// const token = document.querySelector('meta[name="csrf-token"]').content;

// request.open('POST', 'localhost', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.setRequestHeader('X-CSRF-TOKEN', token);
// console.log(request);
// console.log(token);

const muiTheme = createMuiTheme();

const MaterialApp = () => (
	<MuiThemeProvider theme={muiTheme}>
		<Provider>
			<Router>
				<App />
			</Router>
		</Provider>
	</MuiThemeProvider>
);
ReactDOM.render(<MaterialApp />, document.getElementById('root'));
