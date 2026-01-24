import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getFriendlyErrorMessage } from '../utils/errorMessages'
import '../App.css'
export default function Signin() {
  const { signIn } = UserAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/accountpage')
    } catch (err) {
      const friendlyMessage = getFriendlyErrorMessage(err.code || err.message);
      setError(friendlyMessage);
      console.error(err);
      setLoading(false)
    }
  }


  return (

    <>
      <div className=' signup-container '>
        <div>
          <h1 className=' signup-heading '>Signin In</h1>
          <p className=' signup-para '>Don't have an account? <Link to='/signup' className='link'>Sign Up</Link></p>
        </div>

        {error && <p className="error">{error}</p>}

        <form className=' signup-form ' onSubmit={handleSubmit} >

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder='Enter your email' className=' signup-input ' required onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder='Enter your password' className=' signup-input ' required onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          <button type='submit' className=' signin-button ' disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

      </div>
    </>
  )
}