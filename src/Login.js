import React from 'react';
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

  render() {
    return (
      <section className='login-container'>
        <form className='login-form'>
          <React.Fragment>
          <label className='login-label' htmlFor='user-email'>email:</label>
          <input
            className='login-input'
            type='text'
            placeholder='example@email.com'
            name='email'
            value={this.state.email}
            onChange = {this.handleInputChange}
          />
          </React.Fragment>
          <React.Fragment>
          <label className='login-label' htmlFor='user-password'>password:</label>
          <input
            className='login-input'
            type='password'
            placeholder='your password'
            name='password'
            value={this.state.password}
            onChange = {this.handleInputChange}
          />
          </React.Fragment>
        </form>
      </section>
    )
  }
}



export default Login;
