import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./transac.css";

const firebase = require('firebase')

class SellerTransactions extends React.Component {
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

      console.log(newCoupons)
      console.log(newKeys)
  
      this.setState({ coupons: newCoupons, keys : newKeys })

    });
  }

handleRemove = (k) => {
    const toCancel = firebase.database().ref(`/Coupon/${k}`);
    toCancel.remove();
}

handleUpdateStatus = (k) => {
  var updates = {};
  updates['/soldStatus'] = true;
  const toUpdate = firebase.database().ref(`/Coupon/${k}`);
  toUpdate.update(updates);
}
  
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Status of Coupon Sale</h1>
          <p className="lead">Check/Update status of meal coupons being sold!</p>
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
              if(coupon[0].soldStatus == false){
                return (
                  <tr>
                    <td>{coupon[0].date}</td>
                    <td>{coupon[0].time}</td>
                    <td>{coupon[0].amount}</td>
                    <td>{coupon[0].location}</td>
                    <td>{coupon[0].mealType}</td>
                    <td><button type="button" className="btn confirmBtn btn-md" onClick= {()=>this.handleUpdateStatus(this.state.keys[coupon[1]])}>Confirm</button>
                    <button type="button" className="btn cancelBtn btn-md" onClick= {()=>this.handleRemove(this.state.keys[coupon[1]])}>Cancel</button></td>
                  </tr>
                )                 
              } else {
                return (
                  <tr>
                    <td>{coupon[0].date}</td>
                    <td>{coupon[0].time}</td>
                    <td>{coupon[0].amount}</td>
                    <td>{coupon[0].location}</td>
                    <td>{coupon[0].mealType}</td>
                    <td>SOLD</td>
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

export default SellerTransactions;