import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';


  

function UpdateCupon() {

   
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
        axios.get(`http://localhost:8000/cupons/${id}`)
        .then(res => {
                console.log(res)
                setState({...state, 
                discount: res.data[0].DiscountAmount,  
                minpurchase: res.data[0].MinPurchase, 
                promocode: res.data[0].ServiceCode,
                description: res.data[0].Description
                })   
                // setState({...res.data[0]})
            }) 
        .catch(err => console.log(err));  
        }, [])
    
    const [state, setState] = useState({
        id: id,
        discount: 0,
        minpurchase: 0,
        promocode: null,
        description: null
    })
    

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.put( `http://localhost:8000/cupons/${id}`, state)       
        .then(res => {            
            console.log(res)          
            navigate('/cupons')       
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
            <Link to = {'/cupons'} className='btn btn-danger me-2'>Back</Link>
        </div> 
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Update Cupon</h2>   
                    <div className='mb-2'>                    
                        <label htmlFor="">Discount Percentage</label>                    
                        <input 
                        type="number" 
                        className='form-control' 
                        value={state.discount}     
                        onChange={e => setState({...state, discount: e.target.value})} />                
                    </div>   
                    <div className='mb-2'>                    
                        <label htmlFor="">Minimum Purchase</label>                     
                        <input 
                        type="number" 
                        value={state.minpurchase}
                        className='form-control'   
                        name='minpurchase'                
                        onChange={e => setState({...state, minpurchase: e.target.value})}/>               
                    </div>  
          
                    <div className='mb-2'>                    
                        <label htmlFor="">Promo Code</label>                    
                        <input type="text" 
                        value={state.promocode}
                        // placeholder='Update Quantity' 
                        className='form-control'  
                        name='promocode'  
                        onChange={e => setState({...state, promocode: e.target.value})}/>               
                    </div>    
   
                    <div className='mb-2'>                    
                        <label htmlFor="">Update Description</label>                    
                        <input 
                        type="text" 
                        value={state.description}
                        className='form-control'  
                        name='description'  
                        onChange={e => setState({...state, description: e.target.value})}/>               
                    </div>   
  
                             
            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>            
         </form>        
         </div>    
         </div> 
    )

}

export default UpdateCupon;