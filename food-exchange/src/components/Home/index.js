import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="jumbotron">
      <h1 className="display-4">Welcome</h1>
      <p className="lead">Buy or sell your meal coupons at NUS Food Exchange!</p>
    </div>
    <div class="text-center">
          <Link to ="/sellersignin" style={{ textDecoration: 'none'}}><button type="button" class="btn seller">Sell</button></Link>
          <Link to ="/buyerhome" style={{ textDecoration: 'none'}}><button type="button" class="btn buyer">Buy</button></Link>
      </div>
  </div>
);

export default Home;