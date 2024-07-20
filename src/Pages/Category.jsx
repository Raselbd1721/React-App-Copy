
import React,{useState,useEffect,useRef} from "react"
import { Outlet, Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector } from "react-redux";
//import {getCategory} from "../Components/EcomReducer.jsx"
import {getCategory,selCategory,getCat} from "../Components/EcomReducer"
import { RxCrossCircled } from "react-icons/rx";
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { MdAddLink } from "react-icons/md";
import Paginations from "../Pages/Paginations.jsx";

import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios'
import "../Components/Op.css"

export default function Category(){
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const setRef=useRef()
  
  const {category,allCategory,tCat}=useSelector((state)=>state.EcomReducer)
  
  
  const limitSize=2097152;
  const acceptType=["image/jpg","image/png","image/jpeg","image/webp"]
  
  const[formCon,setFormCon]=useState(false)
  const[clod,setClod]=useState(false)
  const [image,setImage]=useState("")
  const [name,setName]=useState("")
  const [blo,setBlo]=useState({})
  const [userData,setUserData]=useState({})
  const[modalData,setModalData]=useState({})
  const [showModal,setShowModal]=useState(false)
  const [simage,setSimage]=useState("")
  const [update,setUpdate]=useState({cond:false,id:""})
  const [search,setSearch]=useState("")
 const[totalPage,setTotalPage]=useState(0)
 const[totalProduct,setTotalProduct]=useState("")
  const[currentPage,setCurrentPage]=useState(1)
  const [todo,setTodo]=useState("")
  const [data,setData]=useState([])
  const [current,setCurrent]=useState("")

  
        axios.defaults.withCredentials=true
        
 const callUser=async()=>{
    try{
      const res=await axios.get('https://ecommerce-app-5dnf.onrender.com/products/islogin')
      await setUserData({...res.data.userInfo})
     
    }catch(error){
      console.log(error)
    
    }
    }
        
   const closeMoal=(e)=>{
   if(setRef.current == e.target){
     setShowModal(false)
   }
  }
 const numberOfProducts=async(val)=>{
    try{
      //setSearch(val.name)
    const res=await axios.get(`https://ecommerce-app-5dnf.onrender.com/products/app?page=${currentPage}&&search=${val.name}`)
    console.log(res.data.actualTotal)
    if(val.name === "All"){
   return await setTotalProduct(res.data.actualTotal)
    }
     await setTotalProduct(res.data.totalProducts)
     
    }catch(error){
     console.log(error)
    }
  }    
  const callApi=async()=>{
    try{
      const res=await axios.get(`https://ecommerce-app-5dnf.onrender.com/products/category?limit=5&&page=${currentPage}&&search=${search}`)
   setClod(true)
     await setData(res.data.allCategory)
     await setTotalPage(res.data.totalPage)
    }catch(error){
      setClod(false)
    }
  }
  const handleChange=(e)=>{
    
    setImage(URL.createObjectURL(e.target.files[0]))
    setSimage(e.target.files[0])
    
  }
  
    const handleSearch=()=>{
     setSearch(todo)
     setTodo("")
}
  
  const handleSub=async()=>{
    try{

      if(simage.size > limitSize){
        return toast.error("Maximum file size 2 megabytes")
      }
      if(!acceptType.includes(simage.type)){
        return toast.error("except Image other files not allowed")
      }
      const formData =new FormData();
 formData.append("name",name)
 formData.append("image",simage)
   
     const res=await axios.post("https://ecommerce-app-5dnf.onrender.com/products/createCategory",formData)
   const newData= await res.data
     await setData([...data,newData])
     setName("")
   setImage("")
   setSimage("")
     
      toast.success("Category created Successfully")
   
    }catch(error){
      console.log(error.message)
      toast.error(error.response.data.message[0])
    }
  await callApi()
  }
  const getReady=()=>{
    setUpdate({cond:false,id:""})
    setImage("")
    setName("")
    setSimage("")
  }
  
  const deleteCategory=async(id)=>{
    try{
      const res=await axios.delete(`https://ecommerce-app-5dnf.onrender.com/products/category/${id}`)
      toast.success(res.data.message)
      
    }catch(error){
      toast.error(error.response.data.message[0])
    }
    await callApi()
  }
 
  const editById =async(id)=>{
    try{
      setUpdate({cond:true,id:id})
      const res=await axios.get(`https://ecommerce-app-5dnf.onrender.com/products/singlecategory/${id}`)
      const data=await res.data.singleCategory
      await setSimage(data.image)
     setName(data.name)
      setImage(data.image)
      setFormCon(true)
 toast.success(res.data.message)
    }catch(error){
      toast.error(error.response.data.message[0])
    }
  }
  
  
  const updateCategory=async()=>{
 
    try{
      const formData =new FormData();
      
      if(simage.type){
      if(!acceptType.includes(simage.type)){
        return toast.error("except Image other files not allowedhh")
      }
      formData.append('image', simage)
      }
      const response = await fetch(simage);
      const blob = await response.blob();

      if(simage.size > limitSize){
        return toast.error("Maximum file size 2 megabytes")
      }
      if(!simage.type){
      if(!acceptType.includes(blob.type)){
        return toast.error("except Image other files not allowed")
      }
      formData.append('image', blob,"image/jpg")
      }
      
    
      
    formData.append("name",name)
    

    
      const res=await axios.put(`https://ecommerce-app-5dnf.onrender.com/products/category/${update.id}`,formData)
      
      setUpdate({cond:false,id:""})
    setImage("")
    setSimage("")
    setName("")
    toast.success(res.data.message)
    }catch(error){
      toast.error(error.response.data.message[0])
      
    }
    await callApi()
  }
  
  const showItems=(val)=>{
    setModalData({...val})
    
    dispatch(selCategory({name:val.name,category:""}))
dispatch(getCategory(val.name))
if(val.name==="All"){
      dispatch(getCategory(""))
    }

    navigate("/home")
  }
  
  useEffect(()=>{
    callApi()
    callUser()
  
  },[search,currentPage])
  
  return userData.role&&(
    <div className={`${data.length > 0 ? "mx-2 max-w-[400px] box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-24":"mx-2 max-w-[400px] box-border bg-gray-200 mt-14 text-center font-serif pb-6"}`}>
            <h1 className="mb-4 font-bold">this is category page</h1>
      
      <div className="my-1">
        <input type="text" placeholder="Category Search here" name="search" className="p-2 border-2 border-solid hover:border-pink-600 outline-none rounded-lg mb-2 w-[75%]" value={todo} onChange={(e)=>{setTodo(e.target.value);setSearch("");}} required/>
        <button onClick={()=>handleSearch()} className="bg-pink-500 text-white rounded-2xl p-2 ml-2">Submit</button>
      </div>
{userData.role=="admin" ? <div>
              {
        formCon ? <div onClick={()=>setFormCon(false)} className="flex justify-center bg-pink-600 py-1 px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl mt-4 mb-8 transform transition ease-in duration-400 hover:scale-110">
   <button>Hide Below Form</button><span className="text-4xl text-gray-800 animate-bounce"><FaCaretUp /></span>
        </div>
        :
        <div onClick={()=>setFormCon(true)} className="flex justify-center bg-green-700 py-1  px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl my-4 mb-10 transform transition ease-out duration-400 hover:scale-100">
   <button>Add New Category</button><span className="text-4xl text-yellow-500 animate-bounce"><MdAddLink className="pl-2" /></span>
        </div>
}
      
    {update.cond ? <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white mb-5" onClick={ ()=>getReady()}>Create Category</button>:""}
    
    { formCon && <div className="py-4 mb-8 border-2 border-blue-600 border-solid rounded-3xl mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[350px] mx-auto">
    
         <div className="flex justify-between">
           <div className="ml-1">
             <input type="text" placeholder="category name" name="name" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2" required value={name} onChange={(e)=>setName(e.target.value)}/>
           </div>
         <div className="">
         <div className="flex inline bg-pink-600 py-3 px-1 rounded-xl mr-1">
         
        <label for="img-input" className=" text-white text-[12px] text-center">Select image</label> <span className="ml-1"><FaCaretDown /></span>
        </div>
        <input type="file" accept="image/jpg,image/jpeg,image/png,image/webp" id="img-input"  name="file" className="hidden" onChange={(e)=>handleChange(e)}/>
      </div>
            </div>
           {image && <div className="my-3 flex justify-center">
     <img src={image} className="w-[150px] h-[120px] rounded-3xl"/>
     </div>}
      
      {update.cond ? <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-indigo-950 text-white" onClick={ ()=>updateCategory()}>Update Category</button> :<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " onClick={ ()=>handleSub()}>Create Category</button>}
      
      </div>}

      
      
      <div className="mt-5 flex flex-col gap-4 mb-14" >
        {
          data?.map((val,index)=>{
          const {_id,name,image}=val
            return <div className="w-[90%] odd:bg-emerald-200 even:bg-pink-200 mx-auto border-s-4 border-s-orange-500 rounded-r-3xl shadow-[8px_5px_3px_rgba(92,80,58,0.868)]" onClick={()=>{numberOfProducts(val);setShowModal(true);setModalData({...val})}}>
              <ul className="flex gap-1 justify-between text-black p-3">
             <li> <img src={val.image} className="w-[35px] h-[35px] rounded-3xl my-[-5px]" /></li>
          
                <li className="underline">{val._id.slice(-9)}</li>
                <li>{val.name}</li>
                <li onClick={()=>editById(val._id)} className="text-blue-800 font-bold">Edit</li>
            <li onClick={()=>deleteCategory(val._id)} className="text-red-900 font-bold"> Delete</li>
            {/*}<Link to={`/showorder/${val._id}`} state={{_id,name,image}}> <li className="text-blue-800 underline font-bold">View</li>         </Link>*/}
              </ul>

            </div>

          })

        }
      </div>
      </div>:<div className="w-full h-full flex flex-wrap gap-2 justify-center items-center mt-8 mb-6">
        {
          data?.map((val,index)=>{
          const {_id,name,image}=val
          
           return <div key={index} className="bg-amber-400 w-[30%]  mb-3 rounded-2xl pb-5" onClick={()=>showItems(val)}>
             <p>{val.name}</p>
        <img src={val.image} className="w-full h-36" alt={val.name}/>
        
           </div>
          })
        }
      </div>}
          { showModal && <div ref={setRef} onClick={(e)=>closeMoal(e)} className=" text-center font-serif w-[400px] backdrop-blur-md fixed inset-0 z-20 h-full flex justify-center items-center mt-14" >
<div className="w-[400px] h-fit mb-32">
      <div className="text-center py-1 border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] h-[340px] mx-auto">
       <div className="flex justify-end m-1">
      <RxCrossCircled onClick={()=>setShowModal(false)} className="bg-pink-600 text-white text-3xl rounded-3xl" /></div>
      
       <h1 className="text-2xl text-center text-amber-600 pb-4 mt-[-20px] underline">Product information</h1>
     <div className=" font-bold text-emerald-950">
       <img className="w-44 h-40 rounded-3xl mx-auto mb-5 " src={modalData.image} />
     <h1 className="mb-1">Category Name → {modalData.name}</h1>
     
     <h1 className="mb-1">Total Products in this Category <span className="font-bold text-pink-600 text-2xl">→{totalProduct}</span></h1>

     </div>
      </div>
      </div>
      </div>}
      
      
  <div className="flex justify-center items-center">
     { data.length > 0 ? <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />: <span className="animate-spin text-4xl text-pink-500 mt-[-40px]"><ImSpinner3 /></span>}
      </div>
    </div>
    )
}