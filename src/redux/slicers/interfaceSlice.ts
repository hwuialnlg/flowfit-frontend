import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum ModalOptions {
    ADD_EXERCISE = "addExercise",
}

interface InterfaceState {
    modal : ModalOptions | null
    groups: Array<string>,
}

const initialState: InterfaceState = {
    modal: null,
    groups: []
}

export const interfaceSlice = createSlice({
    name: 'interfaceSlice',
    
    initialState,

    reducers: {
        setModal: (state, action : PayloadAction<null | ModalOptions>) => {
            state.modal = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setModal } = interfaceSlice.actions

export default interfaceSlice.reducer