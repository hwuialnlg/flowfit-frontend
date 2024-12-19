import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice'
import interfaceReducer from './slicers/interfaceSlice'
import scheduleReducer from './slicers/scheduleSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
    schedule: scheduleReducer,
  }
})

export type AppState = ReturnType<typeof store.getState>

export default store;