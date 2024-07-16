import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'
import {Provider} from "react-redux"
import store from "./ReduxStore.jsx"
import {BrowserRouter}from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
//import { toast, ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import "./Components/Op.css"

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
       <Router />
     { /*<ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
bodyClassName="toastBody"
transition: Bounce
/> */}
       <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    success: {
    duration: 2000,
      style: {
        background: 'rgba(55,81,11,0.982)',
        color:"white",
        marginTop:"36px",
      },
    },
    error: {
    duration: 2000,
      style: {
      color:"white",
        marginTop:"36px",
        width:"95%",
        background:"red"
      },
    },
  }}
/>
    </Provider>
    
)
