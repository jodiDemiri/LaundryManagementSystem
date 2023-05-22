import React from "react";
import './style.css'
import axios from 'axios';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function adminLogin() {
    const [values, setValues] = useState({
        loginid: '',
        password: ''
    })
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:8000/adminlogin`, values)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/optionspage');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 vstack'> 
         <Link to = {'/'} className='btn btn-danger me-2 m-5' >Back to Home</Link>
            <div className='p-3 rounded w-25 border loginForm bg-warning'>
              
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form >
                    <div className='mb-3'>
                        <label htmlFor=""><strong>Username</strong></label>
                        <input type="text" placeholder='Enter Username' name='loginid' 
                          onChange={e => setValues({...values, loginid: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0' onClick={handleSubmit}> Log in</button>
                </form>
            </div>
        </div>
    )
}
export default adminLogin