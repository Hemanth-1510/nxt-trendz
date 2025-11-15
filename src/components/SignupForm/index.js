import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {API_ENDPOINTS} from '../../config/api'

import './index.css'

class SignupForm extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    showSubmitError: false,
    errorMsg: '',
    showPasswordMismatch: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  validateForm = () => {
    const {password, confirmPassword, username, name} = this.state

    if (username.trim() === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Username is required',
      })
      return false
    }

    if (name.trim() === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Name is required',
      })
      return false
    }

    if (password.length < 8) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Password must be at least 8 characters',
      })
      return false
    }

    if (password !== confirmPassword) {
      this.setState({
        showPasswordMismatch: true,
        showSubmitError: true,
        errorMsg: 'Passwords do not match',
      })
      return false
    }

    return true
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({showSubmitError: false, showPasswordMismatch: false})

    if (!this.validateForm()) {
      return
    }

    const {username, password, name} = this.state

    // Register new user
    const userDetails = {username, password, name}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, options)
      if (response.ok) {
        const data = await response.json()
        if (data.jwt_token) {
          this.onSubmitSuccess(data.jwt_token)
        } else {
          this.onSubmitFailure('Signup failed. Please try again.')
        }
      } else {
        const data = await response.json().catch(() => ({}))
        this.onSubmitFailure(
          data.error_msg || 'Signup failed. Username might already exist.',
        )
      }
    } catch (error) {
      console.error('Signup error:', error)
      // Check if it's a network error or CORS issue
      if (error.message && error.message.includes('Failed to fetch')) {
        this.onSubmitFailure(
          'Cannot connect to server. Please check your internet connection.',
        )
      } else {
        this.onSubmitFailure('Network error. Please try again.')
      }
    }
  }

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="username-input-field"
          value={name}
          onChange={this.onChangeName}
          placeholder="Name"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderConfirmPasswordField = () => {
    const {confirmPassword, showPasswordMismatch} = this.state

    return (
      <>
        <label className="input-label" htmlFor="confirmPassword">
          CONFIRM PASSWORD
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`password-input-field ${
            showPasswordMismatch ? 'error-field' : ''
          }`}
          value={confirmPassword}
          onChange={this.onChangeConfirmPassword}
          placeholder="Confirm Password"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website signup"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <h1 className="signup-heading">Sign Up</h1>
          <div className="input-container">{this.renderNameField()}</div>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">
            {this.renderConfirmPasswordField()}
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <p className="signup-text">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default SignupForm
