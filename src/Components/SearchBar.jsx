
import { useState,useRef,useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {getCategory,selCategory,getCat,setLogin} from "./EcomReducer"
import {ProductData} from "../Data/ProductData.jsx"
import axios from "axios"
const SearchBar=()=>{
  
  const dispatch=useDispatch()
  const SelRef=useRef()
 
  
  
  const {category,allCategory,tCat,login}=useSelector((state)=>state.EcomReducer)
  
const [names,setNames]=useState([]);
const [todo,setTodo]=useState("")
const[clod,setClod]=useState(false)
const [todoage,setTodoage]=useState("")
const [tod,setTod]=useState("All")
const [price,setPrice]=useState("")
const test={name:"rasel",pori:"tyu"}
const gh=["rasel"]

const handleSub=(e)=>{
 e.preventDefault()
 
dispatch(selCategory({name:"",category:todo}))
 dispatch(getCategory(todo))
  
  setTodoage("")
  setPrice("")
  if(todo==="All" || todo==="all"){
  dispatch(selCategory({name:"All",category:""}))
  dispatch(getCategory(""))
 }
}

/*const handlePrice=(e)=>{
 e.preventDefault()

 dispatch(getCategory(price))
  setTodo("")
  setTodoage("")
  setPrice("")
}*/

/*const handleSubmit=(e)=>{
 e.preventDefault()
 dispatch(selCategory({name:"",category:todoage.toLowerCase()}))
  setTodo("")
  setTodoage("")
  setPrice("")
}
*/
const getVal=(e)=>{
  setTodo(e.target.value)
 // dispatch(getCategory(e.target.value))
 if(e.target.value==""){
  dispatch(selCategory({name:"All",category:""}))
  dispatch(getCategory(""))
  dispatch(getCat([]))
  setTodoage("")
  setPrice("")
 }
}
/*const getCatVal=(e)=>{
  setTodoage(e.target.value)
  dispatch(getCat(e.target.value))
// dispatch(selCategory({name:"",category:"All"}))
  //setTodo("")
 // setPrice("")
  //dispatch(getCat(e.target.value))
 //dispatch(selCategory({name:"",category:"All"}))
}*/
/*const getPrice=(e)=>{
  setPrice(e.target.value)
  dispatch(getCategory(e.target.value))
  dispatch(selCategory({name:"",category:"All"}))
  setTodo("")
  setTodoage("")
  //dispatch(getCat(e.target.value))
// dispatch(selCategory({name:"",category:"All"}))
}*/

axios.defaults.withCredentials=true
  const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      
     setClod(true)
     //dispatch(setLoadings(false))
      
    }catch(error){
      setClod(false)
      //dispatch(setLoadings(true))
      console.log(error)
    }
  }
  useEffect(()=>{
    callApi()
    if(tCat.length===0){
      setTodo("")
    }
  },[tCat])
  

  return clod &&(
    <div className="bg-gray-200 pt-3">
<div className="mx-4 pt-10">
<h1 className="text-3xl text-center text-amber-600 py-4">hello react-redux</h1>
<div className="text-center py-6 border-2 border-blue-600 border-solid rounded-3xl mb-4 shadow-[3px_5px_5px_gray] transform transition ease-in-out duration-500 hover:scale-110 w-[330px] mx-auto">
<form onSubmit={handleSub}>
<input type="text" placeholder="Products search here" name="name" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg my-4" value={todo} onChange={(e)=>getVal(e)} required />
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " type="submit">Search Products</button>
</form><br/>
{/*<form onSubmit={handleSubmit}>
<input type="text" placeholder="Search by Category" name="category" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg" value={todoage} onChange={(e)=>getCatVal(e)} required />
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " type="submit">Search by Category</button>
</form><br/>
<form onSubmit={handlePrice}>
<input type="text" placeholder="Search by product price" name="category" className="p-2 border-2 border-solid border-gray-200 outline-none rounded-lg" value={price} onChange={(e)=>getPrice(e)} required />
<button className="p-2 border-2 mx-auto block border-amber-200 rounded-xl mt-3 bg-green-600 text-white " type="submit">Search by Price</button>
</form><br/>
*/}
</div>


{/*
names && names.map((val)=>{
if(tod === "All" || tod === val.name){
    return <div>
    <h1>{val.name}</h1>
    <h1>{val.age}</h1>
    </div>
}
  })
*/}
{/*<div>
<button onClick={()=>setTod("All")}>All</button>
<button onClick={()=>setTod("Rasel")}>Rasel</button>
</div>*/}
</div>
</div>
   
  )
    
}

export default SearchBar
