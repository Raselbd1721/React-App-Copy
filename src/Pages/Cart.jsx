
import React,{useState,useEffect} from "react"
import {useDispatch,useSelector } from "react-redux";
import { Outlet, Link,useNavigate } from 'react-router-dom'
import {setNavi,removeFromCart,incQty,decQty,getOrder,addToCart,setLoadings} from "../Components/EcomReducer.jsx";
import { CiCirclePlus,CiCircleMinus} from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import "../Components/Op.css"
import toast from 'react-hot-toast';

import axios from 'axios'

export default function Cart(){
  const[clod,setClod]=useState(false)
  
  const navigate=useNavigate()
  
const [first,setFirst]=useState(false)
  const {cart,order}=useSelector((state)=>state.EcomReducer)
  let subTotal;
  const[Active,setActive]=useState("")
  const[userData,setUserData]=useState({})
  
  const dispatch=useDispatch()
  
 const removeItems=(items,index)=>{
   setActive(items._id)
   setTimeout(()=>{
      dispatch(removeFromCart({id:items._id,userId:userData.id}))
      console.log({id:items._id,userId:userData.id})
 },1200)
 }
 
 
 axios.defaults.withCredentials=true
 const checkout=async()=>{
   try{
     
     const newOrder={order:cartData,subTotal:subTotal,userDetails:userData}
    const res= await axios.post("http://localhost:3000/products/createOrder",newOrder)
     
     
  await dispatch(getOrder(res.data.orderData))
   dispatch(addToCart({userId:userData.id,val:"null"}))
   navigate("/orders")
   toast.success("Order Place Successfully")
   }catch(error){
     toast.error(error.response.data.message)
   }
 }
   const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      await setUserData({...res.data.userInfo})
      setClod(true)
    }catch(error){
      console.log(error)
      setClod(false)
    }
    }
    const cartData=cart?.filter((data)=>data.userId === userData.id) 
    
 useEffect(()=>{
   callApi()
},[])
 
 
  
  return clod &&(
    <div className="mx-2 max-w-[100%] box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-20">
        { cartData.length > 0 ? <h1>HERE IS YOUR ALL CART ITEMS</h1> : <h1 className="animate-pulse">THE CART IS EMPTY</h1>}
    <div className="cae grid gap-3 p-5 px-2">
        {
        cartData?.map((val,index)=>{
            return <div key={index} className={val._id === Active ? "translate-x-[400px] duration-[1.2s] ease-out grid grid-cols-4" : " grid grid-cols-4 bg-pink-600 rounded-3xl"}>
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
          <CiCirclePlus onClick={()=>dispatch(incQty({id:val._id,userId:userData.id}))} className="text-2xl" />
           <p className="w-7 h-7 border-amber-500
           border-2 border-solid bg-white rounded-3xl text-[13px] content-center">{val.qty}</p>
           <CiCircleMinus onClick={()=> val.qty > 1 ? dispatch(decQty({id:val._id,userId:userData.id})) : removeItems(val,index)} className="text-2xl" />
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
    {cartData.length > 0 ? <div>
    <div>
      <hr className=" border-b-0 border-[8px] border-amber-900 w-[94%] mx-auto rounded-3xl"/>
      </div>
      <div className="grid grid-cols-3 gap-3 py-3 items-center">
      <div className="col-span-2 text-right text-2xl">
        <h1>SUBTOTAL</h1>
      </div>
      <div className="text-center text-3xl" >
     <p>${ 
      subTotal=cart.reduce((total,items)=>{
        if(items.userId === userData.id){
        return total+(items.price*items.qty)
        }
        return total
      },0)
       }</p>
      </div>
      </div>
<div onClick={()=>checkout()} className="bg-indigo-800 w-[80%] p-2 mx-auto rounded-3xl mt-3 text-white font-bold">CHECK–OUT</div>
    </div>:""
     }

    </div>
    )
}