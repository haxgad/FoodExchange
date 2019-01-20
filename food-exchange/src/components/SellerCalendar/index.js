import React from 'react';
import './calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
      weekStatus:[],
      toHome: false
    };
  }

  goHome = (event) => {
    event.preventDefault();
    this.setState({
      toHome: true
    });
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
      this.UpdateWeek();
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
      for(var i=1; i<=7; i++) {
        var typeArray = [];
        if ("day" + i in this.state.seller["noteaten"]["weeks"]["week" + thisWeek]) {
          if("breakfast" in this.state.seller["noteaten"]["weeks"]["week" + thisWeek]["day" + i]) {
            typeArray.push(["breakfast", "true"])
          }

          if("dinner" in this.state.seller["noteaten"]["weeks"]["week" + thisWeek]["day" + i]) {
            typeArray.push(["dinner", "true"])
          }
        }
        newWeekStatus.push(typeArray);
      }
    }
    this.setState({ weekStatus: newWeekStatus }, function () {
      console.log(this.state.weekStatus);
  });
  }

  UpdateDatabase = (newSeller) => {
    firebase.database().ref('/Seller/calvin').set(newSeller);
    this.alertConfirm();
  }

  alertConfirm = () => {
    confirmAlert({
      title: 'Your calendar has been saved!',
      buttons: [
        {
          label: 'Ok',
        }
      ]
    })
  }
  
  ClickCheckbox = (week, day, type, value) => {
    var newSeller =  this.state.seller;
    if (value) {  
      if (newSeller != null) {
        if("week" + week in newSeller["noteaten"]["weeks"]) {
          if ("day" + day in newSeller["noteaten"]["weeks"]["week" + week]) {
            newSeller["noteaten"]["weeks"]["week" + week]["day" + day][type] = true;
          } else {
            const typeObj = {};
            // type could be breakfast or dinner
            typeObj[type] = true;
            // day not created yet
            newSeller["noteaten"]["weeks"]["week" + week]["day" + day] = typeObj;
          }
        } else {
          const typeObj = {};
          // type could be breakfast or dinner
          typeObj[type] = true;

          const dayObj = {};
          dayObj["day" + day] = typeObj;
  
          // week not created yet
          newSeller["noteaten"]["weeks"]["week" + week] = dayObj;
        }
      }
    } else {
      // remove from day object
      delete newSeller["noteaten"]["weeks"]["week" + week]["day" + day][type]; 
    }

    console.log(newSeller);
    this.setState({ seller: newSeller });
    this.UpdateWeek();
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/sellerhome" />
    }

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Seller Calendar</h1>
          <p className="lead">Where you plan and keep track of your meal plan!</p>
          <hr></hr>
          <div class="text-center"> 
            <button type="button" className="btn btn-danger" onClick={this.goHome}><b>Back to Home</b></button>
          </div>
        </div>

        <div className="customHeaderDiv"> Current Week: {moment().week()} <br />
        {this.state.now.year()} Week : {this.state.now.week()} <br /> </div>

        <div className="customHeaderDiv2"> <br />
        <div className="tableButtons">
          <button type="button" class="float-left btn btn-info btn-sm" style={{marginRight:'5px'}} onClick={this.MinusWeek}>
          <span class="glyphicon glyphicon-chevron-left"></span> &lt;--- Previous week
          </button>
          <button type="button" class="float-left btn btn-warning btn-sm" onClick={this.PlusWeek}>
              <span class="glyphicon glyphicon-chevron-right"></span> Next week ---&gt;
          </button>

          <button type="button" class="btn btn-primary btn-md" onClick={()=> this.UpdateDatabase(this.state.seller)}>
          Save Changes 
          </button>
        </div>

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
    var isChecked;
    if(this.props.isChecked == null) {
      isChecked = []
    } else {
      isChecked = this.props.isChecked;
    }

    this.state = {
      notEating: false,
      isBfChecked: (isChecked.length > 0 && isChecked[0][0] === "breakfast")? true:false,
      isDinChecked: ((isChecked.length > 0) && (isChecked.length > 1 || (isChecked[0][0] === "dinner")))? true:false,
    };
  }

  render() {

    var isChecked;
    if(this.props.isChecked == null) {
      isChecked = []
    } else {
      isChecked = this.props.isChecked;
    }

    var isBfChecked = (isChecked.length > 0 && isChecked[0][0] === "breakfast")? true:false;
    var isDinChecked = ((isChecked.length > 0) && (isChecked.length > 1 || (isChecked[0][0] === "dinner")))? true:false;
    return (
      <div style={{marginBottom: '10px'}}>
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">{this.props.name} {this.props.date}</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div className="customTd">
            <input type="checkbox" id="breakfast" name="breakfast" checked={isBfChecked} onClick={ () => { this.props.clickCheckbox(this.props.week, this.props.day, "breakfast", !isBfChecked); }}/>
              <label for="breakfast" style={{marginLeft:'5px'}}>Didn't eat breakfast</label><br />
            <input type="checkbox" id="dinner" name="dinner" checked={isDinChecked} onClick={ () => { this.props.clickCheckbox(this.props.week, this.props.day, "dinner", !isDinChecked); }}/>
              <label for="dinner" style={{marginLeft:'5px'}}>Didn't eat dinner</label>
            </div>
          </td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
}