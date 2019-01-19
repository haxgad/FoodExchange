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
        <div className="customHeaderDiv"> Current Week: {moment().week()} <br />
        {this.state.now.year()} Week : {this.state.now.week()} <br /> </div>

        <div className="customHeaderDiv2"> <br />
        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.MinusWeek}>
        <span class="glyphicon glyphicon-chevron-left"></span> &lt;---
        </button>
        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.PlusWeek}>
            <span class="glyphicon glyphicon-chevron-right"></span> ---&gt;
        </button>
        <Day name="Sunday" date={this.state.now.day("Sunday").format("D/M/Y")}/>
        <Day name="Monday" date={this.state.now.day("Monday").format("D/M/Y")}/>
        <Day name="Tuesday" date={this.state.now.day("Tuesday").format("D/M/Y")}/>
        <Day name="Wednesday" date={this.state.now.day("Wednesday").format("D/M/Y")}/>
        <Day name="Thursday" date={this.state.now.day("Thursday").format("D/M/Y")}/>
        <Day name="Friday" date={this.state.now.day("Friday").format("D/M/Y")}/>
        <Day name="Saturday" date={this.state.now.day("Saturday").format("D/M/Y")}/>
        </div>
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
      <div>
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">{this.props.name} {this.props.date}</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td><input type="checkbox" id="not_eating" name="not_eating" />
          <label for="not_eating">Not Eating</label></td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
}