import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => (
  <div className="jumbotron">
    <div class="container">
      <h1 className="display-3 welcome">Welcome</h1>
      <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      <div class="row">
        <div class="col-xs-6">
          <button type="button" class="btn seller btn-md"><a href ="/sellerhome">Seller</a></button>
        </div>
        <div class="col-xs-6">
          <button type="button" class="btn buyer"><a href ="/buyerhome">Buyer</a></button>
        </div>
      </div>
    </div>
  </div>
);

export default Home;