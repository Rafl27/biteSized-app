import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.css'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'

const SignUp: React.FC = () => {
  let [authMode, setAuthMode] = useState('signin')
  const navigate = useNavigate()
  const changeAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
  }

  const SignUpForm: React.FC = () => {
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
    })

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [notification, setNotification] = useState('');

    const handleChange = (e: any) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event: any) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const username = formData.get('name')
      const email = formData.get('email')
      const password = formData.get('password')
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
          username,
          email,
          password,
        })
        const successModal = document.getElementById('successModal');
        if (successModal) {
          successModal.style.display = 'block';
        }

        setTimeout(() => {
          changeAuthMode()
        }, 2000);
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 409) {
          alert('User with this email already exists.')
        }
      }
    }

    const handleLogin = async (event: any) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const email = formData.get('email')
      const password = formData.get('password')
      try {
        const response: any = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/login`,
          {
            email,
            password,
          }
        )
        const userToken = response.data
        const userName = response.data.name
        const userEmail = response.data.email
        const profilePicture = response.data.profilePicture
        localStorage.setItem('token', userToken)
        localStorage.setItem('name', userName)
        localStorage.setItem('email', userEmail)
        localStorage.setItem('profilePicture', profilePicture)
        navigate('/home')
      } catch (err) {

        if(err.response && err.response.status == 401){
          setNotification('Invalid email or password.');
        }
        else {
          setNotification('Unexpected error. Please try again later.');
        }
        console.log(err)
      }
    }

    if (authMode === 'signin') {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              {notification && (
                  <div className="notification" style={{ color: 'red', marginBottom: '10px' }}>
                    {notification}
                  </div>
                  )}
              <div className="text-center">
                Not registered yet?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <div className="password-input-container">
                  <div className="input-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control mt-1"
                        placeholder="Password"
                        name="password"
                    />
                  </div>
                  <button
                      type="button"
                      className="show-password-button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible/>}
                  </button>
                </div>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              {/*<p className="text-center mt-2">*/}
              {/*  Forgot <a href="#">password?</a>*/}
              {/*</p>*/}
            </div>
          </form>
        </div>
      )
    }

    return (
        <>
      <div className="Auth-form-container">
        <div id="successModal" className="modalAccount" style={{ display: 'none'}}>
          <div className="modal-content">
            <p>Account created successfully. Please login now.</p>
          </div>
        </div>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{' '}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                name="name"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <div className="password-input-container">
                <div className="input-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control mt-1"
                  placeholder="Password"
                  name="password"
                />
                </div>
                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible/>}
                </button>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
        </>
    )
  }

  return <SignUpForm />
}

export default SignUp
