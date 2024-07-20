
import React,{useEffect} from "react"
import {useLocation,useNavigate} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
import {setNavi,setSideBar} from "../Components/EcomReducer.jsx";
import axios from "axios"
export default function Error(){
  const { pathname } = useLocation();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const callApi=async()=>{
    try{
      const res=await axios.get('https://ecommerce-app-5dnf.onrender.com/products/islogin')
      console.log(res.data)
    }catch(error){
      console.log(error)
    }
    }
const goHome=()=>{
    dispatch(setNavi(true))
    navigate("/home")
  }
  
  useEffect(()=>{
    
    dispatch(setNavi(false))
   dispatch(setSideBar(false))
     // callApi()
    
  },[pathname])
  return(
    <div className="mt-5 text-center">
      <h1>this is Error page 404😇😇</h1>
<p>{pathname} path not found</p>
<button className="font-semibold mt-2 text-center inline-block bg-pink-600 w-[80%] text-white py-2 rounded-3xl hover:bg-amber-800" onClick={()=>goHome()}>go to home</button>
    </div>
    )
}