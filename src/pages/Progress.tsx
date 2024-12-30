import { Autocomplete, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Pagination, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import axios, { AxiosResponse } from "axios";
import { Exercise } from "../interfaces/models";
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartToolTip, Legend, TimeScale, TimeSeriesScale } from "chart.js";

export default function Progress() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartToolTip, Legend, TimeScale, TimeSeriesScale);

    const exercises = useSelector((state: AppState) => state.user.exercises)
    const [selected, setSelected] = useState<Exercise>()
    interface Stat {
        date: Date,
        exercise_id: number,
        id: number,
        weight: number
    }

    interface mapStats {
        email: string,
        exercise_name: string,
        exercise_id: number,
        exercise_stats: Array<Stat>
    }

    const initialMap: mapStats = {
        email: "",
        exercise_name: "",
        exercise_id: 0,
        exercise_stats: [],
    }

    const initialData = {
        labels: Array<string>(),
        datasets: [{
            label: "",
            data: Array<any>(),
            fill: false,
            borderColor: 'rgb(75,192,192)',
            tension: 0.4
        }]
    }

    const [map, setMap] = useState<Map<number, mapStats>>()
    const [points, setPoints] = useState(Array<Stat>())
    const [labels, setLabels] = useState(Array<string>())
    const [data, setData] = useState(initialData)
    const [statField, setStatField] = useState("")
    const [selectTime, setSelectedTime] = useState("1M")

    const capitalize = (word: string = "") => {
        if (word === "") {
            return ""
        }
        let wordArr = word.split(" ")
        for (let i = 0; i < wordArr.length; i++) {
            let wordCopy = wordArr[i].slice()
            wordArr[i] = wordCopy[0].toUpperCase() + wordCopy.substring(1)
        }
        return wordArr.join(" ").trim()
    }

    const getExerciseStats = async () => {
        let req: Promise<AxiosResponse<any>>[] = []; 
        exercises?.forEach((val) => req.push(axios.get("http://localhost:8080/exercise_stats?exercise_id=" + val.id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            } 
        )))

        try {
            const responses = await axios.all(req)
            let res = responses.map((val) => val.data)
            let map = new Map()
            res.forEach((obj) => {map[obj.exercise_id] = obj})
            setMap(map)
        }

        catch (error) {
            console.log(error)
        }
    }

    const getChart = () => {
        axios.get("http://localhost:8080/chart?exercise_id=" + selected?.id + `&time=` + (selectTime ? selectTime : "1M"), 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            let tempMap = new Map()
            for (let i = 0; i < res.data["stats"].length; i++) {
                tempMap.set(res.data["stats"][i].date, res.data["stats"][i])
            }
            setPoints(Array.from(tempMap.values()))
            setLabels(Array.from(tempMap.keys()))
        }).catch((err) => {
            setData(initialData)
            console.log("FAILED TO GET CHART DATA", err)
        })
    }

    const addStat = () => {
        axios.post("http://localhost:8080/add_exercise_stats",
            {
                exercise_id: selected?.id,
                stat: Number(statField),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            setPoints([...points, res.data["exercise_stats"]])
        }).catch((err) => {
            console.log("FAILED TO GET CHART DATA", err)
        })
    }

    useEffect(() => {
        getExerciseStats()
    }, [])

    useEffect(() => {
        getChart()
    }, [selected, selectTime])

    useEffect(() => {
        let copyDataSet = data.datasets.slice()
        copyDataSet[0].data = []
        points.forEach((val) => copyDataSet[0].data.push({y: val.weight, x: new Date(val.date)}))
        copyDataSet[0].label = capitalize(selected?.exercise_name)
        setData({
            labels: labels,
            datasets: copyDataSet,
        })
    }, [points])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container
            maxWidth='xl'
            sx={{
                columnGap: 5,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '90vh',
                p: 1,
                mt: 2.5
            }}
        >
            <Stack
                sx={{
                    width: '20%',
                    height: 'calc(100vh - 200px)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto'
                }}
            >
                <Autocomplete
                    options={exercises}
                    renderInput={(props) => <TextField {...props} label="Exercise"></TextField>}
                    onChange={(e, v) => v !== null && setSelected(v)}
                    getOptionLabel={(option) => capitalize(option.exercise_name)}
                    sx={{mb: 3}}
                />

                <Card 
                    sx={{
                        borderRadius: 0,
                        flex: 1,
                        display: (exercises?.length <= 0 ? 'flex' : 'none'),
                        alignItems: 'center',
                    }}
                >
                    <CardContent>
                        <Typography textAlign={'left'}>No Exercises</Typography>
                    </CardContent>
                </Card>
                {
                    exercises.map((val, idx) => {
                        return (
                            <Card
                                key={idx}
                                sx={{
                                    borderRadius: 0,
                                    flex: 1,
                                    display: 'flex',
                                    backgroundColor: (val.id === selected?.id ? "lightblue" : 'white'),
                                    "&:hover": {
                                        backgroundColor: "#757de8"
                                    },
                                }}
                                onClick={() => setSelected(val)}
                            >
                                <CardContent>
                                    <Typography textAlign='left'>{capitalize(val.exercise_name)}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
                {
                    exercises.length <= 0 &&
                        Array.from({length: 7}).map((_, idx) => {
                            return (
                                <Card
                                    key={idx} 
                                    sx={{
                                        borderRadius: 0,
                                        flex: 1
                                    }}
                                >
                                    <CardContent>
                                    </CardContent>
                                </Card>
                            )
                        })
                    
                }

                {
                    exercises.length > 0 &&
                        <Pagination
                            sx={{
                                mt: 2,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}
                            count={Math.ceil(exercises.length / 8)}
                        />
                }

            </Stack>
            
            {
                selected &&
                    <Stack
                        sx={{
                            width: '75%',
                            height: 'calc(100vh - 200px)',
                        }}
                    >   
                        <Card sx={{height: '100%'}}>
                            <CardHeader title={capitalize(selected?.exercise_name)}></CardHeader>
                            <CardContent>
                                <Stack flexDirection={'row'} columnGap={1}>
                                    <TextField label={`Insert Data`} type='number' inputMode='numeric' value={statField} fullWidth onChange={(e) => setStatField(e.target.value)}></TextField>
                                    <Button variant='contained' onClick={() => addStat()}>Submit</Button>
                                </Stack>
                                <ToggleButtonGroup value={selectTime} exclusive onChange={(e, v) => setSelectedTime(v)} sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                                    <ToggleButton value="1M">1M</ToggleButton>
                                    <ToggleButton value="3M">3M</ToggleButton>
                                    <ToggleButton value="1Y">1Y</ToggleButton>
                                    <ToggleButton value="ALL">ALL</ToggleButton>
                                </ToggleButtonGroup>
                                {/* <Line data={data} options={options}/> */}
                                <Line data={data}/>
                            </CardContent>
                        </Card>
                    </Stack>
            }

            {
                !selected &&
                <Stack
                sx={{
                    width: '75%',
                    height: 'calc(100vh - 200px)',
                }}
            >   
                <Card sx={{height: '100%'}}>
                    <CardHeader title={"No Exercise Selected"}></CardHeader>
                    <CardContent sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography>Select An Exercise to See Chart and Insert Data</Typography>
                    </CardContent>
                </Card>
            </Stack>
            }
        </Container>
    )
}