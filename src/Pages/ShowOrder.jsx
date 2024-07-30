
import React,{useState,useEffect} from "react"
import {useLocation,useNavigate} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
import LoadingPage from "../Pages/LoadingPage.jsx"
import {setNavi,setLogin,setLoadings} from "../Components/EcomReducer.jsx";
import {setLs,RemoveLs,getLs,callIslogin} from "../Helper/HelperLs.jsx";

import "../Components/Op.css"
import axios from "axios"
export default function ShowOrder(){
  const {loader}=useSelector((state)=>state.EcomReducer)
  const[clod,setClod]=useState(false)
  const location=useLocation()
  const {_id,subTotal,order,userDetails,invoice}=location.state
  const navigate=useNavigate()
const dispatch=useDispatch()
  const [data,setData]=useState([])
  axios.defaults.withCredentials=true
  
   const callApi=async()=>{
    try{
      const res=await callIslogin({action:"get",url:"https://ecommerce-app-5dnf.onrender.com/products/islogin"})
      console.log(res.data)
      //dispatch(setLoadings(false))
      setClod(true)
    }catch(error){
     
     // dispatch(setLoadings(true))
    setClod(false)
    }
    }
 
 useEffect(()=>{
if(location.state==""){
  setClod(false)
  alert(hi)
}
      callApi()
 },[])
  
  return clod &&(


    <div className="mx-2 max-w-[400px] box-border bg-gray-200 py-5 mt-14 text-center font-serif">
       
      <h1>Invoice No : {invoice}</h1>
    <h1 className="text-pink-500 font-bold">Customer Name : {userDetails.email}</h1>
      
            <div className="cae grid gap-3 p-5 px-2">
        {
           order?.map((val,index)=>{
            return <div key={index} className=" grid grid-cols-4 bg-pink-600 rounded-3xl gap-4">
         <div className="col-span-2 flex gap-4 ">
           <img src={val.image} className="w-20 h-20 rounded-3xl" />
           <div className="content-center uppercase font-bold font-serif">
           <ul className="text-[10px] space-y-1 text-white">
             <li>{val.name}</li>
             <li>{val.category}</li>
             <li>{val.price}</li>
           </ul>
         </div>
         </div>
         
         <div className="flex items-center gap-1.5 text-center">
           <p className="w-7 h-7 border-amber-500
           border-2 border-solid bg-white rounded-3xl text-[13px] content-center">{val.qty}</p>
          </div>
         
         <div className="flex items-center gap-3 justify-end px-3 text-2xl">
          <div>
         <p>{val.qty * val.price}</p>
         </div>
         </div>
         
            </div>
          })
        }
    </div>
        {order?.length > 0 ? <div>
    <div>
      <hr className=" border-b-0 border-[8px] border-amber-900 w-[94%] mx-auto rounded-3xl"/>
      </div>
      <div className="grid grid-cols-3 gap-3 py-3 items-center">
      <div className="col-span-2 text-right text-2xl">
        <h1>SUBTOTAL</h1>
      </div>
      <div className="text-center text-3xl" >
     <p>${subTotal}</p>
      </div>
      </div>
      </div>:""
     }
    </div>
    
    )
}