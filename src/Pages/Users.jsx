
import React,{useState,useEffect,useRef} from "react"
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import toast,{Toaster} from 'react-hot-toast';
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { MdAddLink } from "react-icons/md";
import {setLogin,setSideBar} from "../Components/EcomReducer.jsx";
import Paginations from "../Pages/Paginations.jsx"
import OtpPage from "../Pages/OtpPage.jsx"
import "../Components/Op.css"
import axios from 'axios'

export default function Users(){
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const setRef=useRef()
  
  const initialUserData = {
  email: "",
  password: "",
  role: "admin"
};
  
  
  const [data,setData]=useState([])
  const [otp,setOtp]=useState("")
  const [userData,setUserData]=useState(initialUserData)
  const[formCon,setFormCon]=useState(false)
  const[editCon,setEditCon]=useState(false)
  const [search,setSearch]=useState("")
  const [editId,setEditId]=useState("")
 const[totalPage,setTotalPage]=useState(0)
  const[currentPage,setCurrentPage]=useState(1)
  const[todo,setTodo]=useState("")
  const[ID,setID]=useState("")
  const[modalData,setModalData]=useState({})
  const[userRole,setUserRole]=useState({})
  const [showModal,setShowModal]=useState(false)
  
  
  const handleSearch=(e)=>{
     setTodo(e.target.value);
     if(e.target.value==""){
     setSearch("")
     }
}
const findUser=async()=>{
    try{
      const userRes=await axios.get('http://localhost:3000/products/islogin')
      await setUserRole({...userRes.data.userInfo})
      await setID(userRes.data.userInfo.id)

    }catch(error){
      console.log(error)
    }
    }


const DeactivateUser=async(id)=>{
  try{
    const res=await axios.put(`http://localhost:3000/products/deactive/${id}`)
    await toast.success(res.data.message)
    if(id===ID){
      await axios.get("http://localhost:3000/products/logout")
      dispatch(setSideBar(false))
      navigate("/login")
    }
  }catch(error){
    console.log(error)
  }
  await callApi()
  await findUser()
}

const ActivateUser=async(id)=>{
  try{
    const res=await axios.put(`http://localhost:3000/products/activate/${id}`)
    await toast.success(res.data.message)
    
  }catch(error){
    console.log(error)
  }
  await callApi()
  await findUser()
}



const deleteUser=async(id)=>{
  try{
    
    const res=await axios.delete(`http://localhost:3000/products/deleteUser/${id}`)
    await toast.success(res.data.message)
   if(id===ID){
      await axios.get("http://localhost:3000/products/logout")
      dispatch(setSideBar(false))
      navigate("/login")
    }
    
  }catch(error){
   await toast.error(error.response.data.message)
  }
  await callApi()
  await findUser()
}

const editUser=(val)=>{
    setUserData({email:val.email,password:userRole.password,role:val.role})
    setEditId(val._id)
    setEditCon(true)
    setFormCon(true)
}

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      if(editId && editCon){
      const resp=await axios.put(`http://localhost:3000/products/user/${editId}`,userData)
      
    await toast.success(resp.data.message)
   
    if(resp.data.success){
   setUserData(initialUserData)
    setFormCon(false)
    setEditCon(false)
    setEditId("")
    }  
      }else{
      const res=await axios.post("http://localhost:3000/products/user",userData)
      await setOtp(res.data.otp)
    await toast.success(res.data.message)
    setUserData({email:"",password:"",role:"admin"})
   await navigate("/otppage",{state:{otp:res.data.otp,length:6}})
      }
    }catch(error){
     toast.error(error.response.data.message[0])
    }
    await callApi()
    await findUser()
  }
  
  
  
  const callApi=async()=>{
    try{
      
    const res=await axios.get(`http://localhost:3000/products/allusers?page=${currentPage}&&search=${search}`)
     await setData(res.data.allUser)
     await setTotalPage(res.data.totalPage)
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  
  const closeMoal=(e)=>{
   if(setRef.current == e.target){
     setShowModal(false)
   }
  }
  
  
  useEffect(()=>{
    callApi()
    findUser()
    
  },[currentPage,search])
  return userRole.role&&(
        <div className="mx-2 max-w-[400px] box-border bg-gray-200 py-5 mt-14 text-center font-serif pb-10">
     <h1 className="mb-5">this is {userRole.role} Page</h1>
    <div className="my-1">
        <input type="text" placeholder="Users Search here" name="search" className="p-2 border-2 border-solid hover:border-pink-600 outline-none rounded-lg mb-2 w-[75%]" value={todo} onChange={(e)=>handleSearch(e)} required/>
        <button onClick={()=>setSearch(todo)} className="bg-pink-500 text-white rounded-2xl p-2 ml-2">Submit</button>
      </div>
      {userRole?.role=="admin" ? <div>
                   {
        formCon ? <div onClick={()=>{setFormCon(false);setUserData(initialUserData);setEditCon(false);}} className="flex justify-center bg-pink-600 py-1 px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl mt-4 mb-8 transform transition ease-in duration-400 hover:scale-110">
   <button>{editCon?"Clear input data":"Hide Below Form"}</button><span className="text-4xl text-gray-800 animate-bounce"><FaCaretUp /></span>
        </div>
        :
        <div onClick={()=>setFormCon(true)} className="flex justify-center bg-green-700 py-1  px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl my-4 mb-4 transform transition ease-out duration-400 hover:scale-100">
   <button>Add New User</button><span className="text-4xl text-yellow-500 animate-bounce"><MdAddLink className="pl-2" /></span>
        </div>
}

    { formCon && <div className="py-4 mb-8 border-2 border-blue-600 border-solid rounded-3xl mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[350px] mx-auto">
     <h1 className="text-3xl text-center text-amber-600 pb-4">User Data</h1>
     
     <form onSubmit={handleSubmit}>
  <div className="relative pt-6 w-[96%] mx-auto">
    <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="email">*User Email</label>
<input type="text" placeholder="email type here" name="email" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-full hover:border-pink-600" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} required/>
</div>
    <div className="flex justify-between pr-1 pt-6 relative">
        
        <label className="top-[-3px] left-3 absolute text-green-900 font-bold" for="Password">*Password</label>
      <input type="text" placeholder="password type here" name="password" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-[68%] ml-1.5 hover:border-pink-600" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} required />
   
       <label className="top-[-3px] right-11 absolute text-green-900 font-bold" for="price">*Role</label>
      <select className="p-2 border-2 border-solid border-gray-200 bg-white rounded-lg mb-2 w-[26%] mr-1 hover:border-pink-600" value={userData.role} onChange={(e)=>setUserData({...userData,role:e.target.value})} >
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      </div>
     
    { editCon ? <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-pink-600 animate-bounce text-white px-8 text-2xl" type="submit">Update User</button> : <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white px-8 text-2xl" type="submit">Create User</button>}
           </form>
          
      </div>}
      <div>
        
        <select value={search} onChange={(e)=>setSearch(e.target.value)} className="p-1.5 border-[3px] border-solid border-green-600 outline-none bg-white rounded-lg w-[26%] mx-1 mt-2 hover:border-pink-600" >
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="true">Activate</option>
        <option value="false">Deactivate</option>
      </select>
      </div>
       <div className="mt-2 flex flex-col gap-4 py-6 justify-between mb-20" >
         
        {
          data?.map((val,index)=>{
          const {_id,email,isActive}=val
            return <div key={_id} className="w-[95%] odd:bg-emerald-200 even:bg-pink-200 mx-auto border-s-4 border-s-orange-500 rounded-r-3xl shadow-[8px_5px_3px_rgba(92,80,58,0.868)]">
              <ul className="flex gap-1 justify-between items-center text-black p-2">
           { /* <li> <img src={val.image} className="w-[35px] h-[35px] rounded-3xl my-[-6px]" /></li>*/}
          
                <li onClick={()=>{setShowModal(true);setModalData({...val});}}>{val.role}</li>
                <li className="font-bold underline text-blue-700" onClick={()=>{setShowModal(true);setModalData({...val});}} >{val.email.substring(0,4)+"..."} </li>
                <li className="text-blue-800 font-bold" onClick={()=>editUser(val)}>Edit</li>
            <li className="text-red-600 font-bold" onClick={()=>deleteUser(_id)}> Delete</li>
            {isActive ?<li className="text-white font-bold bg-pink-600 border-green-600 border-solid border-2 px-1 rounded-3xl" onClick={()=>DeactivateUser(_id)}>Deactivate</li> :<li className="bg-green-600 font-bold px-1 text-white rounded-3xl border-white border-solid border-2" onClick={()=>ActivateUser(_id)}>Activate</li>}

            {/*}<Link to={`/showorder/${val._id}`} state={{_id,name,image}}> <li className="text-blue-800 underline font-bold">View</li>         </Link>*/}
              </ul>

            </div>

          })
        }
      </div>
      </div> :<div>   
          { formCon && <div>
          <div onClick={()=>{setFormCon(false);setUserData(initialUserData);setEditCon(false);}} className="flex justify-center bg-pink-600 py-1 px-2 text-white text-2xl w-[68%] mx-auto rounded-3xl mt-4 mb-8 transform transition ease-in duration-400 hover:scale-110">
   <button>{editCon?"Clear input data":"Hide Below Form"}</button><span className="text-4xl text-gray-800 animate-bounce"><FaCaretUp /></span>
        </div>
          <div className="py-4 mb-8 border-2 border-blue-600 border-solid rounded-3xl mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[350px] mx-auto">
     <h1 className="text-3xl text-center text-amber-600 pb-4">User Data</h1>
     
     <form onSubmit={handleSubmit}>
  <div className="relative pt-6 w-[96%] mx-auto">
    <label className="top-[-3px] left-1 absolute text-green-900 font-bold" for="email">*User Email</label>
<input type="text" placeholder="email type here" name="email" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-full hover:border-pink-600" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} required/>
</div>
  <div className="flex justify-between pr-1 pt-6 relative w-[99%]">
        
        <label className="top-[-3px] left-3 absolute text-green-900 font-bold" for="Password">*Password</label>
      <input type="text" placeholder="password type here" name="password" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg mb-2 w-full ml-1.5 hover:border-pink-600" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} required />
   </div>
   <button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-pink-600 animate-bounce text-white px-8 text-2xl" type="submit">Update User</button>
</form>
</div>
</div>}
      
  {data?.map((val,index)=>{
          const {_id,email}=val
            return <div key={_id} className="w-[95%] odd:bg-emerald-200 even:bg-pink-200 mx-auto border-s-4 border-s-orange-500 rounded-r-3xl shadow-[8px_5px_3px_rgba(92,80,58,0.868)]">
              <ul className="flex gap-1 justify-between text-black p-3">
           { /* <li> <img src={val.image} className="w-[35px] h-[35px] rounded-3xl my-[-6px]" /></li>*/}
          
                <li>{val.role}</li>
                <li className="font-bold">{val.email}</li>
                <li className="text-blue-800 font-bold" onClick={()=>editUser(val)}>Edit</li>
                <li className="text-pink-500 font-bold underline" onClick={()=>{setShowModal(true);setModalData({...val});}}>View</li>
          {/* <li className="text-red-900 font-bold" onClick={()=>deleteUser(_id)}> Delete</li>*/}
            
            {/*}<Link to={`/showorder/${val._id}`} state={{_id,name,image}}> <li className="text-blue-800 underline font-bold">View</li>         </Link>*/}
              </ul>

            </div>

          })
        }</div>}
        
    { showModal && <div ref={setRef} onClick={(e)=>closeMoal(e)} className=" text-center font-serif w-[400px] backdrop-blur-md fixed inset-0 z-20 h-full flex justify-center items-center mt-14" >
<div className="w-[400px] h-fit mb-72">
      <div className="text-center py-1 border-2 border-blue-600 border-solid rounded-3xl bg-gray-100 mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] mx-auto">
       <div className="flex justify-end m-1">
      <RxCrossCircled onClick={()=>setShowModal(false)} className="bg-pink-600 text-white text-3xl rounded-3xl" /></div>
      
       <h1 className="text-2xl text-center text-amber-600 pb-4 mt-[-20px] underline">User information</h1>
     <div className="pb-8 font-bold text-emerald-950 ">
      <h1>User Email → {modalData.email}</h1>
       <h1>User Role → {modalData.role}</h1>
       
     </div>
      </div>
      </div>
      </div>}
     <div className="flex justify-center items-center">
     { data.length ? <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />: <span className="animate-spin text-4xl text-pink-500 mb-[-20px] py-4"><ImSpinner3 /></span>  }
      </div>
      </div>
   
    )
}