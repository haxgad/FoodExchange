import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class BuyerHome extends React.Component {
  state = {
    coupons: [
      {
        date: 1,
        time: 1.1,
        amount: 1.2
      },
      {
        date: 2,
        time: 2.1,
        amount: 2.2
      },
      {
        date: 3,
        time: 3.1,
        amount: 3.2
      }
    ]
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
              <th score="col">Breakfast/Dinner</th>
              <th score="col">Telegram Handle</th>
            </tr>
          </thead>
          <tbody>
            { this.state.coupons.map((coupon) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{coupon.date}</td>
                  <td>{coupon.time}</td>
                  <td>{coupon.time}</td>
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