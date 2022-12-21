import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Router from "next/router";

function ForgotPassword() {
    const [state, setState] = useState({
        isSignUp: false
    })

    const cancelField = () => {
        setState({ isSignUp: true })
        Router.push('/')
    }

    const handleSubmit = () => {
        alert("Submit button is in progress")
    }

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} height={'88vh'}>
                <Grid item xs={4}>
                    <Grid container justifyContent={'center'} style={{ border: '1px solid black', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '1px 1px 3px 1px #3D3D3D', height: '30vh' }}>
                        <Grid item xs={12}>
                            <Typography align={'center'} fontWeight={'bold'} fontSize={'25px'} color='#1368E9'>Forgot Password</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={"center"} fontSize={'17px'}>Please enter your email address or mobile number to search for your account.</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth
                                size="small"
                                placeholder="Enter Email or Phone Number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button variant={"text"} style={{ float: 'right' }} onClick={() => cancelField()}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant={"text"} onClick={() => handleSubmit()}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ForgotPassword;