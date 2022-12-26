import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Dialog, DialogContent } from '@mui/material';
import TopBar from '../../components/TopBar';
import AddCoupon from './AddCoupon';
import EditCoupon from './EditCoupon';
import { fetchAllCoupons } from "../../store/action/couponAction";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import basicStyles from './index.module.scss'

function Coupon() {
    const [state, setState] = useState({
        isOpen: false,
        mode: null,
        isView: true,
        coupon: null,
    })

    const dispatch = useDispatch()

    const coupons = useSelector((state) => state.couponReducer.coupons);

    const handleClose = () => {
        setState({ ...state, isOpen: false })
    }

    const editAction = (param) => {
        setState({ ...state, isOpen: true, mode: "EDIT", coupon: param })
    }

    const buttonAction = () => {
        setState({ ...state, isOpen: true, mode: "ADD" })
    }

    useEffect(() => {
        dispatch(fetchAllCoupons())
    }, [dispatch, coupons.length])

    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar buttonAction={buttonAction} title={"Add Coupon"} style={{ width: '100vw' }} />
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderTopRightRadius: '10px', borderBottomRightRadius: "10px", padding: "10px 0px", position: "fixed", width: "83vw", top: '80px', zIndex: 1 }}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Coupon Code</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Coupon Name</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Discount</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Expiry Date</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Status</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign} align={'center'}>Action</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                    {!!coupons && coupons.map((item, index) => (
                        <Grid item xs={12} key={index.toString()}>
                            <Grid container alignItems={'center'} style={{ border: '1px solid grey', borderRadius: '10px', backgroundColor: '#EFEFEF', padding: '5px' }}>
                                <Grid item xs={2}>
                                    <Typography align='center' >{item.name}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.code}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography align='center'>{item.percentage}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align='center'>{moment(item.end_date).format('MM/DD/YYYY')}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.status}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container textAlign='center'>
                                        <Grid item xs={12}>
                                            <Button variant='text' style={{ textTransform: 'none' }} onClick={() => editAction(item)}>Edit</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={'md'}>
                <Typography className={basicStyles.DialogHeading}>{state.mode === 'ADD' ? 'Add Coupon' : 'Edit Coupon'}</Typography>
                <DialogContent>
                    {state.mode === 'ADD' ? <AddCoupon closeAdd={handleClose} /> : <EditCoupon editCoupon={state.coupon} closeEdit={handleClose} />}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Coupon;