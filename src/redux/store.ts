import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice.ts'
import interfaceReducer from './slicers/interfaceSlice.ts'
import scheduleReducer from './slicers/scheduleSlice.ts'

const store = configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
    schedule: scheduleReducer,
  }
})

export type AppState = ReturnType<typeof store.getState>

export default store;