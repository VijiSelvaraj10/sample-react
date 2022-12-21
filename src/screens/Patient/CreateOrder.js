import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, MenuItem, IconButton, Checkbox } from '@mui/material';
import { createMemberAction, orderAction } from '../../store/action/memberAction';
import { useDispatch } from 'react-redux';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

function CreateOrder(props) {
    // useState is a function returns an array with variable and its update function 
    const [state, setState] = useState({
        id: null,
        groupName: "", firstName: "", lastName: "", phoneNumber: "", email: "",
        city: "", gender: "", addressLine1: "", addressLine2: "",
        dateOfBirth: "", status: "Active", state: "", zipCode: "", zipCodeError: false, firstNameError: false, lastNameError: false,
        phoneNumberError: false, emailError: false, addressLine1Error: false,
        cityError: false, dateOfBirthError: false, genderError: false, stateError: false,
        members: [], isAddMember: true, groupNameError: false,
        isPrimaryUser: false, mode: null
    })

    const dispatch = useDispatch();

    const handleSubmit = async () => {
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
            data.id = state.members.length + 1
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
            data.is_primary_user = state.isPrimaryUser
            if (state.id === null) {
                setState({ ...state, isAddMember: true, members: [...state.members, data] })
            } else {
                let member = state.members.map((item) => item.id === state.id ? data : item)
                setState({ ...state, isAddMember: true, members: member })
            }

        }

    }

    const editMemberAction = (param) => {
        let result = state.members.find((item) => item.id === param)
        setState({
            ...state, id: result.id, isAddMember: false, firstName: result.first_name, lastName: result.last_name, phoneNumber: result.phone_number, email: result.email, city: result.city, gender: result.gender, addressLine1: result.address_line1, addressLine2: result.address_line2,
            dateOfBirth: result.date_of_birth, status: "Active", state: result.state, zipCode: result.zip_code, isPrimaryUser: result.is_primary_user
        })

    }
    const handleClose = () => {
        props.closeAdd()
    }

    const deleteMemberAction = (param) => {
        let result = state.members.filter((item) => item.id !== param)
        setState({ ...state, members: result })
    }

    const createOrderAction = () => {
        setState({
            ...state, isAddMember: false, firstName: "", lastName: "", phoneNumber: "", email: "", city: "", gender: "", addressLine1: "", addressLine2: "",
            dateOfBirth: "", status: "Active", state: "", zipCode: "", isPrimaryUser: false
        })
    }

    const checkboxAction = () => {
        setState({ ...state, isPrimaryUser: !state.isPrimaryUser })
    }

    const createLinkAction = () => {
        let data = {}
        data.groupName = state.groupName
        data.members = state.members
        dispatch(orderAction(data, props))
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <Typography>Group Name</Typography>
                            <TextField placeholder='Group Name'
                                size="small"
                                fullWidth
                                value={state.groupName}
                                onChange={(event) => setState({ ...state, groupName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1), groupNameError: false })}
                                error={state.firstNameError}
                                helperText={state.firstNameError ? "Please enter first name" : null}
                            />
                        </Grid>

                        <Grid item xs={6} style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <Button variant="contained" style={{ textTransform: "none" }} onClick={() => createOrderAction()}> Add Members</Button>
                            {state.members.length > 0 && state.members.filter((item) => item.is_primary_user === true).length > 0 &&
                                <Button variant="contained" style={{ textTransform: "none" }} onClick={() => createLinkAction()}>Create Link</Button>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={state.members.length === 0 && "center"} alignItems={'center'} style={{ border: '1px solid grey', borderRadius: '10px', padding: '5px' }}>
                                {state.members.length > 0 ? state.members.map((item, index) =>
                                    <Grid item xs={12} style={{ display: 'flex', flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }} key={index.toString()}>
                                        <Typography textAlign='center' ><Button variant="text" style={{ textTransform: "none" }}> {item.first_name}  <EditIcon onClick={() => editMemberAction(item.id)} style={{ color: 'blue', }} sx={{ fontSize: 20 }} /> <RemoveCircleOutlineIcon onClick={() => deleteMemberAction(item.id)} style={{ color: 'red', }} sx={{ fontSize: 20 }} /></Button> </Typography>
                                    </Grid>
                                ) : <Grid item xs={12}  >
                                    <Typography textAlign={"center"}> No Members </Typography>
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>

                    {state.isAddMember ?
                        <Grid item xs={12} style={{ marginTop: 30 }}>
                        </Grid>
                        :
                        <Grid item xs={12} style={{ marginTop: 30 }}>
                            <Grid container spacing={2} alignItems={'center'} >
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
                                    <TextField placeholder='Date of birth'
                                        size="small"
                                        fullWidth
                                        value={state.dateOfBirth}
                                        onChange={(event) => setState({ ...state, dateOfBirth: event.target.value, dateOfBirthError: false })}
                                        error={state.dateOfBirthError}
                                        helperText={state.dateOfBirthError ? "Please select the date of birth" : null}
                                    />
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
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: "flex-start", alignItems: "center", marginTop: 15 }}>
                                    <Typography>Is primary user </Typography>
                                    <Checkbox checked={state.isPrimaryUser} onChange={checkboxAction} inputProps={{ 'aria-label': 'controlled' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" style={{ float: 'right', textTransform: "none" }} onClick={() => handleClose()}>Cancel</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" style={{ textTransform: "none" }} onClick={() => handleSubmit()}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    )
};

export default CreateOrder;