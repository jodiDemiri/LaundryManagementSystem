import React from 'react'
import '../style.css'
import axios from 'axios'
import {useEffect} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

function ServicesCatalog() {
    // const navigate = useNavigate();

    const [ scatalog, setSCatalog] = useState([])

    useEffect(()=> {
                axios.get(`http://localhost:8000/services`)
                .then(res => setSCatalog(res.data))        
                .catch(err => console.log(err));    
            }, [])
    
    
    return (
        
        <div className='container'>
            
            <div className='d-flex justify-content-center align-items-center m-5'>
            <h2>Products Catalog</h2>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to = {`/servicescatalog`} className='btn btn-success me-2'>Services Catalog</Link>   
                <Link to = {`/cuponscatalog`} className='btn btn-primary me-2'>Cupons Catalog</Link>                   
             </div>
             <div className='w-90 bg-white rounded p-5 m-5'>
             <table className='table table-bordered'>
                    <thead >
                        <tr>
                            <th>Services</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                     {                        
                     scatalog.map((data, i)=> (                            
                     <tr key={i}>                               
                        <td>{data.Name}</td>                               
                        <td>{data.Description}</td>
                        <td>{data.Price}</td>
                    </tr> 

                     ))      
                    }
                    </tbody>
                </table>
            </div>
           
        </div>
    )
}

export default ServicesCatalog;