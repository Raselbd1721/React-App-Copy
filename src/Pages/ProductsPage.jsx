
import React,{useState,useEffect,useRef} from "react"
import {Link} from "react-router-dom"
import { ImSpinner3 } from "react-icons/im";
import "../Components/Op.css"
import Paginations from "../Pages/Paginations.jsx"
import {addToCart} from "../Components/EcomReducer";
import {useDispatch,useSelector } from "react-redux";
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios'

export default function ProductsPage(){
  axios.defaults.withCredentials=true
 
 const dispatch=useDispatch()
 const setRef=useRef()
 const limitSize=2097152;
  const acceptType=["image/jpg","image/png","image/jpeg","image/webp"]
 
  const [data,setData]=useState([])
  const [current,setCurrent]=useState("")
  const[clod,setClod]=useState(false)
  const[formCon,setFormCon]=useState(false)
  const[todo,setTodo]=useState("")
  const[image,setImage]=useState("")
  const[search,setSearch]=useState("")
  const[category,setCategory]=useState([])
  const[simage,setSimage]=useState("")
  const[totalPage,setTotalPage]=useState(0)
  const[currentPage,setCurrentPage]=useState(1)
  const [singlePro,setSinglePro]=useState({name:"",price:0,desc:"",image:"",category:""})
  const[modalData,setModalData]=useState({})
  const[userRole,setUserRole]=useState({})
  const [showModal,setShowModal]=useState(false)
  

  const callCategory=async()=>{
    try{
      const res=await axios.get("https://ecommerce-app-5dnf.onrender.com/products/category")
     await setCategory(res.data.allCategory)
    }catch(error){
      toast.error(error.response.data.message)
    }
  
  }
  const closeMoal=(e)=>{
   if(setRef.current == e.target){
     setShowModal(false)
   }
  }
  
  const addCart=(val)=>{
  dispatch(addToCart(val))
  toast.success(`${val.name} Add to cart`)
setCurrent(val._id)
setTimeout(()=>{
  setCurrent("")
},1300)
//toast.success(`${val.name} Added to Cart`)
}
  
  
  const handleSearch=(e)=>{
     setTodo(e.target.value);
     if(e.target.value==""){
     setSearch("")
     }
}

  const findUser=async()=>{
    try{
      const userRes=await axios.get('https://ecommerce-app-5dnf.onrender.com/products/islogin')
      await setUserRole({...userRes.data.userInfo})
      }catch(error){
      console.log(error)
    }
    }
 
  
  const handleChange=(e)=>{
    
   setImage(URL.createObjectURL(e.target.files[0]))
    setSimage(e.target.files[0])
    setSinglePro({...singlePro,image:e.target.files[0]})
    
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
   try{
     if(singlePro.image.size > limitSize){
        return toast.error("Maximum file size 2 megabytes")
      }
      if(!acceptType.includes(singlePro.image.type)){
        return toast.error("except Image other files not allowed")
      }
     
     const formData =new FormData();
 formData.append("name",singlePro.name)
 formData.append("image",singlePro.image)
 formData.append("price",singlePro.price)
 formData.append("desc",singlePro.desc)
 formData.append("category",singlePro.category)
   const res=await axios.post("https://ecommerce-app-5dnf.onrender.com/products/app",formData)
   await setData([...data,res.data])
    await toast.success(res.data.message)
    setSinglePro({name:"",price:0,desc:"",image:"",category:""})
    setImage("")
   }catch(error){
     toast.error(error.response.data.message)
     
   }
 await callApi()
  }
  
  const deleteProduct=async(id)=>{
    try{
      const res=await axios.delete(`https://ecommerce-app-5dnf.onrender.com/products/app/${id}`)
      toast.success(res.data.message)
      
    }catch(error){
      toast.error(error.response.data.message[0])
    }
    await callApi()
  }
      
        
  const callApi=async()=>{
    try{
      
    const res=await axios.get(`https://ecommerce-app-5dnf.onrender.com/products/app?page=${currentPage}&&search=${search}`)
   setClod(true)
     await setData(res.data.allProducts)
     await setTotalPage(res.data.totalPage)
     
    }catch(error){
      setClod(false)
    }
  }
  
  
  
  useEffect(()=>{
callApi()
 callCategory()
findUser()
  },[currentPage,search])
  
  return userRole.role &&(
<div className={`${data.length > 0 ? "mx-2 max-w-[400px] box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10" : "mx-2 max-w-[400px] box-border bg-gray-200 mt-14 text-center font-serif pb-4"}`}>
      <h1>this is Product page</h1>
      <div className="my-1">
        <input type="text" placeholder="Category Search here" name="search" className="p-2 border-2 border-solid hover:border-pink-600 outline-none rounded-lg mb-2 w-[75%]" value={todo} onChange={(e)=>{handleSearch(e)}} required/>
        <button onClick={()=>setSearch(todo)} className="bg-pink-500 text-white rounded-2xl p-2 ml-2">Submit</button>
      </div>
      
    { userRole.role==="admin" ? <div>
    <div className="mt-8">
        
        {
        formCon ? <div onClick={()=>setFormCon(false)} className="flex justify-center bg-pink-600 py-1 px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl mb-2 transform transition ease-in duration-400 hover:scale-110">
   <button>Hide Below Form</button><span className="text-4xl text-gray-800 animate-bounce"><FaCaretUp /></span>
        </div>
        :
        <div onClick={()=>setFormCon(true)} className="flex justify-center bg-green-700 py-1 px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl mb-2 transform transition ease-out duration-400 hover:scale-100">
   <button>Add New Product</button><span className="text-4xl text-yellow-500 animate-bounce"><MdAddLink className="pl-2" /></span>
        </div>
}
<div className="">
  <div className={`${formCon ? "text-center border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 shadow-[3px_5px_5px_gray] transform transition ease-in duration-500 hover:scale-110 w-[330px] mx-auto px-1 mt-10 mb-7 formAnimation overflow-scroll" : "text-center border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 shadow-[3px_5px_5px_gray] transform transition ease-in duration-500 hover:scale-110 w-[330px] mx-auto px-1 mt-10 mb-7 formAnimOut " }`}>
       <div className="flex justify-end m-1">
       <RxCrossCircled className="bg-pink-600 text-white text-3xl rounded-3xl" onClick={()=>setFormCon(false)} /></div>
              <div className="flex justify-end text-4xl">
      </div>
              <h1 className="text-3xl text-center text-amber-600 pb-4">Product Data</h1>
  <form onSubmit={handleSubmit}>
    <div className="flex justify-between pr-1 pt-6 relative">
        
        <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="description">*Product</label>
      <input type="text" placeholder="Product name" name="product" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-[66%] hover:border-pink-600" required value={singlePro.name} onChange={(e)=>setSinglePro({...singlePro,name:e.target.value})} />
   
       <label className="top-[-3px] right-12 absolute text-green-900 font-bold" for="price">*Price</label>
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
      {category.map(opt=>(<option>{opt.name}</option>))}
         </select>
         </div>
         <div className="">
  <div className="flex py-3 px-1 rounded-xl mr-1 bg-pink-600 inline-block">
<label className="top-[-3px] right-10 absolute text-green-900 font-bold" for="image">*Image</label>

        <label for="img-input" className=" text-white text-[12px] text-center">Select image</label> <span className="ml-1"><FaCaretDown /></span>
        </div>

        <input type="file" accept="image/jpg,image/jpeg,image/png,image/webp" id="img-input"  name="file" className="hidden" onChange={(e)=>handleChange(e)} />
        
      </div>
      </div>
     {image && <div className="my-3 flex justify-center">
     <img src={image} className="w-[150px] h-[120px] rounded-3xl"/>
     </div>}

      
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white px-8 text-2xl" type="submit">Submit</button>
</form><br/>

</div>

      </div>
      
      </div>
      <div className={` ${formCon} ? mt-2 flex flex-col gap-4 py-6 mb-20 : mt-2 flex flex-col gap-4 py-6`} >
        {
          data?.map((val,index)=>{
          const {_id,name,image}=val
            return <div className="w-[90%] odd:bg-emerald-200 even:bg-pink-200 mx-auto border-s-4 border-s-orange-500 rounded-r-3xl shadow-[8px_5px_3px_rgba(92,80,58,0.868)]">
              <ul className="flex gap-1 justify-between text-black p-3">
             <li> <img src={val.image} className="w-[35px] h-[35px] rounded-3xl my-[-6px]" /></li>
          
                <li>{val._id?.slice(-9)}</li>
                <li className="font-bold">{val.name?.split(" ")?.slice(0,2)?.join(" ")}</li>
                <Link to="/products/editproducts" state={{_id,category}}>
                <li className="text-blue-800 font-bold">Edit</li>
                </Link>

                
            <li onClick={()=>deleteProduct(val._id)} className="text-red-900 font-bold"> Delete</li>
            {/*}<Link to={`/showorder/${val._id}`} state={{_id,name,image}}> <li className="text-blue-800 underline font-bold">View</li>         </Link>*/}
              </ul>

            </div>

          })
        }
      </div>
      
      </div> : <div className="w-full h-full flex flex-wrap gap-2 justify-center items-center mt-8 mb-20">
        {
          data.map((val,index)=>{
           return <div key={index} className="bg-amber-400 w-[30%]  mb-3 rounded-2xl" onClick={()=>{setModalData({...val});setShowModal(true)}}>
             <p>{val.name}</p>
        <img src={val.image} className="w-full h-36" alt={val.name}/>
        <p>Price → {val.price}</p>
           </div>
          })
        }
      </div>
}
    { showModal && <div ref={setRef} onClick={(e)=>closeMoal(e)} className=" text-center font-serif w-[400px] backdrop-blur-md fixed inset-0 z-20 h-full flex justify-center items-center mt-14" >
<div className="w-[400px] h-fit mb-32">
      <div className="text-center py-1 border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] h-[375px] mx-auto">
       <div className="flex justify-end m-1">
      <RxCrossCircled onClick={()=>setShowModal(false)} className="bg-pink-600 text-white text-3xl rounded-3xl" /></div>
      
       <h1 className="text-2xl text-center text-amber-600 pb-4 mt-[-20px] underline">Product information</h1>
     <div className=" font-bold text-emerald-950">
       <img className="w-44 h-36 rounded-3xl mx-auto mb-5 " src={modalData.image} />
     <h1 className="mb-1">Product Name → {modalData.name}</h1>
     <h1 className="mb-1">Product category → {modalData.category}</h1>
       <h1 className="mb-1">Product Price → {modalData.price}</h1>
               <div className>
        {current === modalData._id ? <button className="font-semibold mt-2 text-center inline-block w-[80%] text-white py-2 rounded-3xl bg-amber-800">Wait...<p className="inline-block ml-5 animate-spin text-white text-[18px]"><ImSpinner3 /></p></button> :<button className="font-semibold mt-2 text-center inline-block bg-pink-600 w-[80%] animate-bounce text-white py-2 rounded-3xl" onClick={()=>addCart({...modalData,userId:userRole.id})}>ADD TO CART</button>
        }
          </div>
     </div>
      </div>
      </div>
      </div>}
      <div className="flex justify-center items-center">
     { data.length > 0 ? <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />: <span className="animate-spin text-4xl text-pink-500 mt-[-100px]"><ImSpinner3 /></span>}
      </div>
      </div>
    )
}