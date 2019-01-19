import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './components/Landing';
import * as serviceWorker from './serviceWorker';

import BuyerHome from './components/BuyerHome'
import SellerHome from './components/SellerHome'

ReactDOM.render(<Landing />, document.getElementById('root'));
//ReactDOM.render(<BuyerHome />, document.getElementById('root'));

//ReactDOM.render(<SellerHome />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
