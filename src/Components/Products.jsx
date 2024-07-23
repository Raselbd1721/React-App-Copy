
import React,{useState,useEffect,useRef} from "react"
import {ProductData} from "../Data/ProductData.jsx"
import { useFetchUserQuery } from '../Components/CallApi.jsx'
//import CustomToast from "../Components/CustomToast.jsx"
import { ImSpinner3 } from "react-icons/im";
import "../Components/Op.css"
import Paginations from "../Pages/Paginations.jsx"
import MyComponent from "../Pages/MyComponent.jsx"
import {addToCart} from "./EcomReducer";
import {useDispatch,useSelector } from "react-redux";
import {getCategory,selCategory,getCat,setToast} from "./EcomReducer"
import SucesssRes from "../Pages/SucesssRes.jsx"
import {CustomToastSuccess} from "../Components/CustomToast.jsx"
//import {testre} from "../Components/CustomToast.jsx"
import toast from 'react-hot-toast';
import "../Components/Op.css"
import axios from 'axios'


const Products=()=>{
  
  const [toastId,setToastId]=useState([])
  const [current,setCurrent]=useState("")
  const [search,setSearch]=useState("")
 const[totalPage,setTotalPage]=useState(0)
  const[currentPage,setCurrentPage]=useState(1)
const customId="hggsgsgsgfs"
const [data,setData]=useState([])
  const[userData,setUserData]=useState({})
  
const {category,cart,allCategory,tCat,login,myToast}=useSelector((state)=>state.EcomReducer)

const SelRef=useRef()
  const dispatch=useDispatch()
//const {refetch,data,error}=useFetchUserQuery()
  
        axios.defaults.withCredentials=true
  const callApi=async()=>{
    try{
      
      const res=await axios.get(`https://ecommerce-app-5dnf.onrender.com/products/app?page=${currentPage}&&search=${category}`)
     //const newData=await res.json()
     await setTotalPage(res.data.totalPage)
     await setData(res.data.allProducts)
    if(allCategory.name!=="All" && allCategory.category!==""){
       dispatch(getCat(res.data.allProducts))
       console.log("yes you csn do")
     }
    }catch(error){
    // toast.error(error.response.data.message)
    console.log(error)
    }
  }

     /*
     const dal=data?.filter((val)=>{
        if(allCategory.category==="All"){
         if( val.name.toLowerCase().includes(category.toLowerCase()) || val.price.toString().includes(category.toString())){
           return val
         }
        }
        else{
        return val.category.toLowerCase()===allCategory.category.toLowerCase()
        }
      })
      */
      
const addCart=(val)=>{
  dispatch(addToCart({...val,userId:userData.id}))
  dispatch(setToast(val.name))
setCurrent(val._id)
setTimeout(()=>{
  setCurrent("")
},1300)
//toast.success(`${val.name} Added to Cart`)
}

const callUser=async()=>{
    try{
      const res=await axios.get('https://ecommerce-app-5dnf.onrender.com/products/islogin')
      await setUserData({...res.data.userInfo})
     
    }catch(error){
    console.log(error)
    }
    }
   

  useEffect(()=>{
    callApi()
    callUser()
    //console.log(SelRef.current)
  },[currentPage,category])
  
  return(
  
    <div className="py-6 flex flex-col gap-8 justify-center items-center max-w-[400px] mb-20">

<div> {myToast&& <CustomToastSuccess />}</div>
      {
/* <CustomToast val={current} />*/
   data=="" ? <div>This Item not found</div> : data?.map((val)=>{
    return <div key={val._id} className="w-[360px] h-[360px] bg-blue-200 text-center overflow-hidden rounded-2xl font-serif pb-12 transition transform ease-in-out duration-1000 hover:scale-110 shadow-[8px_5px_3px_rgba(92,80,58,0.868)]">
              <p className="mt-1 text-2xl text-[rgb(207,56,29)]">{val.desc}</p>
            <div className=" w-[100%] h-[62%] content-center">

              <img src={val.image} className="w-[280px] h-[180px] rounded-2xl mx-auto"/>
            </div>
            <div className="flex flex-row justify-between text-[25px] px-10 ">
            <div><p className="text-green-800 uppercase">{val.name}</p></div>
            <div><p className="">${val.price}</p></div>
          </div>
          <div className>

        {current === val._id ? <button className="font-semibold mt-2 text-center inline-block w-[80%] text-white py-2 rounded-3xl bg-amber-800">Wait...<p className="inline-block ml-5 animate-spin text-white text-[18px]"><ImSpinner3 /></p></button> :<button className="font-semibold mt-2 text-center inline-block bg-pink-600 w-[80%] animate-bounce text-white py-2 rounded-3xl" onClick={()=>addCart(val)}>ADD TO CART</button>
        }
          </div>
  
          </div>
  })

      }
     { data.length > 0 ? <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} /> : <span className="animate-spin text-4xl text-pink-500"><ImSpinner3 /></span>}
      
      {/*
       main.map(bal=>(
       <div>
         <p>{bal.name}</p>
         {bal.ar.map(val=>{
        return <div>
          <p>{val.name}</p>
          </div>
        })}
       </div>) )  
      */}
 </div>
 
    )
}
export default Products