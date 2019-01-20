import React from 'react';
import './calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

var moment = require('moment');
const firebase = require('firebase')
//var now = moment();
const SELLER_NAME = "calvin"
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
      seller:null,
      count:WEEKS_INTERVAL,
      now:moment(),
      weekStatus:[]
    };
  }

  componentDidMount = () => {
    firebase.database().ref('/Seller').on('value', snapshot => {

      var mySeller = null;
      snapshot.forEach((s) => {
        console.log(s.key)
        if(s.key === SELLER_NAME) {
          mySeller = s.val();
        }
      })


      console.log(mySeller);
      this.setState({ seller: mySeller });
    });
  }

  MinusWeek = () => {
    if(this.state.count > 0) {
      this.setState({ now: this.state.now.subtract(7, 'days') });
      //week = now.week();
      //year = now.year();
      this.setState({ count: this.state.count - 1 });
      console.log("minus");
      this.UpdateWeek();
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
      this.UpdateWeek();
    } else {
      console.log("Cannot add week: not more than two weeks after!");
    }  
  }

  UpdateWeek = () => {
    var thisWeek = this.state.now.week();
    var newWeekStatus = []
    if(this.state.seller != null && "week" + thisWeek in this.state.seller["noteaten"]["weeks"]) {
      console.log(this.state.seller["noteaten"]["weeks"]["week" + thisWeek])
      for(var i=1; i<=7; i++) {
        if ("day" + i in this.state.seller["noteaten"]["weeks"]["week" + thisWeek]) {
          newWeekStatus.push("true");
        } else {
          newWeekStatus.push("false");
        }
      }
    }
    this.setState({ weekStatus: newWeekStatus });
    console.log(this.state.weekStatus);
  }

  UpdateDatabase = (newSeller) => {
    firebase.database().ref('/Seller/calvin').set(newSeller);
  }
  
  ClickCheckbox = (week, day, value) => {
    var newSeller =  this.state.seller;
    if (value) {  
      if (newSeller != null) {
        if("week" + week in newSeller["noteaten"]["weeks"]) {
          if ("day" + day in newSeller["noteaten"]["weeks"]["week" + week]) {
            newSeller["noteaten"]["weeks"]["week" + week]["day" + day] = true
          } else {
            // day not created yet
            //const dayObj = {};
            //dayObj["day" + day] = true;
            newSeller["noteaten"]["weeks"]["week" + week]["day" + day] = true
          }
        } else {
          const dayObj = {};
          dayObj["day" + day] = true;
  
          // week not created yet
          newSeller["noteaten"]["weeks"]["week" + week] = dayObj;
        }
      }
    } else {
      // remove from week object
      delete newSeller["noteaten"]["weeks"]["week" + week]["day" + day]; 
    }

    console.log(newSeller);
    this.setState({ seller: newSeller });
    this.UpdateWeek();
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Seller Calendar</h1>
          <p className="lead">Where you plan and keep tracks your your meal plan</p>
          <hr></hr>
          <div class="text-center"> 
            <button type="button" class="btn btn-danger">Back to Home</button>
          </div>
        </div>

        <div className="customHeaderDiv"> Current Week: {moment().week()} <br />
        {this.state.now.year()} Week : {this.state.now.week()} <br /> </div>

        <div className="customHeaderDiv2"> <br />
        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.MinusWeek}>
        <span class="glyphicon glyphicon-chevron-left"></span> &lt;---
        </button>
        <button type="button" class="float-left btn btn-default btn-sm" onClick={this.PlusWeek}>
            <span class="glyphicon glyphicon-chevron-right"></span> ---&gt;
        </button>

        <button type="button" onClick={()=> this.UpdateDatabase(this.state.seller)}>
        Update Database 
        </button>

        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="1" name="Sunday" date={this.state.now.day("Sunday").format("D/M/Y")} isChecked={this.state.weekStatus[0]} />
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="2" name="Monday" date={this.state.now.day("Monday").format("D/M/Y")} isChecked={this.state.weekStatus[1]}/>
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="3" name="Tuesday" date={this.state.now.day("Tuesday").format("D/M/Y")} isChecked={this.state.weekStatus[2]}/>
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="4" name="Wednesday" date={this.state.now.day("Wednesday").format("D/M/Y")} isChecked={this.state.weekStatus[3]}/>
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="5" name="Thursday" date={this.state.now.day("Thursday").format("D/M/Y")} isChecked={this.state.weekStatus[4]} />
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="6" name="Friday" date={this.state.now.day("Friday").format("D/M/Y")} isChecked={this.state.weekStatus[5]}/>
        <Day clickCheckbox={this.ClickCheckbox} week={this.state.now.week()} day="7" name="Saturday" date={this.state.now.day("Saturday").format("D/M/Y")} isChecked={this.state.weekStatus[6]}/>
        </div>


      </div>



    );
  }
}

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notEating: false,
      checked: (this.props.isChecked==="true")? true:false,
    };
  }

  render() {

    var value = (this.props.isChecked==="true")? true:false;
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
          <td><input type="checkbox" id="not_eating" name="not_eating" checked={value} onClick={ () => { this.props.clickCheckbox(this.props.week, this.props.day, !value); }}/>
          <label for="not_eating">Not Eating</label></td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
}