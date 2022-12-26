import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, MenuItem, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCoupons } from '../../store/action/couponAction';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function EditCoupon(props) {

    const [state, setState] = useState({
        name: "",
        code: "", discount: "", expiryDate: null, status: ""
    })

    let data = props.editCoupon;

    const dispatch = useDispatch();

    useEffect(() => {
        setState({ ...state, name: data.name, code: data.code, discount: data.percentage, expiryDate: data.end_date, status: data.status });
    }, [])

    const handleDob = (newValue) => {
        setState({ ...state, expiryDate: newValue })
    }

    const handleSubmit = () => {
        let data = {}
        data.id = props.editCoupon.id;
        data.name = state.name;
        data.code = state.code;
        data.percentage = state.discount;
        data.coupon_type = "Bulk";
        data.end_date = state.expiryDate;
        data.is_onetime = true;
        data.status = state.status;
        data.flat_amount = state.discount;
        dispatch(updateCoupons(data, props));
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
                        fullWidth
                        placeholder='Name'
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })} />

                </Grid>
                <Grid item xs={6}>
                    <Typography>Discount Price</Typography>
                    <TextField size='small'
                        fullWidth
                        placeholder='Discount'
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
                        value={state.status}
                        onChange={(e) => setState({ ...state, status: e.target.value })}>
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant={'outlined'} style={{ float: 'right' }} onClick={props.closeEdit}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant={'contained'} onClick={() => handleSubmit()}>Update</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EditCoupon;