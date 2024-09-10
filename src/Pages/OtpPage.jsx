

import React,{useState,useEffect,useRef} from "react"
import { useLocation,useNavigate } from 'react-router-dom';
import {setLs,RemoveLs,getLs,callIslogin} from "../Helper/HelperLs.jsx";

import toast from 'react-hot-toast';
import "../Components/Op.css"
import axios from 'axios'


export default function OtpPage(){
  
  const selRefs=useRef([])
  const navigate=useNavigate()
  const location = useLocation();
  const {otp,length}=location.state || {otp:"",length:0}
  const[secretKey,setSecretKey]=useState("")
  
  const [inp, setInp] = useState(new Array(length).fill(""));
  
  
  const callApi=async()=>{
    try{
      const res=await callIslogin({action:"get",url:"https://ecommerce-app-5dnf.onrender.com/products/islogin"})
     //setIsLoading(false)
    }catch(error){
      //setIsLoading(true)
toast.error(error.response.data.message)
    }
  }
  

  
const handleSubmit=async(e)=>{
 try{
  e.preventDefault()
<<<<<<< HEAD
  
   const res=await axios.post("http://localhost:3000/products/checkotp",{secretKey})
=======
   const res=await axios.post("https://ecommerce-app-5dnf.onrender.com/products/checkotp",{secretKey},{
     headers: {
            "Authorization": `Bearer ${getLs("userPostInfo")}`
        }
   })
   
>>>>>>> origin/main
   await toast.success(res.data.message)
await RemoveLs("userPostInfo")
   await navigate("/users")
 }catch(error){
   toast.error(error.response.data.message)
  await callApi()
  console.log(error.response.data)
  console.log(secretKey)
 }
}


const handleClick=(index,val)=>{
  if(index < length && inp[index]!==""){
    selRefs.current[index].focus()
selRefs.current[index].setSelectionRange(1,1)
  return
  }
  if(selRefs.current[inp.indexOf("")]){
  return selRefs.current[inp.indexOf("")].focus()
 
  }
}


const handleChange=(e,index)=>{
  const val=e.target.value
 
 if(val && index < length-1 && selRefs.current[index+1]){
   selRefs.current[index+1].focus()
 }
  const takeInp=[...inp]
  takeInp[index]=val.substring(val.length-1)
  setInp(takeInp)
  setSecretKey(takeInp.join(""))
}

  useEffect(() => {
    if(selRefs.current[length]){
     return selRefs.current[length].focus()
    }
    if(selRefs.current[inp.indexOf("")]){
  return selRefs.current[inp.indexOf("")].focus()
  }
 
callApi()
  }, [])
  
  
  return(
     <div className="mx-2 max-w-[400px] box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10">
   {otp?<h1 className="mb-5">this is Otp:{otp}</h1> : <h1 className="mb-5">this is Otp Page</h1>}
<div>
  <form onSubmit={handleSubmit}>
  {inp?.map((val,index)=>{
         return <input key={index} type="text" className="p-2 border-2 border-solid border-pink-700 outline-gray-900 rounded-lg mb-2 w-[10%] ml-2 text-center font-bold" value={val}
         onClick={()=>handleClick(index,val)}
         onChange={(e)=>handleChange(e,index)}
         ref={(input)=>(selRefs.current[index]=input)}
        required />
       
  })}
  <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white px-8 text-2xl" type="submit">Submit</button>
  </form>
</div>

     </div>
    )
}