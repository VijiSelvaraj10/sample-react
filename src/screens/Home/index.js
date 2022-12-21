import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Router from 'next/router';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            email: '',
            password: '',
            phoneNumber: '',
            phoneNumber_error: '',
            email_error: false,
            password_error: false,
            isSignUp: false,
            isForgotPassword: false,
        }
    }
    login = () => {
        this.setState({ isLogin: true })
        Router.push({ pathname: '/patients' })
    }
    signUp = () => {
        this.setState({ isSignUp: true })
        Router.push({ pathname: '/signUp' })
    }
    ForgotPassword = () => {
        this.setState({ isForgotPassword: true })
        Router.push({ pathname: '/forgotPassword' })
    }
    render() {
        return (
            <>
                <Grid container justifyContent={'center'} alignItems={'center'} style={{ height: '98vh' }} >
                    <Grid item xs={3}>
                        <Grid container spacing={1} justifyContent='center' style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: "1px 1px 3px 1px #3D3D3D", height: '50vh', backgroundColor: '#FFF' }}>
                            <Grid item xs={12} style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <Typography align={'center'} color='#1368E9' fontWeight='600' fontSize='25px'>HYDREIGHT</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField fullWidth
                                    size='small'
                                    label={'Email'}
                                    onChange={(event) => this.setState({ email: event.target.value })}
                                    error={this.state.email_error}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField fullWidth
                                    size='small'
                                    label={'Password'}
                                    onChange={(event) => this.setState({ password: event.target.value })}
                                    error={this.state.password_error} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Button variant={'text'} style={{ float: 'right', fontWeight: '600', color: '#1368E9' }} onClick={() => this.signUp()}>Sign Up</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant={'text'} style={{ fontWeight: '600', color: '#1368E9' }} onClick={() => this.login()}>Sign In</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} textAlign={"center"}>
                                <Button variant={'text'} style={{ fontWeight: '600', color: '#1368E9' }} onClick={() => this.ForgotPassword()}>Forgot password</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </>
        )
    }
}