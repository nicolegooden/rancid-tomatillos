import React, { Component } from 'react';
import { getUserData } from '../apiCalls'
import PropTypes from 'prop-types';
import { BrowserRouter as Route, Redirect, Link } from 'react-router-dom';
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

  clearInputs() {
    this.setState({
      email: '',
      password: ''
    })
  }

  handleLogin = (event) => {
    event.preventDefault();
    if (this.state.email !== '' && this.state.password !== '') {
      getUserData(this.state.email, this.state.password)
      .then(user => this.props.setUser(user))
      .then(() => this.setState({ error: 'Incorrect email or password, please try again.' }))
    } else {
      this.setState({ error: 'Please enter your email and your password.' })
    }
    this.clearInputs();
  }

  componentDidMount() {
    this.props.updateLoginView()
  }

  render() {
    if (this.props.user.name) {
      return <Redirect to='/' />
    }
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
              placeholder='enter password'
              name='password'
              value={this.state.password}
              onChange = {this.handleInputChange}
            />
          </div>
          <button onClick={this.handleLogin}>Login</button>
          <p>{this.state.error}</p>
        </form>
      </section>
    )
  }

}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  updateLoginView: PropTypes.func.isRequired
}



export default Login;
