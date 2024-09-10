

import React,{useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
//mport {CustomToast} from "../Components/CustomToast.jsx"
import {setNavi,removeFromCart,incQty,decQty,getOrder,addToCart,setLoadings} from "../Components/EcomReducer.jsx";
import toast,{Toaster} from 'react-hot-toast';
//import { toast, ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { ImSpinner3 } from "react-icons/im";
import Paginations from "../Pages/Paginations.jsx"

import "../Components/Op.css"

import axios from 'axios'

export default function Orders(){
  const[clod,setClod]=useState(false)
  const dispatch=useDispatch()
  const {order}=useSelector(state=>state.EcomReducer)
  const[orderData,setOrderData]=useState([])
  const [todo,setTodo]=useState("")
  const [search,setSearch]=useState("")
 const[totalPage,setTotalPage]=useState(0)
  const[currentPage,setCurrentPage]=useState(1)
  const[userData,setUserData]=useState({})
  axios.defaults.withCredentials=true
  
  const handleSub=(e)=>{
 e.preventDefault()
setSearch(todo)
}
const handleSearch=(e)=>{
     setTodo(e.target.value);
     if(e.target.value==""){
     setSearch("")
     }
}


  const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      await setUserData({...res.data.userInfo})
    }catch(error){
      console.log(error)
    }
    }
  const findUser=async()=>{
    try{
      const userRes=await axios.get('http://localhost:3000/products/islogin')
      await setUserData({...userRes.data.userInfo})
      await setID(userRes.data.userInfo.id)

    }catch(error){
      console.log(error)
    }
    }

  const deleteOrder=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:3000/products/orders/${id}`)
     await getOrder()
     toast.success(res.data.message)
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  
  
  const getOrder=async()=>{
    try{
      
   const res=await axios.get(`http://localhost:3000/products/orders?page=${currentPage}&&search=${search}`)
   await setOrderData(res.data.allOrder)
   await setTotalPage(res.data.totalPage)
   setClod(true)
   
}catch(error){
      setClod(false)
      
    }
  }
  
  useEffect(()=>{
      getOrder()
    callApi()
  },[currentPage,search])
  
  return clod &&(
    <div className="mx-2 box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10">
      <h1 className="mb-5 font-bold">this is Orders page</h1>
      <div className="text-center border-2 border-blue-600 border-solid rounded-3xl  shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] mx-auto">
      <form onSubmit={handleSub}>
<input type="text" placeholder="Search by User/Invoice etc.." name="search" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg my-1 mt-5" value={todo} onChange={(e)=>handleSearch(e)} required />
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " type="submit">Search Order</button>
</form><br/>
      </div>
      
      <div className="mt-8 flex flex-col gap-3" >
        {
          orderData?.map((val,index)=>{
          const {_id,subTotal,order,userDetails,invoice}=val
            return <div key={_id} className="w-[95%] md:w-[60%] odd:bg-emerald-200 even:bg-pink-200 mx-auto border-s-4 border-s-orange-500 rounded-r-3xl shadow-[8px_5px_3px_rgba(92,80,58,0.868)] md:mb-3">
              <ul className="flex gap-5 justify-center md:justify-between text-black p-3 md:px-5">
            {userData.role==="admin" ? <div className="flex gap-5">
               <li>{invoice.slice(-6)}</li>
   <li>{userDetails.email.substring(0,4)+"..."}</li></div> : <div className="flex gap-5"><li>{index+1}</li>
     <li>{invoice.slice(-8)}</li></div>}
     
      <li>{val.subTotal}</li>
      
                <Link to={`/updateOrder/${val._id}`} state={{_id,subTotal,order,userDetails,invoice}}><li onClick={()=>console.log(val._id)} className="text-blue-800 font-bold">Edit</li></Link>
            <li onClick={()=>deleteOrder(val._id)} className="text-red-900 font-bold"> Delete</li>
            <Link to={`/showorder/${val._id}`} state={{_id,subTotal,order,userDetails,invoice}}> <li className="text-blue-800 underline font-bold">View</li>         </Link>
              </ul>

            </div>

          })
        }
      </div>
       <div className="flex justify-center items-center">
     { orderData.length > 0 ? <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />: <span className="animate-spin text-4xl text-pink-500"><ImSpinner3 /></span>}
      </div>
    </div>
    )
}