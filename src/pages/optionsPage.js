import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom';


function optionsPage() {
    const navigate = useNavigate()
	axios.defaults.withCredentials = true;
	useEffect(()=>{
		axios.get(`http://localhost:8000/verifiedUsers`)
		.then(res => {
			if(res.data.Status === "Success")
            {

            }
			 else {
				navigate('/adminLogin')
			}
		})
	}, [])
    const handleLogout = () => {
		axios.get('http://localhost:8000/adminlogout')
		.then(res => {
			navigate('/adminlogin')
		}).catch(err => console.log(err));
	}
    return (
    <div  className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div  className='w-50 bg-white rounded p-3 border border-dark'>
        <h2>Items Directory</h2>                
        <button className='btn btn-danger ms-2 m-2' onClick={handleLogout} >Logout</button> 
            <div className='d-flex justify-content-center'>
             <Link to = {`/services`} className='btn btn-primary me-2 m-2'>Services</Link>
             <Link to = {`/orders`} className='btn btn-primary me-2 m-2'>Orders</Link>
             <Link to = {`/cupons`} className='btn btn-primary me-2 m-2'>Cupons</Link>
             <Link to = {`/payments`} className='btn btn-primary me-2 m-2'>Payments</Link>
            </div>
        </div>
        
    </div>
    )
}
export default optionsPage
