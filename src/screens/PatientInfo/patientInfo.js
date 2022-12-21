import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Button, RadioGroup, Radio, MenuItem } from '@mui/material';
import { createMemberAction } from '../../store/action/memberAction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoupons } from '../../store/action/couponAction';
import Stripe from '../stripe/StripeContainer';
import basicStyle from './index.module.scss'

function PatientInfo(props) {
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
        productName: "",
        isView: false,
        price: "",
        total: null,
        shippingCharge: "10"
    })

    const dispatch = useDispatch();
    const carts = useSelector((state) => state.productManagementReducer.carts);
    const userSelectedCouponDetails = useSelector((state) => state.couponReducer.userSelectCoupon);

    let price = carts.map((item) => (item.price * item.count)).reduce((acc, cur) => acc + cur, 0)
    let finalPrice = parseInt(price) + parseInt(state.shippingCharge) - parseInt(userSelectedCouponDetails !== null && userSelectedCouponDetails.discount)

    useEffect(() => {
        dispatch(fetchAllCoupons())
        setState({ ...state, total: finalPrice })
    }, [dispatch])

    const handleChange = (event) => {
        setState({ ...state, IsAllergy: event.target.value })
    }

    const handleSubmit = () => {
        let data = {};
        let allergies = {};
        data.first_name = state.firstName;
        data.last_name = state.lastName;
        data.email = state.email;
        data.phone_number = state.phoneNumber;
        data.gender = state.gender;
        data.state = state.state;
        data.zip_code = state.zipCode;
        data.city = state.city;
        data.date_of_birth = state.dateOfBirth;
        data.address_line1 = state.addressline1;
        data.address_line2 = state.addressline2;
        data.allergies = state.IsAllergy;
        allergies.is_allergy = state.IsAllergy;
        allergies.type = state.allergy;
        allergies.status = "Active";
        data.allergies = state.IsAllergy;
        allergies.description = state.medication;
        dispatch(createMemberAction(data, props, allergies))
    }

    return (
        <>
            <Grid container spacing={1} justifyContent="space-evenly" alignItems={"flex-end"}>
                <Grid item xs={10} sm={6}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: "600", fontSize: "24px" }}>Billing Address</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="First Name"
                                fullWidth
                                value={state.firstName}
                                onChange={(event) => setState({ ...state, firstName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1) })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="Last Name"
                                fullWidth
                                value={state.lastName}
                                onChange={(event) => setState({ ...state, lastName: event.target.value.charAt(0).toUpperCase().trim() + event.target.value.slice(1) })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="Email"
                                fullWidth
                                value={state.email}
                                onChange={(event) => setState({ ...state, email: event.target.value.trim() })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="Phone Number"
                                fullWidth
                                inputProps={{ maxLength: 10 }}
                                value={state.phoneNumber}
                                onChange={(event) => setState({ ...state, phoneNumber: event.target.value.replace(/[^0-9]/g, '') })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="AddressLine 1"
                                value={state.addressline1}
                                fullWidth
                                multiline
                                minRows={2}
                                onChange={(event) => setState({ ...state, addressline1: event.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder="AddressLine 2"
                                value={state.addressline2}
                                fullWidth
                                multiline
                                minRows={2}
                                onChange={(event) => setState({ ...state, addressline2: event.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <TextField size="small"
                                placeholder='DOB'
                                value={state.dateOfBirth}
                                fullWidth
                                onChange={(event) => setState({ ...state, dateOfBirth: event.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                placeholder='City'
                                value={state.city}
                                fullWidth
                                onChange={(event) => setState({ ...state, city: event.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                placeholder='State'
                                value={state.state}
                                fullWidth
                                onChange={(event) => setState({ ...state, state: event.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField placeholder='Zip code'
                                size="small"
                                fullWidth
                                value={state.zipCode}
                                onChange={(event) => setState({ ...state, zipCode: event.target.value, zipCodeError: false })}
                                error={state.zipCodeError}
                                helperText={state.zipCodeError ? "Please enter the Zip code" : null}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Is any Allergies</Typography>
                            <RadioGroup
                                defaultValue="false"
                                value={state.IsAllergy}
                                onChange={handleChange}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            {state.IsAllergy === "true" ?
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Allergy</Typography>
                                        <RadioGroup
                                            value={state.allergy}
                                            onChange={(e) => setState({ ...state, allergy: e.target.value })}
                                            defaultValue="others">
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="Respiratory" control={<Radio />} label="Respiratory" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="Hives" control={<Radio />} label="Hives" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="others" control={<Radio />} label="Others" />
                                                </Grid>
                                            </Grid>
                                            {state.allergy === "others" ?
                                                <Grid item xs={12}>
                                                    <TextField fullWidth
                                                        size="small"
                                                        value={state.allergy}
                                                        onChange={(e) => setState({ ...state, allergy: e.target.value })}
                                                    />
                                                </Grid>
                                                : null
                                            }
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Severity</Typography>
                                        <RadioGroup
                                            defaultValue="Mild">
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="Mild" control={<Radio />} label="Mild" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel value="severe" control={<Radio />} label="severe" />
                                                </Grid>
                                            </Grid>
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Medication</Typography>
                                        <TextField size="small"
                                            fullWidth
                                            placeholder={"Enter medication"}
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
                                    <Button variant="outlined" style={{ float: 'right', textTransform: "none" }}>Back</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => handleSubmit()}>Payment</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3} style={{ height: "75vh" }}>
                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} style={{ border: "2px solid grey" }} >
                        <Grid item xs={12} style={{ backgroundColor: '#e1e7ff', padding: "15px" }}>
                            <Typography className={basicStyle.text}>Cart Summary</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={basicStyle.cartHeading}>Products</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {carts.map((item, index) => (
                                <Grid container spacing={2} key={index.toString()}>
                                    <Grid item xs={7}>
                                        <Typography>{index + 1}. {item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography >{`${item.count}X`}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>{`$${item.price}`}</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Typography className={basicStyle.cartHeading}>Shipping charge</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>+</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{`$${state.shippingCharge}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Typography className={basicStyle.cartHeading}>Discount</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>-</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{`$${userSelectedCouponDetails !== null && userSelectedCouponDetails.discount}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{ padding: "3px" }}>
                                <Grid item xs={9}>
                                    <Typography className={basicStyle.cartHeading}>Total</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{`$${state.total}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <Stripe />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default PatientInfo;