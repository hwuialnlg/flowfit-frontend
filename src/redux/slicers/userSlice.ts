import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userSlice',

  initialState: {
    username: null,
    email: null,
    dob: null,
    phone_number: null,
  },

  reducers: {
    setName: (state, action) => {
      state.username = action.payload
    },

    setEmail: (state, action) => {
        state.email = action.payload
    },
  
    setDob: (state, action) => {
        state.dob = action.payload
    },

    setPhoneNumber: (state, action) => {
        state.phone_number = action.payload
    },

    }
})

// Action creators are generated for each case reducer function
export const { setName, setEmail, setDob, setPhoneNumber } = userSlice.actions

export default userSlice.reducer