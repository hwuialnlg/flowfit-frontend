import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice'
import interfaceReducer from './slicers/interfaceSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
  }
})