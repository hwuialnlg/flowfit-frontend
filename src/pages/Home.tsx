import { Autocomplete, AutocompleteRenderInputParams, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import Graph from "../components/Graph.tsx";

export default function Home() {
    return (
        <Container maxWidth='xl' sx={{height: '90vh', display: 'flex'}}>
            {/* Streak Messaging */}
            <Stack flexDirection={"column"} width="65%">
                <br/>
                <Typography>Welcome Message</Typography>
            </Stack>

            {/* Customizable Columns of Data Features */}
            <Stack flexDirection={"column"} width="35%" height="100%" rowGap={2}
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <br/>
                <Autocomplete 
                    renderInput={params => <TextField {...params} label="Data to Graph"></TextField>}
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
                <Graph name="Weight"/>
                <Graph name="Gym"/>
                <Graph name="Exercise"/>
            </Stack>
        </Container>
    )
}