import React, { useState } from 'react';
import { TextField, Grid, Button, MenuItem, Typography } from '@mui/material';
import { createCoupons } from "../../store/action/couponAction";
import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function AddCoupon(props) {
    const [state, setState] = useState({
        name: "",
        code: "", discount: "", expiryDate: null, status: "Active", flatAmount: ""
    })
    const dispatch = useDispatch();

    const handleSubmit = () => {
        let data = {};
        data.name = state.name;
        data.code = state.code;
        data.percentage = state.discount;
        data.end_date = state.expiryDate;
        data.coupon_type = 'Bulk';
        data.is_onetime = true;
        data.status = state.status;
        data.flat_amount = state.discount;
        console.log(JSON.stringify(data))
        dispatch(createCoupons(data, props))
    }

    const handleDob = (newValue) => {
        setState({ ...state, expiryDate: newValue })
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography>Code</Typography>
                    <TextField size='small'
                        fullWidth
                        placeholder='Code'
                        value={state.code}
                        onChange={(e) => setState({ ...state, code: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Coupon Name</Typography>
                    <TextField size='small'
                        fullWidth placeholder='Name'
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Discount Price</Typography>
                    <TextField size='small'
                        fullWidth placeholder='Discount'
                        value={state.discount}
                        onChange={(e) => setState({ ...state, discount: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Expiry Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={state.expiryDate}
                            onChange={handleDob}
                            renderInput={(params) => <TextField fullWidth size={"small"} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Status</Typography>
                    <TextField size='small'
                        select
                        fullWidth
                        defaultValue={'Active'}
                        value={state.status}
                        onChange={(e) => setState({ ...state, status: e.target.value })}>
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button style={{ float: 'right' }} variant={'outlined'} onClick={props.closeAdd}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant={'contained'} onClick={() => handleSubmit()}>Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default AddCoupon;