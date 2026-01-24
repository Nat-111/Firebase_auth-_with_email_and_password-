import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from "../context/authContext"
import { getFriendlyErrorMessage } from '../utils/errorMessages'
import '../App.css'

export function Signup() {
  const { createUser } = UserAuth()


  const [name, setName] = useState('')
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
      await createUser(email, password, name)
      navigate('/accountpage')
    } catch (err) {
      const friendlyMessage = getFriendlyErrorMessage(err.code || err.message);
      setError(friendlyMessage);
      console.error(err);
      setLoading(false)
    }
  }

  return (
    <div className='signup-container'>
      <div>
        <h1 className='signup-heading'>Create Account</h1>
        <p className='signup-para'>
          Already have an account? <Link to='/' className='link'>Sign In</Link>
        </p>
      </div>

      {error && <p className="error">{error}</p>}

      <form className='signup-form' onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder='John Doe'
          className='signup-input'
          required
          onChange={e => setName(e.target.value)}
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder='name@company.com'
          className='signup-input'
          required
          onChange={e => setEmail(e.target.value)}

        />

        <label>Password</label>
        <input
          type="password"
          placeholder='••••••••'
          className='signup-input'
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit' className='signup-button' disabled={loading}>
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  )
}
