import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';


  

function UpdateOrder() {
  
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
        axios.get(`http://localhost:8000/orders/${id}`)
        .then(res => {
                console.log(res)
                setState({...state, 
                processdate: res.data[0].processdate, 
                status: res.data[0].Status
                })   
                // setState({...res.data[0]})
            }) 
        .catch(err => console.log(err));  
        }, [])
    
    const [state, setState] = useState({
        id: id,
        processdate: '',
        status: null
    })
    

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.put( `http://localhost:8000/orders/${id}`, state)       
        // 'localhost:8000/updateOrder/'
        .then(res => {            
            console.log(res)          
            navigate('/orders')       
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
        <Link to = {'/orders'} className='btn btn-danger me-2'>Back</Link>
        </div> 
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Update Order</h2>   
                    <div className='mb-2'>                    
                        <label htmlFor="">Update Process Date</label>                    
                        <input 
                        type="date" 
                        value={state.processdate}
                        className='form-control'   
                        name='processdate'                
                        onChange={e => setState({...state, processdate: e.target.value})}/>               
                    </div>  
          

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

export default UpdateOrder;