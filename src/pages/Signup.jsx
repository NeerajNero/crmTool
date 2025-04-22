import React, { useState } from 'react'
import { signup } from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSignup = (e) => {
        e.preventDefault()
        if(!name || !email || !password){
            console.log("all feilds are required")
            return
        }
        dispatch(signup({name,email,password})).unwrap().then(() => {
            localStorage.setItem("isLoggedIn", true)
            console.log("signup successfull")
            navigate('/')
        })
    }
  return (
    <div className='container'>
        <div className='d-flex justify-content-center vh-100 align-items-center'>
        <div className='col-md-4'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <label>Full Name: </label>
            <input className='form-control' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
            <label>Email: </label>
            <input className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Link to='/login'>Existing User? click here to login</Link><br/>
            <button className='btn btn-primary my-3' type='submit'>Signup</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Signup