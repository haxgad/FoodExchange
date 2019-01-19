import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

import * as ROUTES from '../../constants/routes';

const SellerNavigation = () => (
  <nav class="navbar navbar-expand-lg navbar-light navbar-light">
  <a class="navbar-brand">FoodExchange</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link"><Link to={ROUTES.SELLER_CALENDAR}>Calendar</Link></a>
      <a class="nav-item nav-link"><Link to={ROUTES.SELLER_TRANSACTIONS}>Transactions</Link></a>
      <a class="nav-item nav-link"><Link to={ROUTES.HOME}>Sign Out</Link></a>
    </div>
  </div>
</nav>
)

export default SellerNavigation;