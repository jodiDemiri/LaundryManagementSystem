import React from 'react'
import axios from 'axios'
import {useEffect} from 'react';
import {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Cupons() {
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
                axios.get(`http://localhost:8000/cupons`)
                .then(res => setService(res.data))        
                .catch(err => console.log(err));    
            }, [])

    const handleDelete = async (id) => { 
            try {           
                await axios.delete(`http://localhost:8000/cupons/${id}`)            
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
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-danger ms-2 m-2' onClick={handleLogout} >Logout</button> 
                <Link to = {'/optionspage'} className='btn btn-primary me-2'>Back to Options</Link>
            </div>
            <div className='w-90 bg-white rounded p-5'>
                <Link to = '/createCupon' className='btn btn-success mb-2'>Add +</Link>
                <table className='table table-bordered'>
                    <thead >
                        <tr>
                            <th>Discount Percentage</th>
                            <th>Minimun Purchase</th>
                            <th>Promo Code</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                     {                        
                     service.map((data, i)=> (                            
                     <tr key={i}>                               
                        <td>{data.DiscountAmount}</td>                               
                        <td>{data.MinPurchase}</td>
                        <td>{data.ServiceCode}</td>
                        <td>{data.Description}</td>
                    <td>                                   
                        <Link to = {`/updateCupon/${data.ID}`} className='btn btn-primary me-2'>Update</Link>
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

export default Cupons;