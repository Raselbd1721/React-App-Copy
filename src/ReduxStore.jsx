import { configureStore} from '@reduxjs/toolkit'
import { usersApi } from './Components/CallApi.jsx'
import { setupListeners } from '@reduxjs/toolkit/query'

import EcomReducer from "./Components/EcomReducer.jsx"

 const store=configureStore({
  reducer:{
    EcomReducer:EcomReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware)
})
/*setupListeners(store.dispatch)*/
export default store