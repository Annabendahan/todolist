import React, { Component } from 'react';
import axios from 'axios'

class RegisterForm extends Component {
  constructor() {
    super();
    this.state={
      username: '',
      password: '',
      password_confirmation: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }



handleRegisterSubmit = (e) => {
  e.preventDefault()
  const user = {
    email: this.state.email,
    password: this.state.password,
    password_confirmation: this.state.password_confirmation
  }
  console.log(user)
    axios.post(
    `/api/users`,
    {
      user: user
    })
  .then(response => {
    console.log(response)
  })
  .catch(error => console.log(error))
}


  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
        [name]: val,
      });
    }



    render() {
      return(
      <div className="form">
        <form onSubmit=
        {this.handleRegisterSubmit} >

        <input type="text" name="email" placeholder="email" value= {this.state.email} onChange={this.handleChange} />
        <input type="text" name="password" placeholder="password" value= {this.state.password} onChange={this.handleChange} />
        <input type="text" name="password_confirmation" placeholder="password_confirmation" value= {this.state.password_confirmation} onChange={this.handleChange} />
        <input type="submit" value="Register!" />
        </form>
      </div>
      )
    }
  }


export default RegisterForm;

