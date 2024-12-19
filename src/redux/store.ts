import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice'
import interfaceReducer from './slicers/interfaceSlice'
import scheduleReducer from './slicers/scheduleSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
    schedule: scheduleReducer,
  }
})