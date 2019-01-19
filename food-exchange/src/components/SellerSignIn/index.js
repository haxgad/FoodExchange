import React from 'react';
import './sellersignin.css'
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class SellerSignIn extends React.Component {
  state = {
    username: "",
    password: "",
    proceed: false,
    toHome: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.username == "CalvinTantio" && this.state.password == "FoodExchange") {
      this.setState({
        proceed: true
      });
    } else {
      this.alertWrong();
    }
  }

  alertWrong = () => {
    confirmAlert({
      title: 'Login failed',
      message: 'Incorrect username/password',
      buttons: [
        {
          label: 'Ok',
        }
      ]
    })
  }

  goHome = (event) => {
    event.preventDefault();
    this.setState({
      toHome: true
    });
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
        [id]: value
    });
}

  render() {
          
    if (this.state.proceed === true) {
      return <Redirect to='/sellerhome' />
    }

    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }

    return (

      <div>
        <section class="login-block">
        <div class="container">
          <div class="row">
            <div class="col-md-4 login-sec">
              <h2 class="text-center">Sign In Now</h2>
              <form class="login-form" onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                  <input type="text" id="username" class="form-control" onChange={this.handleInputChange} value={this.state.username} required></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                  <input type="password" id="password" class="form-control" onChange={this.handleInputChange} value={this.state.password} required></input>
                </div>
                <button type="submit" class="btn btn-secondary btn-lg btn-block"><b>Sign In</b></button>
              </form>
              <br></br>
              <button type="button" class="btn btn-danger btn-lg btn-block" onClick={this.goHome}><b>Back to Home</b></button>
            </div>
            <div class="col-md-8 banner-sec">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                    <img class="d-block img-fluid image-blur" src="http://cfile23.uf.tistory.com/image/236E0A4055102330075793" alt="First slide"></img>
                    <div class="carousel-caption d-none d-md-block">
                      <div class="banner-text">
                        <h1><b>FoodExchange</b></h1>
                        <h4><b>Say NO to food coupons wastage!</b></h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        </div>
        )
      }
    }
    
export default SellerSignIn;