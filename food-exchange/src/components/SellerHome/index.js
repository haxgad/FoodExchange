import React from 'react';
import Nav from '../SellerNavigation';
import Calendar from '../SellerCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerHome= () => (
  <div>
    <div className="jumbotron">
      <h1 className="display-4">Seller's Home</h1>
      <p className="lead">Manage your meal coupons here!</p>
    </div>
    <Nav />
    <Calendar />
  </div>
);

export default SellerHome;