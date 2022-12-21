import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCoupons } from '../../store/action/couponAction';

function EditCoupon(props) {

    const [state, setState] = useState({
        name: "",
        code: "", discount: "", expiryDate: "", status: ""
    })

    let data = props.editCoupon;

    const dispatch = useDispatch();

    useEffect(()=>{
        setState({ ...state, name: data.name, code: data.code, discount: data.percentage, expiryDate: data.end_date, status: data.status });
    },[])

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
                    <TextField size='small' fullWidth placeholder='Name' value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' fullWidth placeholder='Code' value={state.code} onChange={(e) => setState({ ...state, code: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' fullWidth placeholder='Discount' value={state.discount} onChange={(e) => setState({ ...state, discount: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' fullWidth placeholder='ExpiryDate' value={state.expiryDate} onChange={(e) => setState({ ...state, expiryDate: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' select fullWidth value={state.status} onChange={(e) => setState({ ...state, status: e.target.value })}>
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}><Button variant={'outlined'} style={{ float: 'right' }} onClick={props.closeEdit}>Cancel</Button></Grid>
                        <Grid item xs={6}><Button variant={'contained'} onClick={() => handleSubmit()}>Update</Button></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EditCoupon;