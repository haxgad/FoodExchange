import React from 'react';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import BuyerPage from '../BuyerHome';
import SellerPage from '../SellerHome';
import HomePage from '../Home';
import SignInPage from '../SellerSignIn';
import TransactionsPage from '../SellerTransactions';

import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <div>
     <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SELLER_HOME} component={SellerPage} />
        <Route path={ROUTES.BUYER_HOME} component={BuyerPage} />
        <Route path={ROUTES.SELLER_SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SELLER_TRANSACTIONS} component={TransactionsPage} />
      </Switch>
    </Router>
  </div>
);

export default Landing;