import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	  <Router>
	   <App/> 
	  </Router>,
	  document.getElementById('root'));
registerServiceWorker();
