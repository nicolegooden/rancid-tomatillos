import React, { Component } from 'react';
import { getUserData } from './apiCalls'
import { Redirect } from 'react-router-dom';
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = (event) => {
    event.preventDefault();
    getUserData(this.state.email, this.state.password)
    .then(user => this.props.setUser(user))
    .catch(error => alert("NOPE"))
  }

  render() {
    return (
      <section className='login-container'>
        <form className='login-form'>
          <div className='email-input-div'>
            <label className='login-label' htmlFor='user-email'>email:</label>
            <input
              className='login-input'
              type='text'
              placeholder='example@email.com'
              name='email'
              value={this.state.email}
              onChange = {this.handleInputChange}
            />
          </div>
          <div className='password-input-div'>
            <label className='login-label' htmlFor='user-password'>password:</label>
            <input
              className='login-input'
              type='password'
              placeholder='your password'
              name='password'
              value={this.state.password}
              onChange = {this.handleInputChange}
            />
          </div>
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </section>
    )
  }
}



export default Login;
