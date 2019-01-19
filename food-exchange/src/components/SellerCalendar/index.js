import React from 'react';
import './calendar.css';

const SellerCalendar= () => (
  <div>
    <Day name="Monday" />
    <Day name="Tuesday" />
    <Day name="Wednesday" />
    <Day name="Thursday" />
    <Day name="Friday" />
    <Day name="Saturday" />
    <Day name="Sunday" />
  </div>
);

export default SellerCalendar;

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