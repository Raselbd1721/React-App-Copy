
import React,{useState,useEffect,useRef} from "react"
import {Link} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
import {setLogin,setSideBar,setNavi} from "../Components/EcomReducer.jsx";
import NavBarData from "../Data/NavBarData.jsx"
import { FaCaretDown,FaCaretUp } from "react-icons/fa";

import "../Components/Op.css"

const NavSidebar=()=>{
  const[turn,setTurn]=useState(true)
  const[current,setCurrent]=useState("")
  
  const dispatch=useDispatch()
  const {sideBar,navi}=useSelector(state=>state.EcomReducer)
  const modalRef=useRef()
  const checkCond=(e)=>{
    
    
    if(modalRef.current===e.target){
      dispatch(setNavi(true))
      setTurn(false)
      setTimeout(()=>{
      dispatch(setSideBar(false))
    },600)
    }
  }
  const doubleCon=()=>{
    dispatch(setNavi(true))
      setTurn(false)
      setTimeout(()=>{
      dispatch(setSideBar(false))
    },600)
  }
  return sideBar&&(
    <div ref={modalRef} onClick={(e)=>checkCond(e)} className=" inset-0 fixed box-border z-20 backdrop-blur-sm">
      <div className={turn? "text-center font-serif w-[200px] ml-2 bg-pink-600 h-full py-3 cae" : "text-center font-serif w-[200px] ml-2 bg-rgba(43,46,65,0.998) h-full py-3 translate-x-[-220px] duration-[0.8s] ease-out"}>
          <h1 className="text-neutral-900 text-3xl">R@HopE</h1>
          <div className="mt-10">
            {
              NavBarData.map((val,index)=>(
              <div key={index} className="text-left pl-1 mt-3 mb-2 font-serif font-bold text-white pr-2">
                <div className="flex inline justify-between">
                  <Link to={val.link} onClick={()=>doubleCon()}>
              <h1 className="hover:bg-indigo-400 pl-4">{val.mainHeading}
             </h1>  
             </Link>
             { val.subHeading && <span onClick={()=>{current !== val.mainHeading ? setCurrent(val.mainHeading) : setCurrent("") }}>{val.mainHeading === current ? <FaCaretUp /> : <FaCaretDown />}</span>}
             </div>
              {
                val.subHeading?.map((valu,index)=>(
             <Link key={index} to={valu.link} onClick={()=>doubleCon()}><h3 className={`${current===val.mainHeading ? "text-blue-900 hover:bg-gray-500 pl-3":"hidden"}`}>{valu.name}</h3> </Link>
             ) )
              }
              
              </div>
              )
              )
            }
          </div>
      </div>
    </div>
    )

}
export default NavSidebar