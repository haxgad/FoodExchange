import React from 'react';
import './calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

var moment = require('moment');
//var now = moment();

const WEEKS_INTERVAL = 2;

const SellerCalendar= () => (
  <div>
    <Week />


  </div>
);

export default SellerCalendar;

class Week extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count:WEEKS_INTERVAL,
      now:moment()
    };
  }

  MinusWeek = () => {
    if(this.state.count > 0) {
      this.setState({ now: this.state.now.subtract(7, 'days') });
      //week = now.week();
      //year = now.year();
      this.setState({ count: this.state.count - 1 });
      console.log("minus");
    } else {
      console.log("Cannot minus week: not more than two weeks before!");
    }  
  }
  
  PlusWeek = () => {
    if(this.state.count < WEEKS_INTERVAL * 2) {
      this.setState({ now: this.state.now.add(7, 'days') });
      //week = now.week();
      //year = now.year();
      this.setState({ count: this.state.count + 1 });
    } else {
      console.log("Cannot add week: not more than two weeks after!");
    }  
  }

  render() {
    return (
      <div>
        <div> {this.state.now.year()} Week : {this.state.now.week()} <br /> </div>

                  
        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.MinusWeek}>
        <span class="glyphicon glyphicon-chevron-left"></span> Left
        </button>
        <Day name="Monday" />
        <Day name="Tuesday" />
        <Day name="Wednesday" />
        <Day name="Thursday" />
        <Day name="Friday" />
        <Day name="Saturday" />
        <Day name="Sunday" />

        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.PlusWeek}>
            <span class="glyphicon glyphicon-chevron-right"></span> Right
        </button>
      </div>

    );
  }
}


class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notEating: false
    };
  }

  render() {
    return (
      <div className="day">
        {this.props.name} <br />
        <input type="checkbox" id="not_eating" name="not_eating" />
        <label for="not_eating">Not Eating</label>
      </div>
    );
  }
}