import React from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class SellerHome extends React.Component {
  state = {
    toCalendar: false,
    toTransactions: false,
    toSell: false,
    toHome: false
  }

  goCalendar = (event) => {
    event.preventDefault();
    this.setState({
      toCalendar: true
    });
  }

  goTransactions = (event) => {
    event.preventDefault();
    this.setState({
      toTransactions: true
    });
  }

  goSell = (event) => {
    event.preventDefault();
    this.setState({
      toSell: true
    });
  }

  signOut = (event) => {
    event.preventDefault();
    this.setState({
      toHome: true
    });
  }

  render() {
    if (this.state.toCalendar === true) {
      return <Redirect to="/sellercalendar" />
    }

    if (this.state.toTransactions === true) {
      return <Redirect to="/sellertransactions" />
    }

    if (this.state.toSell === true) {
      return <Redirect to="/sellingform" />
    }

    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Seller Home</h1>
          <p className="lead">Choose services</p>
        </div>

        <div class="row center">
          <div class="col-md-12 text-center">
            <div class="btn-lg">
              <button type="button" class="btn btn-primary btn-block" onClick={this.goCalendar}><b>Calendar</b></button>
              <br></br>
              <button type="button" class="btn btn-primary btn-block" onClick={this.goTransactions}><b>Transactions</b></button>
              <br></br>
              <button type="button" class="btn btn-primary btn-block" onClick={this.goSell}><b>Sell</b></button>
              <br></br>
              <hr></hr>
              <br></br>
              <button type="button" class="btn btn-danger btn-block" onClick={this.signOut}><b>Sign Out</b></button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default SellerHome;