import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface UserState {
  username: string | null,
  email: string | null,
  dob: Date | null,
  phone_number: string | null,
  exercises: Array<Exercise>
  isLoggedIn: boolean,
}

const initialState: UserState = {
    username: null,
    email: null,
    dob: null,
    phone_number: null,
    exercises: [],
    isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'userSlice',

  initialState,

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

    setExercises: (state, action: PayloadAction<Array<Exercise>>) => {
      state.exercises = action.payload
    },

    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    }

    }
})

// Action creators are generated for each case reducer function
export const { setName, setEmail, setDob, setPhoneNumber, setExercises, setIsLoggedIn } = userSlice.actions

export default userSlice.reducer