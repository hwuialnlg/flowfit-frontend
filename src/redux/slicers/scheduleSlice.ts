import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Exercise {
    id: number,
    email: string,
    exercise_name: string,
}

interface DailyState {
    groups: Array<string>,
    exercises: Array<Exercise>,
}

interface WeeklyState {
    monday: DailyState,
    tuesday: DailyState,
    wednesday: DailyState,
    thursday: DailyState,
    friday: DailyState,
    saturday: DailyState,
    sunday: DailyState,
}

const initialDailyState: DailyState = {
    groups: [],
    exercises: []
}

const initialState: WeeklyState = {
    monday: initialDailyState,
    tuesday: initialDailyState,
    wednesday: initialDailyState,
    thursday: initialDailyState,
    friday: initialDailyState,
    saturday: initialDailyState,
    sunday: initialDailyState,
}

export const scheduleSlice = createSlice({
    name: 'scheduleSlice',
    
    initialState,

    reducers: {
        setMonday: (state, action : PayloadAction<DailyState>) => {
            state.monday = action.payload
        },

        setTuesday: (state, action : PayloadAction<DailyState>) => {
            state.tuesday = action.payload
        },

        setWednesday: (state, action : PayloadAction<DailyState>) => {
            state.wednesday = action.payload
        },

        setThursday: (state, action : PayloadAction<DailyState>) => {
            state.thursday = action.payload
        },

        setFriday: (state, action : PayloadAction<DailyState>) => {
            state.friday = action.payload
        },

        setSaturday: (state, action : PayloadAction<DailyState>) => {
            state.saturday = action.payload
        },

        setSunday: (state, action : PayloadAction<DailyState>) => {
            state.sunday = action.payload
        },

        setWeekly: (state, action: PayloadAction<WeeklyState>) => {
            state.monday = action.payload["monday"]
            state.tuesday = action.payload["tuesday"]
            state.wednesday = action.payload["wednesday"]
            state.thursday = action.payload["thursday"]
            state.friday = action.payload["friday"]
            state.saturday = action.payload["saturday"]
            state.sunday = action.payload["sunday"]
        }

    }
})

// Action creators are generated for each case reducer function
export const { setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday, setSunday, setWeekly } = scheduleSlice.actions

export default scheduleSlice.reducer