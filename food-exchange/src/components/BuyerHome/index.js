import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class BuyerHome extends React.Component {
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
              <th score="col">Breakfast/Dinner</th>
              <th score="col">Telegram Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default BuyerHome;