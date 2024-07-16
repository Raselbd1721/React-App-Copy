

import React from "react"
import { FaCircleCheck } from "react-icons/fa6";
export default function SucesssRes({toastId,current}){
  return (
      

   <div className=" ">
     
  {toastId?.map(val=>{
  return <div className=" cae text-center text-white py-1 px-3 z-30 fixed top-20 w-full h-fit">
  <div className=" bg-[rgba(55,81,11,0.982)] flex w-fit py-2 text-[20px] rounded-3xl px-3 translate-x-[-50%]">
   <p className="px-1 py-1"><FaCircleCheck /></p>
    <h3 className="px-1">{`${val.name} Add to cart`}</h3>
    
    </div>
    </div>
    

  })
}
  
   </div>
   )
}