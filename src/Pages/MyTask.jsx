
import React,{useState,useEffect} from "react"

import axios from "axios"
export default function MyTask({order}){
  
  
  return(
    <div>
      <ul className="flex justify-center items-center "><li>{order?.substring(0,4)+"..."}</li></ul>
      
      </div>
    )
}