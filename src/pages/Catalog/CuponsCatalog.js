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
                axios.get(`http://localhost:8000/cupons`)
                .then(res => setSCatalog(res.data))        
                .catch(err => console.log(err));    
            }, [])
    
    
    return (
        
        <div className='container'>
            
            <div className='d-flex justify-content-center align-items-center m-5'>
            <h2>Cupons Catalog</h2>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to = {'/'} className='btn btn-danger me-2'>Back to Home</Link>
                <Link to = {`/servicescatalog`} className='btn btn-success me-2'>Services Catalog</Link>   
                <Link to = {`/cuponscatalog`} className='btn btn-warning me-2'>Cupons Catalog</Link>                   
             </div>
             <div className='w-90 bg-white rounded p-5 m-5'>
             <table className='table table-bordered'>
                    <thead >
                        <tr>
                            <th>Discount Percentage</th>
                            <th>Minimum Purchase</th>
                            <th>Promo Code</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                     {                        
                     scatalog.map((data, i)=> (                            
                     <tr key={i}>                               
                        <td>{data.DiscountAmount}</td>                               
                        <td>{data.MinPurchase}</td>
                        <td>{data.ServiceCode}</td>
                        <td>{data.Description}</td>
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