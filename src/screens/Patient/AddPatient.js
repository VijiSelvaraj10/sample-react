import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, MenuItem } from '@mui/material';
import { createMemberAction } from '../../store/action/memberAction';
import { useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function AddPatient(props) {
    // useState is a function returns an array with variable and its update function 
    const [state, setState] = useState({
        firstName: "", lastName: "", phoneNumber: "", email: "",
        city: "", gender: "", addressLine1: "", addressLine2: "",
        dateOfBirth: null, status: "Active", state: "", zipCode: "", zipCodeError: false, firstNameError: false, lastNameError: false,
        phoneNumberError: false, emailError: false, addressLine1Error: false,
        cityError: false, dateOfBirthError: false, genderError: false, stateError: false,
    })

    const dispatch = useDispatch();

    const handleSubmit = () => {
        let isError = false;
        const updatedState = {};
        for (var key in state) {
            if (state[key] === "") {
                updatedState[`${key}Error`] = true;
                setState({ ...state, ...updatedState });
                isError = true
            }
        }
       
        if (isError === false) {
            let data = {};
            data.first_name = state.firstName;
            data.last_name = state.lastName;
            data.email = state.email;
            data.phone_number = state.phoneNumber;
            data.gender = state.gender;
            data.date_of_birth = state.dateOfBirth;
            data.city = state.city;
            data.state = state.state;
            data.zip_code = state.zipCode;
            data.address_line1 = state.addressLine1;
            data.address_line2 = state.addressLine2;
            dispatch(createMemberAction(data, props));
        }
    }

    const handleDob = (newValue) => {
        setState({ ...state, dateOfBirth: newValue })
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <Typography>First Name</Typography>
                            <TextField placeholder='First name'
                                size="small"
                                fullWidth
                                value={state.firstName}
                                onChange={(event) => setState({ ...state, firstName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1), firstNameError: false })}
                                error={state.firstNameError}
                                helperText={state.firstNameError ? "Please enter first name" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Last Name</Typography>
                            <TextField placeholder='Last name'
                                fullWidth
                                value={state.lastName}
                                size="small"
                                onChange={(event) => setState({ ...state, lastName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1), lastNameError: false })}
                                error={state.lastNameError}
                                helperText={state.lastNameError ? "Please enter last name" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Email</Typography>
                            <TextField placeholder='Email'
                                value={state.email}
                                size="small"
                                fullWidth
                                onChange={(event) => { setState({ ...state, email: event.target.value.trim(), emailError: false }) }}
                                error={state.emailError}
                                helperText={state.emailError ? "Please enter the email" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Phone Number</Typography>
                            <TextField placeholder='Phone number'
                                size="small"
                                value={state.phoneNumber}
                                fullWidth
                                onChange={(event) => { setState({ ...state, phoneNumber: event.target.value.replace(/[^0-9]/g, ''), phoneNumberError: false }) }}
                                error={state.phoneNumberError}
                                inputProps={{ maxLength: 10 }}
                                helperText={state.phoneNumberError ? "Please enter phone number" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Address Line 1</Typography>
                            <TextField placeholder='Address Line 1'
                                size="small"
                                value={state.addressLine1}
                                fullWidth
                                onChange={(event) => { setState({ ...state, addressLine1: event.target.value, addressLine1Error: false }) }}
                                error={state.emailError}
                                helperText={state.emailError ? "please enter the address line 1" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Address Line 2</Typography>
                            <TextField placeholder='Address Line 2'
                                size="small"
                                value={state.addressLine2}
                                fullWidth
                                onChange={(event) => setState({ ...state, addressLine2: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Date Of Birth</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    value={state.dateOfBirth}
                                    onChange={handleDob}
                                    renderInput={(params) => <TextField fullWidth size={"small"} {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Gender</Typography>
                            <TextField placeholder='Gender'
                                size="small"
                                fullWidth
                                select
                                defaultValue={"Please select the gender"}
                                value={state.gender}
                                onChange={(event) => setState({ ...state, gender: event.target.value, genderError: false })}
                                error={state.genderError}
                                helperText={state.genderError ? "Please select the gender" : null}>
                                     <em>none</em>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Transgender"}>Transgender</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>City</Typography>
                            <TextField placeholder='City'
                                size="small"
                                fullWidth
                                value={state.city}
                                onChange={(event) => setState({ ...state, city: event.target.value, cityError: false })}
                                error={state.cityError}
                                helperText={state.cityError ? "Please enter the city" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>State</Typography>
                            <TextField placeholder='State'
                                size="small"
                                value={state.state}
                                fullWidth
                                onChange={(event) => setState({ ...state, state: event.target.value, stateError: false })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Zip code</Typography>
                            <TextField placeholder='Zip code'
                                size="small"
                                fullWidth
                                value={state.zipCode}
                                onChange={(event) => setState({ ...state, zipCode: event.target.value, zipCodeError: false })}
                                error={state.zipCodeError}
                                helperText={state.zipCodeError ? "Please enter the Zip code" : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Button variant="outlined" style={{ float: 'right', textTransform: "none" }} onClick={() => props.closeAdd()}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => handleSubmit()}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default AddPatient;