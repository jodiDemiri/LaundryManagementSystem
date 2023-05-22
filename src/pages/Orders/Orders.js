import React from 'react'
import axios from 'axios'
import {useEffect} from 'react';
import {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Orders() {
    const [order, setOrder] = useState([])
    const navigate = useNavigate();

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
    
    useEffect(()=> {
                axios.get(`http://localhost:8000/orders`)
                .then(res => setOrder(res.data))        
                .catch(err => console.log(err));    
            }, [])
    const handleLogout = () => {
        axios.get('http://localhost:8000/adminlogout')
        .then(res => {
            navigate('/adminlogin')
        }).catch(err => console.log(err));
    }
            

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-danger ms-2 m-2' onClick={handleLogout} >Logout</button> 
                <Link to = {'/optionspage'} className='btn btn-primary me-2'>Back to Options</Link>
            </div>
            <div className='w-90 bg-white rounded p-5'>
                <table className='table table-bordered'>
                    <thead >
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Ordered</th>
                            <th>Date Required</th>
                            <th>Date Processed</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {                        
                     order.map((data, i)=> (                            
                     <tr key={i}>                               
                        <td>{data.FirstName}</td>                               
                        <td>{data.LastName}</td>
                        <td>{data.orderdate}</td>
                        <td>{data.reqdate}</td>
                        <td>{data.processdate}</td>
                        <td>{data.Status}</td>
                    <td>                                   
                        <Link to = {`/updateOrder/${data.ID}`} className='btn btn-primary ms-2'>Update</Link>

                        <Link to = {`/orderDetails/${data.ID}`} className='btn btn-success ms-2'>Details</Link>                        

                     </td>  

                    </tr> 

                     ))      
                    }
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Orders;