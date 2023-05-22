import React from 'react'
import axios from 'axios'
import {useEffect} from 'react';
import {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Services() {
    const [service, setService] = useState([])
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
                axios.get(`http://localhost:8000/services`)
                .then(res => setService(res.data))        
                .catch(err => console.log(err));    
            }, [])

    const handleDelete = async (id) => { 
            try {           
                await axios.delete(`http://localhost:8000/services/${id}`)            
                window.location.reload()        
            }catch(err) {            
                console.log(err);        
            }
        }
    const handleLogout = () => {
        axios.get('http://localhost:8000/adminlogout')
        .then(res => {
            navigate('/adminlogin')
        }).catch(err => console.log(err));
    }
        
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center vstack'>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-danger ms-2 m-2' onClick={handleLogout} >Logout</button> 
                <Link to = {'/optionspage'} className='btn btn-primary me-2'>Back to Options</Link>
            </div>
            <div className='w-90 bg-white rounded p-5'>
                <Link to = '/createService' className='btn btn-success mb-2'>Add +</Link>
                <table className='table table-bordered'>
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stock Quantity</th>
                            <th>Price</th>
                            <th>Promo Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {                        
                     service.map((data, i)=> (                            
                     <tr key={i}>                               
                        <td>{data.Name}</td>                               
                        <td>{data.Description}</td>
                        <td>{data.QtyInStock}</td>
                        <td>{data.Price}</td>
                        <td>{data.CuponID}</td>
                    <td>                                   
                        <Link to = {`/updateService/${data.ID}`} className='btn btn-primary me-2'>Update</Link>
                        <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.ID)} >Delete</button>                               
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

export default Services;