import React from "react";
import {Link} from 'react-router-dom';


function Start() {

    return(
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center m-5'>
             <h1>Welcome to the Laundry System</h1>
            </div>
            
            <div className='d-flex justify-content-center align-items-center'>
            <div className='w-90 bg-white rounded p-5 m-5'>
            <Link to = {`/adminlogin`} className='btn btn-success me-2'>Employee Login</Link>   
            <Link to = {`/cuponscatalog`} className='btn btn-primary me-2'>Catalog</Link>  
            </div>                 
            </div>
        </div>
    )
}
export default Start;
