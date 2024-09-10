
import React,{useState,useEffect} from "react"
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { TiThMenuOutline } from "react-icons/ti";
import {useLocation,useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import "../Components/Op.css"
import {useDispatch,useSelector } from "react-redux";
import {setNavi,setLogin,setSideBar,setCartNumber} from "./EcomReducer.jsx";
import axios from "axios"


const Navbar=()=>{
  const { pathname } = useLocation();

  
  const {cart,navi,login,cartNumber}=useSelector((state)=>state.EcomReducer)
  const [menu,setMenu]=useState("")
  const [data,setData]=useState({})
  const [logedIn,setLogedIn]=useState(false)
  const dispatch=useDispatch()
  
  const menuBar=()=>{
      callApi()
      dispatch(setNavi(true))
      if(logedIn){
      dispatch(setSideBar(true))
  }
  }

  const callApi=async()=>{
    try{
      const res=await axios.get('http://localhost:3000/products/islogin')
      setData({...res.data.userInfo})
      setLogedIn(true)
dispatch(setCartNumber(true))
 
    }catch(error){
  
        
      
    dispatch(setSideBar(false))
      setLogedIn(false)
      console.log(error)
      //dispatch(setSideBar(false))
      setData({})
    }
    }
    const cartData=cart?.filter((dat)=>dat.userId === data.id) 
    
 
    useEffect(()=>{
      setMenu(pathname.replace("/",""))
      callApi()
      dispatch(setNavi(true))
    },[pathname])
  
//if(navi){
  return(
    <div className="fixed z-20 w-full pt-1">
    <div className="grid grid-col-5 grid-flow-col py-3 bg-blue-400 text-center rounded-3xl box-border mx-3 md:mx-5 h-12">
        <div className="col-span-1 px-2">
         {(cartNumber && data.role) ? <h1 className="">{data.role==="admin" ? "Ad..("+data.email.substring(0,4)+")" : "User("+data.email.substring(0,4)+")"}</h1>:"R@hopE"}
        </div>
      <div className="col-span-2">
        <ul className=" flex gap-2 text-white">
        <Link to="/home"><li className={menu==="home" ? "test" : ""}>Home</li></Link> 
       <Link to="/products"> <li className={menu==="products" ? "test" : ""}>Products</li></Link>
     {/* <Link to="/category"> <li className={menu==="Category" ? "test" : ""}>Category</li></Link>
       
      <Link to="/about"><li className={menu==="about" ? "test" : ""}>About</li>
        </Link>*/}
        <Link to="/orders"><li className={menu==="orders" ? "test" : ""}>Orders</li></Link>
        
      {/*<Link to="/users"><li className={menu==="users" ? "test" : ""}>Users</li></Link>*/}
        </ul>
        </div>
      
    <div className="col-span-5 flex gap-3 flex-row text-pink-600 p-1">
       <Link to="/cart"> 
       <div className={ menu=== "cart" ? "test px-1" : "px-1"}>
        {cartNumber&&cartData?.length > 0 ? 
        <p className="absolute bg-yellow-600 w-6 h-[23px] content-center rounded-[45%] text-white mt-[-13px] ml-[-18px] animate-bounce">{cartData.length}</p> :""}
       
         {cartNumber&&cartData.length > 0 ? 
        <FaShoppingCart className="animate-ping w-5 h-5" /> : <FaShoppingCart className="pb-1 w-5 h-5 " /> }
        </div>
      </Link>
       <Link to="/login" >
      <div className={ menu=== "login" ? "test px-1" : "px-"}>
        <FiLogIn className="pb-1 w-5 h-5" />
      </div>
</Link>

      </div>
      <div className="flex justify-start mr-1 text-pink-600">
        <div onClick={()=>menuBar()} className={ menu=== "menu" ? "test px-1" : " px-1"}><TiThMenuOutline className="pb-0.5 w-8 h-6" /></div>

    </div>
    </div>
    </div>
    

   
    )
  
/*}else{
      return null
    }*/

}
export default Navbar