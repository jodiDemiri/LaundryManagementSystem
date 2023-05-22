import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';


  

function UpdateService() {

   
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
        axios.get(`http://localhost:8000/services/${id}`)
        .then(res => {
                console.log(res)
                setState({...state, 
                name: res.data[0].Name,  
                description: res.data[0].Description, 
                qtyinstock: res.data[0].QtyInStock,
                price: res.data[0].Price,
                cuponid: res.data[0].CuponID 
                })   
                // setState({...res.data[0]})
            }) 
        .catch(err => console.log(err));  
        }, [])
    
    const [state, setState] = useState({
        id: id,
        name:null,
        description: null,
        qtyinstock: 0,
        price: null,
        cuponid: null
    })
    

    function handleSubmit(event) {        
        event.preventDefault();       
        axios.put( `http://localhost:8000/services/${id}`, state)       
        // 'localhost:8000/updateService/'
        .then(res => {            
            console.log(res)          
            navigate('/services')       
        }).catch(err => console.log(err));  
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center vstack'> 
        <div className=''>
            <Link to = {'/services'} className='btn btn-danger me-2'>Back</Link>
        </div> 
        <div className='w-50 bg-white rounded p-3'>            
        <form >                
            <h2>Update Service</h2>   
                    <div className='mb-2'>                    
                        <label htmlFor="">Name</label>                    
                        <input 
                        type="text" 
                        // placeholder='Update Name' 
                        className='form-control' 
                        value={state.name}     
                        onChange={e => setState({...state, name: e.target.value})} />                
                    </div>   
                    <div className='mb-2'>                    
                        <label htmlFor="">Description</label>                    
                        <input 
                        type="text" 
                        value={state.description}
                        // placeholder='Update service description' 
                        className='form-control'   
                        name='description'                
                        onChange={e => setState({...state, description: e.target.value})}/>               
                    </div>  
          

                    <div className='mb-2'>                    
                        <label htmlFor="">Quantity</label>                    
                        <input type="number" 
                        value={state.qtyinstock}
                        // placeholder='Update Quantity' 
                        className='form-control'  
                        name='qtyinstock'  
                        onChange={e => setState({...state, qtyinstock: e.target.value})}/>               
                    </div>    
   
                    <div className='mb-2'>                    
                        <label htmlFor="">Price</label>                    
                        <input 
                        type="text" 
                        value={state.price}
                        // placeholder='Update Price' 
                        className='form-control'  
                        name='price'  
                        onChange={e => setState({...state, price: e.target.value})}/>               
                    </div>   
  
                    <div className='mb-2'>                    
                        <label htmlFor="">Cupon ID</label>                    
                        <input 
                        type="text"
                        value={state.cuponid} 
                        // placeholder='Update Cupon Code' 
                        className='form-control'  
                        name='cuponid'                 
                        onChange={e => setState({...state, cuponid: e.target.value})}/>               
                    </div> 
                             
            <button className='btn btn-success' onClick={handleSubmit}>Submit</button>            
         </form>        
         </div>    
         </div> 
    )

}

export default UpdateService;