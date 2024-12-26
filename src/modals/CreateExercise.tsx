import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { ModalOptions, setModal } from "../redux/slicers/interfaceSlice.ts";
import axios from "axios";
import { setExercises } from "../redux/slicers/userSlice.ts";

export default function CreateExercise() {
    const modal = useSelector((state: AppState) => state.interface.modal)
    const dispatch = useDispatch()
    const [exerciseName, setExerciseName] = useState("")
    const [loading, setLoading] = useState(false)
    const exercises = useSelector((state: AppState) => state.user.exercises)

    const createExercise = () => {
        if (exerciseName === null || exerciseName?.length === 0) {
            return
        }
        var exercise = {
            "exercise_name": exerciseName.toLowerCase().trim()
        }
        setLoading(true)
        axios.post("http://localhost:8080/createExercise", exercise, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            dispatch(setModal(null))
            dispatch(setExercises([...exercises, res.data]))
        }).catch((err) => {
            // send logging statement that informs user of failure
            console.log(err)
        }).finally(() => setExerciseName(""))
    }

    return (
        <Dialog
            open={modal === ModalOptions.ADD_EXERCISE}
            onClose={() => dispatch(setModal(null))}
            sx={{
                height: '100%%',
                width: '100%%',
            }}
        >
            <DialogTitle>Add Exercise</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    columnGap: 1,
                }}
            >   
                <TextField fullWidth onChange={(e) => setExerciseName(e.target.value)} label={"Exercise Name"}></TextField>
                <Button fullWidth variant='contained' onClick={() => createExercise()}>Create Exercise</Button>
            </DialogContent>
        </Dialog>
    )
}