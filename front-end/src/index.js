import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue700, redA200 } from 'material-ui/styles/colors';

// const request = new XMLHttpRequest();
// const token = document.querySelector('meta[name="csrf-token"]').content;

// request.open('POST', 'localhost', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.setRequestHeader('X-CSRF-TOKEN', token);
// console.log(request);
// console.log(token);

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blue700,
		accent1Color: redA200
	}
});

const MaterialApp = () => (
	<Provider store={{}}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router>
				<App />
			</Router>
		</MuiThemeProvider>
	</Provider>
);
ReactDOM.render(<MaterialApp />, document.getElementById('root'));
