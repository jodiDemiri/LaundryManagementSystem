import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';


function CreateService() {
    
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

    let [service, setService] = useState({
        name: "",
        description: "",
        qtyinstock: null,
        price: null,
        cuponid: null
      })


    function handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;

         setService((prev) => ({...prev,[name]: value }));
      }

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.post(`http://localhost:8000/services/`,service)        
        .then(res => {            
            console.log(res);            
            navigate('/services');        
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
             <Link to = {'/services'} className='btn btn-danger me-2'>Back</Link>
        </div>    
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Add Service</h2>                
            <div className='mb-2'>                    
                <label htmlFor="">Name</label>                    
                <input 
                type="text" 
                placeholder='Enter Name' 
                className='form-control' 
                name='name'       
                onChange={handleChange} />                
            </div>               
            <div className='mb-2'>                    
                <label htmlFor="">Description</label>                    
                <input 
                type="text" 
                placeholder='Enter service description' 
                className='form-control' 
                name='description'                 
                onChange={handleChange}/>               
            </div>   
            <div className='mb-2'>                    
                <label htmlFor="">Quantity</label>                    
                <input 
                type="number" 
                placeholder='Quantity'
                className='form-control' 
                name='qtyinstock'                  
                onChange={handleChange}/>               
            </div>        
            <div className='mb-2'>                    
                <label htmlFor="">Price</label>                    
                <input 
                type="text" 
                placeholder='Enter Price' 
                className='form-control' 
                name='price'                 
                onChange={handleChange}/>               
            </div>        
            <div className='mb-2'>                    
                <label htmlFor="">Cupon ID</label>                    
                <input 
                type="TEXT" 
                placeholder='Enter Cupon Code' 
                className='form-control' 
                name='cuponid'                 
                onChange={handleChange}/>               
            </div>                     
            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>            
         </form>        
         </div>    
         </div> 
    )

}

export default CreateService;