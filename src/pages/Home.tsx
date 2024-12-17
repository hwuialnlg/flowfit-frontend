import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";

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
                {/* Might be better off splitting this up into a component */}
                <Card sx={{height: '33%'}}>
                    <br/>
                    <Typography textAlign={"center"}>Weight Progress</Typography>
                    <CardContent>
                        {/* Graph */}
                    </CardContent>
                </Card>
            
                <Card sx={{height: '33%'}}>
                    <br/>
                    <Typography textAlign={"center"}>Weight Progress</Typography>
                    <CardContent>
                        {/* Graph */}
                    </CardContent>
                </Card>

                <Card sx={{height: '33%'}}>
                    <br/>
                    <Typography textAlign={"center"}>Weight Progress</Typography>
                    <CardContent>
                        {/* Graph */}
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    )
}