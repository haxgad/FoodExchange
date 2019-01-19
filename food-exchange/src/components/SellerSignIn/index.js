import React from 'react';
import './sellersignin.css'
import { Redirect } from 'react-router-dom';

document.body.classList.add('background-pink');

class SellerSignIn extends React.Component {
  state = {
    username: "",
    password: "",
    toHome: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert(this.state.username)
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
          
    if (this.state.toHome === true) {
      return <Redirect to='/sellerhome' />
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
                  <input type="text" id="username" class="form-control" onChange={this.handleInputChange} value={this.state.username}></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                  <input type="password" id="password" class="form-control" onChange={this.handleInputChange} value={this.state.password}></input>
                </div>
                <button type="submit" class="btn btn-secondary btn-lg btn-block"><b>Sign In</b></button>
              </form>
            </div>
            <div class="col-md-8 banner-sec">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                    <img class="d-block img-fluid image-blur" src="http://cfile23.uf.tistory.com/image/236E0A4055102330075793" alt="First slide"></img>
                    <div class="carousel-caption d-none d-md-block">
                      <div class="banner-text">
                        <h1><b>Food Exchange</b></h1>
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