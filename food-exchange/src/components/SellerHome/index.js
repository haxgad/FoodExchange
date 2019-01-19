import React from 'react';
import Nav from '../SellerNavigation';
import Calendar from '../SellerCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerHome= () => (
  <div>
      <Nav />
    <h2> this is seller home</h2>
    <Calendar />
  </div>
);

export default SellerHome;