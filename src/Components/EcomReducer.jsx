
import React,{useState,useEffect} from "react"
import { createSlice } from '@reduxjs/toolkit'

const getCart=localStorage.getItem("cartItems")!==null ? JSON.parse(localStorage.getItem("cartItems")) : []

const setStorage=(val)=>{
  localStorage.setItem("cartItems",JSON.stringify(val))
}



//const [data,setData]=useState("hello")

const initialState = { 
  category:"",
  tCat:[],
  allCategory:{name:"All",category:""},
  //allCategory:[{name:"",category:"all"}],
  cart:getCart,
  navi:true,
  order:[],
  login:false,
  sideBar:false,
  loader:false,
  cartNumber:true,
  myToast:"",
}

const EcomReducer=createSlice({
  name:'e-commerce',
  initialState,
  reducers:{
    getCategory:(state,action)=>{
      state.category=action.payload
    },
    getCat:(state,action)=>{
      state.tCat=action.payload
    },
    selCategory:(state,action)=>{
      const{name,category}=action.payload
    state.allCategory=action.payload
      
      //state.allCategory.push(action.payload)
    },
    setNavi:(state,action)=>{
      state.navi=action.payload
    },
    setSideBar:(state,action)=>{
      state.sideBar=action.payload
    },
    addToCart:(state,action)=>{
      //const id=action.payload._id
      const {name,_id,category,price,userId}=action.payload
    
      const findItem=state.cart.find(val=>val._id == _id && val.userId==userId)
      
      if(action.payload.val=="null"){
      state.cart=state.cart.filter(val=>val.userId !== action.payload.userId)
      }
      else if(!findItem){
      state.cart.push({...action.payload,qty:1})
      }
      else{
      state.cart= state.cart.map((val)=> (val._id===_id) && (val.userId===userId) ? {...val,qty:val.qty+1} : val)
      }
    //  localStorage.setItem("cartItems",JSON.stringify())
      setStorage(state.cart.map(val=>val))
     //
    },
    removeFromCart:(state,action)=>{
      const {id,userId}=action.payload;

      state.cart = state.cart.filter(val => {
  if (val.userId === userId) {
    return val._id !== id;
  }
  return val; 
});
      setStorage(state.cart.map(val=>val))
    },
    incQty:(state,action)=>{
      const {id,userId}=action.payload;
      state.cart= state.cart.map((val)=> (val._id===id && val.userId === userId) ? {...val,qty:val.qty+1} : val)
     setStorage(state.cart.map(val=>val))
    },
    decQty:(state,action)=>{
     const {id,userId}=action.payload;
 state.cart= state.cart.map((val)=>(val.qty > 0) &&(val._id === id && val.userId === userId ) ? {...val,qty:val.qty-1}: val
     ) 
     setStorage(state.cart.map(val=>val))
    },
    getOrder:(state,action)=>{
      state.order.push(action.payload)
     // localStorage.clear()
    },
    setLogin:(state,action)=>{
      state.login=action.payload
    },
    setLoadings:(state,action)=>{
      state.loader=action.payload
    },
    setToast:(state,action)=>{
      state.myToast=action.payload
    },
    setCartNumber:(state,action)=>{
      state.cartNumber=action.payload
    },
      
    }
  
  
})
export const {getCategory,addToCart,setNavi,removeFromCart,incQty,decQty,selCategory,getCat,getOrder,setLogin,setSideBar,setLoadings,setToast,setCartNumber}=EcomReducer.actions
export default EcomReducer.reducer