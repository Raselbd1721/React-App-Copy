
import { useState,useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import SearchBar from "./Components/SearchBar.jsx"
import Navbar from "./Components/Navbar.jsx"
import CategoryList from "./Components/CategoryList.jsx"
//import UserLogin from "./Pages/UserLogin.jsx"
import LoadingPage from "./Pages/LoadingPage.jsx"
import Products from "./Components/Products.jsx"
import "./Components/Op.css"
import {useDispatch,useSelector } from "react-redux";
import {setNavi,setLoadings} from "./Components/EcomReducer.jsx";
import toast, { Toaster } from 'react-hot-toast';

import axios from "axios"

const App=()=>{
  const {login,navi,sideBar,loader}=useSelector((state)=>state.EcomReducer)
 
  const [isLoading,setIsLoading]=useState(true)
  const[clod,setClod]=useState(false)
  const dispatch=useDispatch()
  
  axios.defaults.withCredentials=true
  const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
     setIsLoading(false)
    }catch(error){
      setIsLoading(true)
toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    callApi()
  },[])
  
  return(
<div className="w-full">{isLoading && <LoadingPage isLoading={isLoading} />}
    <div className="mx-2 box-border bg-gray-200 pb-5">
     
  <SearchBar />

   <CategoryList />
  <div className="w-2 h-5 mx-2 bg-blue-950 rounded-3xl text-center mx-auto card-body ease-out"></div>
<Products />
</div>
</div>

    )

}

export default App
