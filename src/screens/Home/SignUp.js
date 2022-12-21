import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { createSignUpAction } from '../../store/action/sessionAction';
import { useDispatch} from 'react-redux';
import Router from "next/router";

function SignUp() {

    const [state, setState] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        countryCode: '',
        email_error: false,
        phoneNumber_error: false,
        password_error: false,
        countryCode_error: false,
        isSubmit:false,
        isSignUp:false
    })
const dispatch = useDispatch();

    const handleSubmit = () => {
        let register={}
        register.email=state.email;
        register.phone_number=state.phoneNumber;
        register.password=state.password;
        register.country_code=state.countryCode;
        dispatch(createSignUpAction(register))

        // console.log("$$$$$$$$$$$$$$$"+JSON.stringify(register))
    }

    const cancelField=()=>{
        setState({isSignUp:true})
        Router.push('/')
    }
// console.log("=====email state======"+state.email)
// console.log("=====phoneno state======"+state.phoneNumber)
// console.log("=====password state======"+state.password)
// console.log("=====countrycode state======"+state.countryCode)
    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} style={{ height: '88vh' }}>
                <Grid item xs={3} >
                    <Grid container spacing={1} justifyContent={'center'} style={{ border: "1px solid black", borderRadius: '10px', boxShadow: '1px 1px 3px 1px #3D3D3D', backgroundColor: '#FFF', height: '60vh' }} >
                        <Grid item xs={12} >
                            <Typography align={'center'} color='#1368E9' fontWeight={'bold'} fontSize={'25px'}>REGISTER</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth
                                size="small"
                                label={'Email'}
                                value={state.email}
                                onChange={(e) => setState({...state,email: e.target.value })}
                                error={state.email_error} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth
                                size="small"
                                label={"Phone Number"}
                                value={state.phoneNumber}
                                onChange={(e) => setState({...state,phoneNumber: e.target.value })}
                                error={state.phoneNumber_error} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth
                                size="small"
                                label={"Password"}
                                value={state.password}
                                onChange={(e) => setState({ ...state,password: e.target.value })}
                                error={state.password_error} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth
                                size="small"
                                label={"Country Code"}
                                value={state.countryCode}
                                onChange={(e) => setState({ ...state,countryCode: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} display={'flex'}>
                            <Grid item xs={6}>
                                <Button variant={'text'} style={{ float: 'right', fontWeight: 'bold' }} onClick={()=>cancelField()}>Cancel</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant={'text'} style={{ fontWeight: 'bold' }} onClick={() => handleSubmit()}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default SignUp;