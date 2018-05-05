import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './Firebase';


// const store = createStore(
// 	combineReducers({
// 	}),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// 	applyMiddleware(thunk)
// );

const muiTheme = createMuiTheme();

const MaterialApp = () => (
	<MuiThemeProvider theme={muiTheme}>
		<Router>
			<App />
		</Router>
	</MuiThemeProvider>
);
ReactDOM.render(<MaterialApp />, document.getElementById('root'));
