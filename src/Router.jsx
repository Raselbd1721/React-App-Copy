
import React,{useState,useEffect} from "react"
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
//import { BrowserRouter as Routerb, Route, Switch, Link } from 'react-router-dom';
import {useDispatch,useSelector } from "react-redux";
import {setLogin,setSideBar,setLoadings} from "./Components/EcomReducer.jsx";

import App from "./App.jsx"
import Navbar from "./Components/Navbar.jsx"
import Cart from "./Pages/Cart.jsx"
import Category from "./Pages/Category.jsx"
import Orders from "./Pages/Orders.jsx"
import OtpPage from "./Pages/OtpPage.jsx"
import ProductsPage from "./Pages/ProductsPage.jsx"
import LogedinPage from "./Pages/LogedinPage.jsx"
import EditProducts from "./Pages/EditProducts.jsx"
import NavSidebar from "./Pages/NavSidebar.jsx"
import MainPage from "./Pages/MainPage.jsx"
import ShowOrder from "./Pages/ShowOrder.jsx"
import UpdateOrder from "./Pages/UpdateOrder.jsx"
import About from "./Pages/About.jsx"
import Users from "./Pages/Users.jsx"
import LoadingPage from "./Pages/LoadingPage.jsx"
import ErrorPage from "./Pages/Error.jsx"
import "./Components/Op.css"
import axios from "axios"


const Router=()=>{
  
const {login,navi,sideBar,loader}=useSelector((state)=>state.EcomReducer)

  const dispatch=useDispatch()

  const[isLoading,setIsLoading]=useState(false)
const [test,setTest]=useState(false)
 useEffect(()=>{
    //Axios interceptors
 axios.interceptors.request.use(function (config) {
  setIsLoading(true)
  // dispatch(setLoadings(true))
    return config;
  }, function (error) {
    //dispatch(setLoadings(true))
setIsLoading(true)
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
setIsLoading(false)
//dispatch(setLoadings(false))
    return response;
  }, function (error) {
    return Promise.reject(error);
    
  });
 
 },[])

  return(
    <BrowserRouter>
      <nav className="flex justify-center">
        
{navi && <Navbar /> }


{sideBar && <NavSidebar />}

 </nav>

 {isLoading && <LoadingPage isLoading={isLoading} />}
 
 
  
   <Routes>

<Route path="/" element={<MainPage />} >
<Route path="/home" element={<App />} />
<Route path="/cart" element={<Cart />} />
<Route path="/products" element={<ProductsPage />} />

      <Route path="/about" element={<About />} />
      <Route path="/showorder/:id" element={<ShowOrder />} />

      <Route path="/users" element={<Users />} />
      <Route path="/otppage" element={<OtpPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products/editproducts" element={<EditProducts />} />
      <Route path="/category" element={<Category />} />
      <Route path="/updateOrder/:id" element={<UpdateOrder />} />
</Route>
      <Route path="/login" element={<LogedinPage />} />
        <Route path="*" element={<ErrorPage />} />
</Routes>
        
  
    </BrowserRouter>
    )
  
}
export default Router