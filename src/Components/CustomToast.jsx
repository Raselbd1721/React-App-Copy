

import React,{useState,useEffect} from "react"
import { FaCircleCheck } from "react-icons/fa6";
import {useDispatch,useSelector } from "react-redux";
import {setToast} from "../Components/EcomReducer.jsx";
export function CustomToastSuccess(){

const dispatch=useDispatch()
const {category,cart,allCategory,tCat,login,myToast}=useSelector((state)=>state.EcomReducer)

setTimeout(()=>{
  dispatch(setToast(""))
},1200)

  return myToast &&(
<div>
 <div className=" cae text-center text-white px-3 z-30 fixed top-20 w-full h-fit">
  <div className="bg-[rgba(55,81,11,0.982)] flex w-fit py-2 text-[20px] rounded-3xl px-3 translate-x-[-50%]">
   <p className="px-1 py-1"><FaCircleCheck /></p>
    <h3 className="px-1">{`${myToast} Add to cart`}</h3>
    </div>
    </div>
  </div>
  ) 
}
