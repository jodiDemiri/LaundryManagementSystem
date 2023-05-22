import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react';
import {useNavigate, useParams,Link} from 'react-router-dom';



function UpdatePayment() {
  
    const {id} = useParams(); 
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
        axios.get(`http://localhost:8000/payments/${id}`)
        .then(res => {
                console.log(res)
                setState({...state, 
                status: res.data[0].PaymentStatus
                })   
                // setState({...res.data[0]})
            }) 
        .catch(err => console.log(err));  
        }, [])
    
    const [state, setState] = useState({
        id: id,
        status: null
    })
    

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.put( `http://localhost:8000/payments/${id}`, state)       
        .then(res => {            
            console.log(res)          
            navigate('/payments')       
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
             <Link to = {'/payments'} className='btn btn-danger me-2'>Back</Link>
        </div> 
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Update Payment Status</h2>   

                    <div className='mb-2'>                    
                        <label htmlFor="">Update Status</label>                    
                        <input type="text" 
                        value={state.status}
                        className='form-control'  
                        name='status'  
                        onChange={e => setState({...state, status: e.target.value})}/>               
                    </div>    
                             
            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>            
         </form>        
         </div>    
         </div> 
    )

}

export default UpdatePayment;