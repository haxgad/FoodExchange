import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link } from 'react-router-dom';
import logo from './assets/qr_code.png';

const Home = () => (
  <div>
    <div className="jumbotron">
      <h1 className="display-4"><b>Welcome</b></h1>
      <h2 className="lead"><b>Buy or sell your meal coupons at NUS Food Exchange!</b></h2>
    </div>
    <div class="text-center">
      <Link to="/sellersignin" style={{ textDecoration: 'none' }}><button type="button" class="btn seller">Sell</button></Link>
      <Link to="/buyerhome" style={{ textDecoration: 'none' }}><button type="button" class="btn buyer">Buy</button></Link>
    </div>
    <div class="row">
      <div class="column down-a-bit">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png" class="center" width="200" height="200"></img>
      </div>
      <div class="column">
        <img src={logo} class="center" width="30%"></img>
      </div>
    </div>
    <h2 class="float-text"><b>Buy coupons using Telegram Bot!</b></h2>
  </div>
);

export default Home;