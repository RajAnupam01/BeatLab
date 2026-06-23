import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthData } from '../contexts/authContext';

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {registerUser,btnLoading} = AuthData()

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    registerUser(name,email,password,navigate)
  }

  return (
    <div className="flex justify-center items-center h-screen max-h-screen" >
      <div className="bg-black text-white p-8 rounded-lg shadow-lg  w-full max-w-md" >
        <h2 className="text-3xl font-semibold text-center mb-8">Register to BeatLab</h2>

        <form className="mt-8" onSubmit={submitHandler} >
            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" placeholder="Please Enter your Name" className="auth-input" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" placeholder="Please Enter your Email" className="auth-input" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" placeholder="Please Enter your Password" className="auth-input" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="auth-btn" disabled={btnLoading} >{btnLoading?"Please Wait..":'Register'}</button>
        </form>
        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-gray-400 hover:text-gray-300">Already have an account ? Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register