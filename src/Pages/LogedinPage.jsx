
import React,{useState,useEffect,useRef} from "react"
import { Outlet, Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector } from "react-redux";
import {setLogin,setSideBar,setCartNumber,getCategory,selCategory,getCat} from "../Components/EcomReducer.jsx";
import toast,{Toaster} from 'react-hot-toast';
import { RxCrossCircled } from "react-icons/rx";
//import UserLogin from "../Pages/UserLogin.jsx"
import About from "../Pages/About.jsx"
import axios from "axios"

export default function LogedinPage(){
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const refData=useRef()
  
  const [isLo,setIsLo]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  
  const {login,sideBar}=useSelector((state)=>state.EcomReducer)
  const [userd,setUserd]=useState({email:"",password:""})
  
 axios.defaults.withCredentials=true
 
   const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      if(res.data){
     setIsLo(true)
      }
    }catch(error){
      setIsLo(false)
      console.log(error)
    }
  }
  
  const userLogOut=async()=>{
   try{
      const res=await axios.get("http://localhost:3000/products/logout")
      await toast.success(res.data.message)
      dispatch(setSideBar(false))
      dispatch(setCartNumber(false))
      dispatch(selCategory({name:"All",category:""}))
  dispatch(getCategory(""))
  dispatch(getCat([]))
      //navigate(-1)
    }catch(error){
     await toast.error(error.response.data.message)
     
    }
  }
  
  const userLogin=async(e)=>{
   try{
      e.preventDefault()
      const res=await axios.post("http://localhost:3000/products/userlogin",userd)
    await toast.success(res.data.message)
      setUserd({email:"",password:""})
      
     setIsLo(true)
      navigate("/home")
    }catch(error){
      setIsLo(false)
      //dispatch(setLogin(false))
      console.log(error.response.data)
      toast.error(error.response.data.message)
    }
  }
  
  const closeByClick=(e)=>{
    if(isLo && sideBar){
      if(refData.current === e.target){
        navigate(-1)
      }
    }
  }
  
  const closeModal=()=>{
   if(isLo){
     navigate(-1)
   }
  }
  
  useEffect(()=>{
    callApi()
  },[])
 
  return(
    
       <div ref={refData} onClick={(e)=>closeByClick(e)} className={`${ isLo && sideBar ? "mx-2 text-center font-serif pt-0 w-[400px] box-border backdrop-blur-sm fixed inset-0 z-20 pt-10" : "mx-2 text-center font-serif pt-0 w-[400px] box-border backdrop-blur-sm fixed inset-0 z-20 mt-16"}`}>

<div className="w-[400px] pb-12 pt-4">
      <div className="text-center py-1 border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] mx-auto px-1">
       {isLo && <div className="flex justify-end m-1">
          <RxCrossCircled className="bg-pink-600 text-white text-3xl rounded-3xl" onClick={()=>closeModal()} /></div>}
              <div className="flex justify-end text-4xl">
      </div>
              <h1 className="text-3xl text-center text-amber-600 pb-2">User Login</h1>
<form onSubmit={userLogin}>
<input type="text" placeholder="here Username" name="email" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2" value={userd.email} onChange={(e)=>setUserd({...userd,email:e.target.value})}required/><br/>
<input type="text" placeholder="here password" name="password" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2" value={userd.password} onChange={(e)=>setUserd({...userd,password:e.target.value})} required/>
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " type="submit">Submit</button>
</form><br/>
<button onClick={()=>userLogOut()}>logout</button>
</div>
</div>
 </div>
       
    )
}