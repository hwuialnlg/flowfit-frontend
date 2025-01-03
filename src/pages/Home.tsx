import { Autocomplete, AutocompleteRenderInputParams, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import InfoDisplay from "../components/InfoDisplay.tsx";
import Graph from "../components/Graph.tsx";
import Weekly from "../components/Weekly.tsx";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Home() {
    const handleDragEnd = () => {

    }
    
    return (
        <Container maxWidth='xl' sx={{height: '90vh', display: 'flex', columnGap: 10}}>
            {/* Streak Messaging */}
            <Stack flexDirection={"column"} width="100%" rowGap={2}>
                <br/>
                <Graph/>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Weekly width={"100%"} height={"40%"}/>
                </DragDropContext>
            </Stack>

            {/* Customizable Columns of Data Features */}
            <Stack flexDirection={"column"} width="20%" height="100%" rowGap={2}
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <br/>
                <Autocomplete 
                    renderInput={params => <TextField {...params} label="Data to Display"></TextField>}
                    renderOption={(_, option) => 
                        <Stack>
                            <Stack flexDirection={'row'} sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 1
                            }}>
                                <Typography>{option}</Typography>
                                <Checkbox></Checkbox>
                            </Stack>
                        </Stack>
                    }
                    multiple
                    options={["Gym", "Weight", "Exercise"]}
               />
                <InfoDisplay name="Weight" color={"#D3E9F3"}/>
                <InfoDisplay name="Gym" color={"#D6DBF0"}/>
                <InfoDisplay name="Exercise" color={"#C9BCD2"}/>
                <InfoDisplay name="Exercise" color={"#F3DFEF"}/>
            </Stack>
        </Container>
    )
}