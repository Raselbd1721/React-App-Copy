
import React,{useEffect} from "react"
import { MdLastPage,MdFirstPage } from "react-icons/md";

export default function Paginations({currentPage,setCurrentPage,totalPage}){
  
  
  
  const visiblePage=()=>{
    let pages=[];
    let visible=3;
    let startPage=Math.max(1,currentPage - Math.floor(visible / 2))
    let endPage=Math.min(totalPage,startPage+visible-1)
  
    if((endPage - startPage) < (visible -1)){
      startPage=Math.max(1,endPage - visible + 1)
    }
  
    for(let i=startPage; i <= endPage; i++){
      pages.push(i)
      
    }
   
    return pages
  }
  const showPage=visiblePage();
  
  useEffect(()=>{
    if(totalPage > 0){
    setCurrentPage(1)
    }
  },[totalPage])
  
  return(showPage.length && <div className="w-fit h-fit bg-white-700 text-center px-2 py-3 mx-auto rounded-3xl border-4 border-solid border-green-600 fixed translate-x-[-50%,0%] bottom-6">  
      <span className="px-2 py-2 mx-2 rounded-2xl bg-blue-600 text-white" onClick={()=> currentPage > 1 ? setCurrentPage(currentPage-1) : setCurrentPage(totalPage)}>Prev</span>
         <span className="text-2xl px-1 text-gray" onClick={()=>setCurrentPage(1)}><MdFirstPage className="inline-block" /></span>
      {showPage.map((page,index) => {
    return  <span className={currentPage === page ?"mx-2 px-2 py-1 text-[19px] rounded-3xl text-yellow bg-green-600" : "mx-2 px-2 py-1 text-[19px] rounded-3xl text-yellow bg-gray-300"} key={page} onClick={()=>setCurrentPage(page)}>{page}</span>
      })}
     <span className="text-2xl px-1 text-gray" onClick={()=>setCurrentPage(totalPage)}><MdLastPage className="inline-block" /></span>
      <span className="px-2 py-2 mx-2 rounded-2xl bg-blue-600 text-white" onClick={()=> currentPage < totalPage ? setCurrentPage(currentPage+1) : setCurrentPage(1)}>Next</span>
    </div>
    )
}