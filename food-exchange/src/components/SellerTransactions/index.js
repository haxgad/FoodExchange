import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebase = require('firebase')
class SellerTransactions extends React.Component {
  state = {
    coupons: []
  }

  componentDidMount = () => {
    firebase.database().ref('/Coupon').on('value', snapshot => {
      var newCoupons = []
    
      snapshot.forEach((coupon) => {
        newCoupons.push(coupon.val())
      })
      this.setState({ coupons: newCoupons })
    });
  }
  
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Status of Coupon Sale</h1>
          <p className="lead">Check/Update status of coupons being sold!</p>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">No. of Coupons</th>
              <th scope="col">Location</th>
              <th score="col">Meal Type</th>
              <th score="col">Sold?</th>
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
                  <td><button type="button" className="btn btn-primary btn-md">Confirm</button>
                  <button type="button" className="btn btn-primary btn-md">Cancel</button></td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

/*const SellerTransactions= () => (
  <div>
    <h1>SellerTransactions</h1>
  </div>
);*/

export default SellerTransactions;