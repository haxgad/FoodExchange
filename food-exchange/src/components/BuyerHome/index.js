import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Coupon = require('../../models/Coupon').default

class BuyerHome extends React.Component {
  state = {
    coupons: [] // this is an array of coupons
  }
  
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Buyer Home</h1>
          <p className="lead">See available coupons here!</p>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Amount</th>
              <th scope="col">Location</th>
              <th score="col">Meal Type</th>
              <th score="col">Telegram Handle</th>
              <th score="col">Purchase ($3)</th>
            </tr>
          </thead>
          <tbody>
            { this.state.coupons.map((coupon) => {
              return (
                <tr>
                  <td>{coupon.date}</td>
                  <td>{coupon.time}</td>
                  <td>{coupon.amount}</td>
                  <td>{coupon.location}</td>
                  <td>{coupon.mealType}</td>
                  <td>{coupon.telegramHandle}</td>
                  <td><button type="button" class="btn btn-primary btn-md">Confirm</button></td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default BuyerHome;