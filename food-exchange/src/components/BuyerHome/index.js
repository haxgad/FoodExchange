import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Coupon = require('../../models/Coupon').default

const firebase = require('firebase')
const config = {
  apiKey: "AIzaSyCwdK6thARXfiiiRTr2Xlu-DJC-YesbCQE",
  authDomain: "food-exchange-a9870.firebaseapp.com",
  databaseURL: "https://food-exchange-a9870.firebaseio.com",
  projectId: "food-exchange-a9870",
  storageBucket: "food-exchange-a9870.appspot.com",
  messagingSenderId: "84559066060"
};
firebase.initializeApp(config);

class BuyerHome extends React.Component {
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
                  <td><button type="button" className="btn btn-primary btn-md">Confirm</button></td>
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