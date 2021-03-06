import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './styles/index.less';
// import 'react-voice-recorder/dist/index.css';
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
