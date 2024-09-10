
import React,{useState,useEffect} from "react"
import {useDispatch,useSelector } from "react-redux";
import AsyncLocalStorage from '@createnextapp/async-local-storage'

import {Link,useParams,useNavigate,useLocation} from "react-router-dom"
import {setNavi} from "../Components/EcomReducer.jsx";
import { CiCirclePlus,CiCircleMinus} from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

import LoadingPage from "../Pages/LoadingPage.jsx"
import toast,{Toaster} from 'react-hot-toast';
import "../Components/Op.css"

import axios from 'axios'

export default function UpdateOrder(){
   const[isSuccess,setIsSuccess]=useState(null)
   const[isLoading,setIsLoading]=useState(false)
   const[clod,setClod]=useState(false)
   const location=useLocation()
  const {invoice}=location.state
   
const { id } = useParams()
  const navigate=useNavigate()
 const[cart,setCart]=useState([])
const[userData,setUserData]=useState({})
  
const jsData=()=>{
   let cg=localStorage.getItem("cart")
   if(cg!==null && isSuccess){
     
     return JSON.parse(cg)
     
   }
   else{
     return []
   }
 }
 const[test,setTest]=useState(jsData())
  
  
  
  axios.defaults.withCredentials=true
  
  const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      await setUserData({...res.data.userInfo})
    }catch(error){
      console.log(error)
    }
    }
  
  const FindOrder=async()=>{
    
    try{
      setIsSuccess(false)
   const res=await axios.get(`http://localhost:3000/products/singleorder/${id}`)
if(res.data){
  setIsSuccess(true)
      await setCart(res.data.singleOrder)
      await setTest(res.data.singleOrder.order)
await localStorage.setItem("cart",JSON.stringify(test))
setClod(true)
}
    }catch(error){
      setClod(false)
      
    }
  }

  
  const[Active,setActive]=useState("")
  const dispatch=useDispatch()
  
  let subTotal=test.reduce((total,items)=>total+items.qty*items.price,0)
  
 const removeItems=async(items,index)=>{
   try{
     
   setActive(items._id)
   let okk;
   setTimeout(async()=>{
   
      //dispatch(removeFromCart(items._id))
      setTest(
       okk= test?.filter(val=>val._id!==items._id)
        )
     let subAll=okk.reduce((total,items)=>total+items.qty*items.price,0)
        const newOrder={order:okk,subTotal:subAll,userDetails:userData}
        if(test.length ===1){
          await deleteOrder()
        }
        else{
 const res= await axios.put(`http://localhost:3000/products/orders/${id}`,newOrder)
    toast.success("Items delete successfully")
        }
   
   },1200)
 
   }catch(error){
     toast.error(error.response.data.message)
   }
 }
 
 const UpdateOrder=async()=>{
   try{
     const newOrder={order:test,subTotal:subTotal,userDetails:userData}
    const res= await axios.put(`http://localhost:3000/products/orders/${id}`,newOrder)
     toast.success("Order update successfully")
     
  //await dispatch(getOrder(res.data.orderData))
  // dispatch(addToCart("null"))
  navigate("/orders")
   }catch(error){
     toast.error(error.response.data.message)
   }
 }
 const incQty=async(ii)=>{
   let okk;
 
      setTest(
  okk=test.map((vale)=>{
       if(vale._id===ii){
       return {...vale,qty:vale.qty+1}
       }
      return vale
     })
     )
     let subAll=okk.reduce((total,items)=>total+items.qty*items.price,0)
     const newOrder={order:okk,subTotal:subAll,userDetails:userData}
    const res=await axios.put(`http://localhost:3000/products/orders/${id}`,newOrder)
    
 }
 const decQty=async(ii)=>{
   try{
     
     
   let okk;
 setTest(
  okk= test.map((val)=> val._id===ii ?{...val,qty:val.qty-1} :val)
  ) 
  let subAll=okk.reduce((total,items)=>total+items.qty*items.price,0)
     const newOrder={order:okk,subTotal:subAll,userDetails:userData}
   
    const res=await axios.put(`http://localhost:3000/products/orders/${id}`,newOrder)
  localStorage.setItem("cart",JSON.stringify(test))
     
   }catch(error){
     console.log(error)
   }
 }
  
  const deleteOrder=async()=>{
    try{
      const res=await axios.delete(`http://localhost:3000/products/orders/${id}`)
      console.log(res.data)
      navigate("/orders")
  // await FindOrder()
     toast.success(res.data.message)
    }catch(error){
      toast.error(error.response.data.message)
    }
    
  }
 
 useEffect(()=>{
 callApi()
   FindOrder()
   
 },[])
  
  
  return clod &&(
    <div className="mx-2 box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-20">
      {
        test.length ? <h1>{invoice}</h1>:""
      }
        { test.length ? <h1>HERE IS YOUR ALL CART ITEMS</h1>:<h1 className="animate-pulse">THE CART IS EMPTY</h1>}
      <div className="cae md:w-[75%] md:mx-auto grid gap-3 p-5 px-2 md:mb-3">
        {
           test?.map((val,index)=>{
            return <div key={index} className={val._id === Active ? "translate-x-[400px] duration-[1.2s] ease-out grid grid-cols-4 md:mb-3" : " grid grid-cols-4 bg-pink-600 rounded-3xl md:mb-3"}>
         <div className="col-span-2 flex gap-4 ">
           <img src={val.image} className="w-20 h-20 md:w-32 md:h-32 rounded-3xl" />
           <div className="content-center uppercase font-bold font-serif">
           <ul className="text-[10px] space-y-1 text-white md:text-3xl">
             <li>{val.name}</li>
             <li>{val.category}</li>
             <li>{val.price}</li>
           </ul>
         </div>
         </div>
         
         <div className="flex items-center gap-1.5 text-center">
          <CiCirclePlus onClick={()=>{incQty(val._id)}} className="text-2xl" />
           <p className="w-7 h-7 border-amber-500
           border-2 border-solid bg-white rounded-3xl text-[13px] content-center">{val.qty}</p>
           <CiCircleMinus onClick={()=> val.qty > 1 ? decQty(val._id) : removeItems(val,index)} className="text-2xl" />
          </div>
         
         <div className="flex items-center gap-3 justify-end px-3 text-2xl">
          <div>
         <p>{val.qty * val.price}</p>
         </div>
           <div className="text-white"><button onClick={()=>removeItems(val,index)}><RxCrossCircled /></button>
           </div>
         </div>
         
            </div>
          })
        }
      </div>
    {test?.length > 0 ? <div>
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
<div onClick={()=>UpdateOrder()} className="bg-indigo-800 w-[80%] p-2 mx-auto rounded-3xl mt-3 text-white font-bold">UPDATE-ORDER</div>
    </div>:""
     }

    </div>
    )
}