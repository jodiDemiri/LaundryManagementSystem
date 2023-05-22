import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Services from './pages/Services/Services';
import CreateService from './pages/Services/CreateService';
import UpdateService from './pages/Services/UpdateService';
import AdminLogin  from './pages/adminLogin';
import OptionsPage  from './pages/optionsPage';
import Cupons from './pages/Cupons/Cupons';
import UpdateCupon from './pages/Cupons/UpdateCupon';
import CreateCupon from './pages/Cupons/CreateCupon';
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/Orders/OrderDetails';
import UpdateOrder from './pages/Orders/UpdateOrder';
import Payments from './pages/Payments/Payments';
import UpdatePayment from './pages/Payments/UpdatePayment'
import ServicesCatalog from './pages/Catalog/ServicesCatalog'
import CuponsCatalog from './pages/Catalog/CuponsCatalog'
import Start from './pages/Start';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* main pages */}
        <Route path='/' element={<Start />}></Route>
        <Route path='/optionsPage' element={<OptionsPage />}></Route>
        <Route path='/adminLogin' element={<AdminLogin />}></Route>
        {/* client pages */}
        <Route path='/servicescatalog' element={<ServicesCatalog />}></Route>
        <Route path='/cuponscatalog' element={<CuponsCatalog />}></Route>

        
        {/* admin pages */}
        {/* services pages */}
        <Route path='/services' element={<Services />}></Route>
        <Route path='/createService' element={<CreateService />}></Route> 
        <Route path='/updateService/:id' element={<UpdateService />}></Route>  
        {/* cupons pages */}
        <Route path='/cupons' element={<Cupons />}></Route>    
        <Route path='/createCupon' element={<CreateCupon />}></Route>  
        <Route path='/updateCupon/:id' element={<UpdateCupon />}></Route>
        {/* orders pages */}
        <Route path='/orders' element={<Orders />}></Route>    
        <Route path='/orderDetails/:id' element={<OrderDetails />}></Route>  
        <Route path='/updateOrder/:id' element={<UpdateOrder />}></Route>
        {/* payment pages */}
        <Route path='/payments' element={<Payments />}></Route>    
        <Route path='/updatePayment/:id' element={<UpdatePayment />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
