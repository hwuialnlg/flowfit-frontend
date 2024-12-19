import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DailyState {
    groups: Array<string> | null,
    exercise: Array<Exercise> | null,
}

interface WeeklyState {
    monday: DailyState | null,
    tuesday: DailyState | null,
    wednesday: DailyState | null,
    thursday: DailyState | null,
    friday: DailyState | null,
    saturday: DailyState | null,
    sunday: DailyState | null,
}

const initialState: WeeklyState = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
}

export const scheduleSlice = createSlice({
    name: 'scheduleSlice',
    
    initialState,

    reducers: {
        setMonday: (state, action : PayloadAction<null | DailyState>) => {
            state.monday = action.payload
        },

        setTuesday: (state, action : PayloadAction<null | DailyState>) => {
            state.tuesday = action.payload
        },

        setWednesday: (state, action : PayloadAction<null | DailyState>) => {
            state.wednesday = action.payload
        },

        setThursday: (state, action : PayloadAction<null | DailyState>) => {
            state.thursday = action.payload
        },

        setFriday: (state, action : PayloadAction<null | DailyState>) => {
            state.friday = action.payload
        },

        setSaturday: (state, action : PayloadAction<null | DailyState>) => {
            state.saturday = action.payload
        },

        setSunday: (state, action : PayloadAction<null | DailyState>) => {
            state.sunday = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday, setSunday } = scheduleSlice.actions

export default scheduleSlice.reducer