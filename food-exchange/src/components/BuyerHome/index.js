import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './buyerhome.css';

const firebase = require('firebase')

class BuyerHome extends React.Component {
  state = {
    coupons: [],
    keys: []
  }

  componentDidMount = () => {
    firebase.database().ref('/Coupon').on('value', snapshot => {
      var newCoupons = []
      var newKeys = []
      newKeys = Object.keys(snapshot.val())
      var i = 0

      snapshot.forEach((coupon) => {
        newCoupons.push([coupon.val(), i])
        i++
      })

      this.setState({ coupons: newCoupons, keys : newKeys })
    });
  }

  alertConfirm = (k) => {
    confirmAlert({
      title: 'Confirm buying coupon',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleUpdateStatus(k)
        },
        {
          label: 'No',
        }
      ]
    })
  }

  handleUpdateStatus = (k) => {
    var updates = {};
    updates['/soldStatus'] = "pending";
    const toUpdate = firebase.database().ref(`/Coupon/${k}`);
    toUpdate.update(updates);
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
              <th scope="col">No. of Coupons</th>
              <th scope="col">Location</th>
              <th score="col">Meal Type</th>
              <th score="col">Telegram Handle</th>
              <th score="col">Purchase ($3)</th>
            </tr>
          </thead>
          <tbody>
            { this.state.coupons.map((coupon) => {
              if(coupon[0].soldStatus === "false"){
                return (
                  <tr>
                    <td>{coupon[0].date}</td>
                    <td>{coupon[0].time}</td>
                    <td>{coupon[0].amount}</td>
                    <td>{coupon[0].location}</td>
                    <td>{coupon[0].mealType}</td>
                    <td>{coupon[0].telegramHandle}</td>
                    <td><button type="button" className="btn btn-primary btn-md" onClick= {()=>this.alertConfirm(this.state.keys[coupon[1]])}>Confirm</button></td>
                  </tr>
                )
              }
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default BuyerHome;