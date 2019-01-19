import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sellingform.css';

const firebase = require('firebase')

class SellingForm extends React.Component {
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
        <div class="jumbotron">
            <h1 class="display-4">Sell Coupons!</h1>
            <p>Fill in the following form to sell your coupons</p>
        </div>

        <div class="box">
            <form>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Date</label>
                    <div class="col-10">
                        <input class="form-control" type="date" value="Date" id="date"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Time</label>
                    <div class="col-10">
                        <input class="form-control" type="time" value="Time" id="time"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Location</label>
                    <div class="col-10">
                        <select class="form-control" id="exampleSelect1">
                            <option>Cinnamon / Tembusu Dining Hall</option>
                            <option>Capt / RC4 Dining Hall</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">No. of coupons</label>
                    <div class="col-10">
                        <select class="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Meal Type</label>
                    <div class="col-10">
                        <select class="form-control" id="exampleSelect1">
                            <option>Breakfast</option>
                            <option>Dinner</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
      </div>
    );
  }
}

export default SellingForm;