

import React,{useState,useEffect} from "react"
import CloapseNav from "../Components/CloapseNav.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { TiThMenuOutline } from "react-icons/ti";
import {Link} from "react-router-dom"
import "../Components/Op.css"
import {useDispatch,useSelector } from "react-redux";
import {setNavi,setLogin,setLoadings} from "../Components/EcomReducer.jsx";
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios'
export default function About(){
  
  const {cart,navi,login}=useSelector((state)=>state.EcomReducer)
  const [menu,setMenu]=useState("")
  const [image,setImage]=useState("")
  const dispatch=useDispatch()
  const[clod,setClod]=useState(false)
  const getLogin=()=>{
    setMenu("login")
    dispatch(setLogin(true))
  }
       axios.defaults.withCredentials=true
       
  const callApi=async()=>{
    try{
      
      const res=await axios.get('http://localhost:3000/products/islogin')
     // console.log(res.data)
    dispatch(setLoadings(false))
      setClod(true)
    }catch(error){
      setClod(false)
      dispatch(setLoadings(true))
      //alert(error.response.data.message)
   console.log(error)
 //toast.error(error.response.data.message)
      
    }
    }
 
  useEffect(()=>{
    
      callApi()
  console.log("ok About")
  
  },[])
 
  
/*
if(navi){
  return(
    <div className="flex py-3 bg-blue-400 mt-1 w-fit justify-between flex-row text-center rounded-3xl fixed z-20 px-3">
        <div className=" px-2">
          <h1 className="text-neutral-900">R@HopE</h1>
        </div>
      <div>
        <ul className="flex gap-3 mx-2 text-white">
        <Link to="/"><li onClick={()=>setMenu("home")} className={menu==="home" ? "test" : ""}>Home</li></Link> 
         <Link to="/category"> <li onClick={()=>setMenu("Category")} className={menu==="Category" ? "test" : ""}>Category</li></Link>
        <Link to="/about"><li onClick={()=>setMenu("about")} className={menu==="about" ? "test" : ""}>About</li>
        </Link>
        <Link to="/orders"><li onClick={()=>setMenu("Orders")} className={menu==="Orders" ? "test" : ""}>Orders</li></Link>
        </ul>
        </div>
      
    <div className="flex align-middle gap-2 text-pink-600 p-1 px-3 relative">
       <Link to="/cart"> 
       <div onClick={()=>setMenu("cart")} className={ menu=== "cart" ? "test px-1" : "px-1"}>
        {cart.length > 0 ? 
        <p className="absolute bg-yellow-600 w-5 h-5 rounded-[50%] top-[-5px] right-11 text-white content-center animate-bounce">{cart.length}</p> :""}
       
         {cart.length > 0 ? 
        <FaShoppingCart className="animate-ping" /> : <FaShoppingCart className="pb-1" /> }
        </div>
      </Link>
       <Link to="/userlogin">
      <div onClick={()=>getLogin()} className={ menu=== "login" ? "test px-1" : "px-1"}>
        <FiLogIn className="pb-1" />
      </div>
</Link>
  <div onClick={()=>setMenu("menu")} className={ menu=== "menu" ? "test ml-2.5" : "ml-2.5"}><TiThMenuOutline className="pb-1 w-5 h-5 mt-[-3.5px]" /></div>
      </div>

    </div>
    
    

   
    )}else{
      return null
    }
*/
 return clod &&(
    <div className="mx-2 box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10 text-center">
      <h1>this is About page</h1>
   
      </div>
      
)
  
}