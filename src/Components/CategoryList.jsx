
import React,{useState,useEffect} from "react"
import {CategoryData} from "../Data/CategoryData.jsx"
import "../Components/Op.css"
import '../App.css'
import { v4 as uuid } from "uuid";
import {useDispatch,useSelector } from "react-redux";
import {getCategory,selCategory,getCat} from "./EcomReducer"
import axios from "axios"

const CategoryList=()=>{
  const dispatch=useDispatch()
  
  const {category,allCategory,tCat}=useSelector((state)=>state.EcomReducer)
  const[clod,setClod]=useState(false)
  
  const sendCat=(val)=>{
    dispatch(getCategory(val.name))
    dispatch(selCategory({name:val.name,category:""}))
    
    dispatch(getCat([]))
    if(val.name==="All"){
      dispatch(getCategory(""))
    }
  }
  const [data,setData]=useState([])
        axios.defaults.withCredentials=true
  const callApi=async()=>{
    try{
      const res=await axios.get("http://localhost:3000/products/category")
     //const newData=await res.json()
     setClod(true)
     await setData(res.data.allCategory)
    }catch(error){
      setClod(false)
      console.log(error)
    }
  }
  useEffect(()=>{
    callApi()
    
  },[tCat])
  
  
  
  return clod &&(
    <div className="flex flex-row overflow-scroll mt-4 p-3 box-border text-center justify-items-center scr-menu w-full">
      {
      //sorting by A to Z
data.sort((a,b)=>a.name.localeCompare(b.name)).map((val,index)=>{

//Add spain by search
 const matchCat=tCat?.some((items)=>items.category===val.name)
 
          return <div key={index}>
          <div className="w-[70px] h-[100px] md:w-[140px] md:h-[200px] md:mx-4">
             <div onClick={()=>sendCat(val)}>
             <img src={val.image}
           className={ (allCategory.name===val.name || category===val.name 
           || matchCat) ? "border-4 md:border-8 border-[rgba(101,237,61,0.93)] rounded-[50%] animate-spin md:w-[130px] md:h-[130px] w-[50px] h-[50px]" : "rounded-[50%] w-[50px] h-[50px] md:w-[130px] md:h-[130px]"}
             />
             
           <p className="py-2 ml-[-14px]">{val.name.split(" ")[0].slice(0,6)}</p>
           </div>
           </div> 
          </div>
        })
      }

    </div>
    
    )
}
export default CategoryList