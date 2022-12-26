import React, { useState } from 'react';
import { Grid, Typography, TextField, FormControl, FormControlLabel, Button, RadioGroup, Radio, MenuItem } from '@mui/material';

function AddSchedule(props) {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        addressline1: "",
        addressline2: "",
        dateOfBirth: "",
        gender: "",
        city: "",
        state: "",
        zipCode: "",
        IsAllergy: "",
        allergy: "",
        medication: "",
        firstName_error: false,
        lastName_error: false,
        email_error: false,
        phoneNumber_error: false,
        addressline1_error: false,
        addressline2_error: false,
        dateOfBirth_Error: false,
        gender_error: false,
        city_error: false,
        state_error: false,
        zipCodeError: false,
        isOpen: false,
        id: null,
    })
    
    const handleChange = (event) => {
        setState({ ...state, IsAllergy: event.target.value })
    }

    const handleSubmit = () => {
        alert("Work In Progress")
    }

    return (
        <>
            <FormControl>
                <Grid container>
                    <Grid container item xs={12} spacing={6}>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"First Name"}
                                fullWidth
                                value={state.firstName}
                                onChange={(event) => setState({ ...state, firstName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1) })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"Last Name"}
                                fullWidth
                                value={state.lastName}
                                onChange={(event) => setState({ ...state, lastName: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"Email"}
                                fullWidth
                                value={state.email}
                                onChange={(event) => setState({ ...state, email: event.target.value.trim() })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"Phone Number"}
                                fullWidth
                                inputProps={{ maxLength: 10 }}
                                value={state.phoneNumber}
                                onChange={(event) => setState({ ...state, phoneNumber: event.target.value.replace(/[^0-9]/g, '') })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"AddressLine1"}
                                value={state.addressline1}
                                fullWidth
                                multiline
                                minRows={2}
                                onChange={(event) => setState({ ...state, addressline1: event.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"AddressLine2"}
                                value={state.addressline2}
                                fullWidth
                                multiline
                                minRows={2}
                                onChange={(event) => setState({ ...state, addressline2: event.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"Gender"}
                                value={state.gender}
                                fullWidth
                                select
                                onChange={(event) => setState({ ...state, gender: event.target.value })}>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Transgender"}>Transgender</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField size="small"
                                label={"DOB"}
                                value={state.dateOfBirth}
                                fullWidth
                                onChange={(event) => setState({ ...state, dateOfBirth: event.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                label={"City"}
                                value={state.city}
                                fullWidth
                                onChange={(event) => setState({ ...state, city: event.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                label={"State"}
                                value={state.state}
                                fullWidth
                                onChange={(event) => setState({ ...state, state: event.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField placeholder='Zip code'
                                size="small"
                                fullWidth
                                value={state.zipCode}
                                onChange={(event) => setState({ ...state, zipCode: event.target.value, zipCodeError: false })}
                                error={state.zipCodeError}
                                helperText={state.zipCodeError ? "Please enter the Zip code" : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Is any Allergies</Typography>
                            <RadioGroup
                                defaultValue="false"
                                value={state.IsAllergy}
                                onChange={handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            {state.IsAllergy === "true" ?
                                <Grid item container>
                                    <Grid item xs={6}>
                                        <Typography>Allergy</Typography>
                                        <RadioGroup
                                            value={state.allergy}
                                            onChange={(e) => setState({ ...state, allergy: e.target.value })}
                                            defaultValue="others">
                                            <FormControlLabel value="Respiratory" control={<Radio />} label="Respiratory" />
                                            <FormControlLabel value="Hives" control={<Radio />} label="Hives" />
                                            <FormControlLabel value="others" control={<Radio />} label="Others" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Severity</Typography>
                                        <RadioGroup
                                            defaultValue="Mild">
                                            <FormControlLabel value="Mild" control={<Radio />} label="Mild" />
                                            <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                                            <FormControlLabel value="severe" control={<Radio />} label="severe" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Medication</Typography>
                                        <TextField size="small"
                                            fullWidth
                                            placeholder={"Please enter medication"}
                                            value={state.medication}
                                            onChange={(e) => setState({ ...state, medication: e.target.value })} />
                                    </Grid>
                                </Grid> :
                                null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Button variant="outlined" style={{ float: 'right', textTransform: "none" }} onClick={props.closeAdd}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => handleSubmit()}> Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}


export default AddSchedule;