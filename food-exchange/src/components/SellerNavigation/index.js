import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SellerNavigation = () => (
  <header>
    <nav>
      <ul>
      <li><Link to={ROUTES.HOME}>Home</Link></li>
        <li><Link to={ROUTES.SELLER_SIGN_IN}>Sign In</Link></li>
        <li><Link to={ROUTES.SELLER_TRANSACTIONS}>Transactions</Link></li>
        <li><Link to={ROUTES.SELLER_CALENDAR}>Calendar</Link></li>
      </ul>
    </nav>
  </header>
)

export default SellerNavigation;