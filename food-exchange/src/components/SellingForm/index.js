import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sellingform.css';

const firebase = require('firebase')

class SellingForm extends React.Component {
  state = {
    location: "Cinnamon / Tembusu Dinning Hall",
    amount: "1",
    mealType: "Breakfast"
  }

  handleSubmit = (event) => {
    const newCoupon = {
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        mealType: this.state.mealType,
        amount: this.state.amount,
        telegramHandler: "@CalvinTantio",
        soldStatus: false
    }

    firebase.database().ref('/Coupon').push(newCoupon);
    event.preventDefault()
  }

  handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const id = target.id;

      this.setState({
          [id]: value
      });

      console.log(this.state)
  }

  render() {
    return (
      <div>
        <div class="jumbotron">
            <h1 class="display-4">Sell Coupons!</h1>
            <p>Fill in the following form to sell your coupons</p>
        </div>

        <div class="box">
            <form onSubmit={this.handleSubmit}>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Date</label>
                    <div class="col-10">
                        <input class="form-control" type="date" id="date" required onChange={this.handleInputChange}></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Time</label>
                    <div class="col-10">
                        <input class="form-control" type="time" id="time" required onChange={this.handleInputChange}></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Location</label>
                    <div class="col-10">
                        <select class="form-control" id="location" onChange={this.handleInputChange} value={this.state.location}>
                            <option>Cinnamon / Tembusu Dining Hall</option>
                            <option>Capt / RC4 Dining Hall</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">No. of coupons</label>
                    <div class="col-10">
                        <select class="form-control" id="amount" onChange={this.handleInputChange} value={this.state.amount}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Meal Type</label>
                    <div class="col-10">
                        <select class="form-control" id="mealType" onChange={this.handleInputChange} value={this.state.mealType}>
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