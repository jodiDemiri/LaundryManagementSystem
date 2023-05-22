import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';


function Createcupon() {
    
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

    let [cupon, setCupon] = useState({
        discount: 0,
        minpurchase: 0,
        promocode: null,
        description: null
      })
    // const [error,setError] = useState(false) 
    // const navigate = useNavigate();

    function handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;

         setCupon((prev) => ({...prev,[name]: value }));
      }

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.post(`http://localhost:8000/cupons/`,cupon)        
        .then(res => {            
            console.log(res);            
            navigate('/cupons');        
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
            <Link to = {'/cupons'} className='btn btn-danger me-2'>Back</Link>
        </div>    
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Add Cupon</h2>                
            <div className='mb-2'>                    
                <label htmlFor="">Discount Percentage</label>                    
                <input 
                type="number" 
                placeholder='Percentage Off' 
                className='form-control' 
                name='discount'       
                onChange={handleChange} />                
            </div>               
            <div className='mb-2'>                    
                <label htmlFor="">Minimun Purchase Amount</label>                    
                <input 
                type="number" 
                placeholder='Minimum Purchase Amount' 
                className='form-control' 
                name='minpurchase'                 
                onChange={handleChange}/>               
            </div>   
            <div className='mb-2'>                    
                <label htmlFor="">Promo Code</label>                    
                <input 
                type="text" 
                placeholder='Enter promo code'
                className='form-control' 
                name='promocode'                  
                onChange={handleChange}/>               
            </div>        
            <div className='mb-2'>                    
                <label htmlFor="">Description</label>                    
                <input 
                type="text" 
                placeholder='Enter Promo description' 
                className='form-control' 
                name='description'                 
                onChange={handleChange}/>               
            </div>                         
            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>            
         </form>        
         </div>    
         </div> 
    )

}

export default Createcupon;