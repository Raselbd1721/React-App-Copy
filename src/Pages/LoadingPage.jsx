
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";




export default function LoadingPage({isLoading}){
  let [color, setColor] = useState("#ffffff");

 
  
  return isLoading &&(
    <div className="text-4xl text-pink-900 inset-0 bg-white z-10 backdrop-blur-3xl fixed">
      <div className="top-[15%] left-[40%] absolute">
<HashLoader 
color="#36d7b7"
size={70}
/>
      </div>
      </div>
    )
}