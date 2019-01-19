import React from 'react';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import BuyerPage from '../BuyerHome';
import SellerPage from '../SellerHome';
import HomePage from '../Home';
import SignInPage from '../SellerSignIn';
import SellerCalendarPage from '../SellerCalendar';
import TransactionsPage from '../SellerTransactions';
import SellingPage from '../SellingForm'

import * as ROUTES from '../../constants/routes';

const firebase = require('firebase')
const config = {
  apiKey: "AIzaSyCwdK6thARXfiiiRTr2Xlu-DJC-YesbCQE",
  authDomain: "food-exchange-a9870.firebaseapp.com",
  databaseURL: "https://food-exchange-a9870.firebaseio.com",
  projectId: "food-exchange-a9870",
  storageBucket: "food-exchange-a9870.appspot.com",
  messagingSenderId: "84559066060"
};

firebase.initializeApp(config);

const Landing = () => (
  <div>
     <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SELLER_HOME} component={SellerPage} />
        <Route path={ROUTES.BUYER_HOME} component={BuyerPage} />
        <Route path={ROUTES.SELLER_SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SELLER_TRANSACTIONS} component={TransactionsPage} />
        <Route path={ROUTES.SELLER_CALENDAR} component={SellerCalendarPage} />
        <Route path={ROUTES.SELLING_FORM} component={SellingPage} />

      </Switch>
    </Router>
  </div>
);

export default Landing;