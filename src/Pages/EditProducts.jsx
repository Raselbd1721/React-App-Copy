
import React,{useState,useEffect} from "react"
import {Link,useLocation,useNavigate} from "react-router-dom"
import toast,{Toaster} from 'react-hot-toast';
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios'

export default function EditProducts(){
  axios.defaults.withCredentials=true
 
 const limitSize=2097152;
  const acceptType=["image/jpg","image/png","image/jpeg","image/webp"]
  const navigate=useNavigate()
  const location=useLocation()
  const {_id,category}=location.state
  const [singlePro,setSinglePro]=useState({name:"",price:0,desc:"",image:"",category:""})
  const[simage,setSimage]=useState("")
  

    const handleChange=(e)=>{
    setSimage(URL.createObjectURL(e.target.files[0]))
    setSinglePro({...singlePro,image:e.target.files[0]})
    
  }
    
    const updateCategory=async(e)=>{
    e.preventDefault()
    try{
      const formData =new FormData();
      
      if(singlePro.image.type){
      if(!acceptType.includes(singlePro.image.type)){
        return toast.error("except Image other files not allowed")
      }
      formData.append('image', singlePro.image)
      }
      const response = await fetch(singlePro.image);
      const blob = await response.blob();

      if(singlePro.image.size > limitSize){
        return toast.error("Maximum file size 2 megabytes")
      }
      if(!singlePro.image.type){
      if(!acceptType.includes(blob.type)){
        return toast.error("except Image other files not allowed")
      }
      formData.append('image', blob,"image/jpg")
      }
      
    formData.append("name",singlePro.name)
    formData.append("price",singlePro.price)
 formData.append("desc",singlePro.desc)
 formData.append("category",singlePro.category)

      const res=await axios.put(`http://localhost:3000/products/app/${_id}`,formData)
    setSimage("")
    setSinglePro({name:"",price:0,desc:"",image:"",category:""})
    await toast.success("Product update successfully")
   await navigate("/products")
    }catch(error){
      
      toast.error(error.response.data.message[0])
      
    }
    await callApi()
  }
    
    
  
  const callApi=async()=>{
    try{
      const res=await axios.get(`http://localhost:3000/products/findproduct/${_id}`)
   const data=await res.data.singleProduct
  await console.log(data)
  await setSinglePro({name:data.name,price:data.price,desc:data.desc,category:data.category,image:data.image})
    setSimage(data.image)
    }catch(error){
     toast.error(error.response.data.message[0])
    }
  }
  useEffect(()=>{
    callApi()
  },[])
  
  return(
    <div className="mx-2 box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10 text-center">
      <h1>this is Edit Product page</h1>
      <h1>Product ID: {_id}</h1>
  <div className="">
  <div className="text-center border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 shadow-[3px_5px_5px_gray] transform transition ease-in duration-500 hover:scale-110 w-[330px] md:w-[450px] mx-auto px-1 mt-10 mb-7">

              <h1 className="text-3xl text-center text-amber-600 pb-4">Product Data</h1>
<form onSubmit={updateCategory}>
    <div className="flex justify-between pr-1 pt-6 relative">
        
        <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="description">*Product</label>
      <input type="text" placeholder="Product name" name="product" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-[66%] hover:border-pink-600" required value={singlePro.name} onChange={(e)=>setSinglePro({...singlePro,name:e.target.value})} />
   
       <label className="top-[-3px] right-12 md:right-20 absolute text-green-900 font-bold" for="price">*Price</label>
      <input type="number" placeholder="price" name="price" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-[32%] hover:border-pink-600" required 
      value={singlePro.price > 0 && singlePro.price} onChange={(e)=>setSinglePro({...singlePro,price:e.target.value})} />
      </div>
  
  <div className="relative pt-6 w-[99%]">
    <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="description">*Description</label>
<input type="text" placeholder="Product description" name="description" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-full hover:border-pink-600" value={singlePro.desc} onChange={(e)=>setSinglePro({...singlePro,desc:e.target.value})} required/>
</div>
 <div className="flex justify-between inline w-full pt-6 relative">
<div className="w-[65%]">
      <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="Catagory">*Category</label>
         <select type="text" placeholder="Catagory name" name="category" className="p-2 border-2 border-solid border-gray-200 bg-white rounded-lg mb-2 w-full hover:border-pink-600" value={singlePro.category} onChange={(e)=>setSinglePro({...singlePro,category:e.target.value})}>
           {category?.map(opt=>(<option>{opt.name}</option>))}
         </select>
         </div>
         <div className="">
  <div className="flex py-3 px-1 rounded-xl mr-1 bg-pink-600 inline-block">
<label className="top-[-3px] right-10 absolute text-green-900 font-bold" for="image">*Image</label>

        <label for="img-input" className=" text-white text-[12px] text-center">Select image</label> <span className="ml-1"><FaCaretDown /></span>
        </div>

        <input type="file" accept="image/jpg,image/jpeg,image/png,image/webp" id="img-input" name="file" className="hidden" onChange={(e)=>handleChange(e)} />
        
      </div>
      </div>
     {singlePro.image && <div className="my-3 flex justify-center">
     <img src={simage} className="w-[150px] h-[120px] rounded-3xl"/>
     </div>}

      
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white px-8 text-2xl" type="submit">Submit</button>
</form><br/>
</div>

      </div>
  
  
      </div>
    )
}