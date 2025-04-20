import React from 'react'
import {useDispatch} from 'react-redux'
import { useState } from 'react'
import {login} from '../slices/userSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogin= (e) => {
        e.preventDefault()
        if(!email || !password){
            console.log("all feilds are required")
            return
        }
        dispatch(login({email,password})).unwrap().then(() => {
            localStorage.setItem("isLoggedIn", true)
            console.log("Login successfull")
            navigate('/')
        })
    }
  return (
    <div className='container'>
        <div className='d-flex justify-content-center'>
        <div className='col-md-4'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <label>Email: </label>
            <input className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Link to='/signup'>New User? click here to signup</Link><br/>
            <button className='btn btn-primary my-3' type='submit'>Login</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Login