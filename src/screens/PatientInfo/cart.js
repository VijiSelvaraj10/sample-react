import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField, Table, TableHead, TableRow, TableBody, TableCell, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { updateToCart } from '../../store/action/productManagementAction';
import { reloadCart } from '../../store/reducers/productManagementReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveIcon from '@mui/icons-material/Remove';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useRouter } from 'next/router';
import { fetchAllCoupons } from "../../store/action/couponAction";
import { connect } from 'react-redux'
import { userApplyCoupon } from '../../store/reducers/couponReducer';
import basicStyle from './index.module.scss';

function Cart(props) {
    const [state, setState] = useState({
        count: 1,
        cart: [],
        total: 0,
        isOpen: false,
        isCoupon: false,
        discount: "",
        total: "",
        shippingCharge: "10",
        selectCart: null,
        discountName: "",
    })

    const router = useRouter();
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.productManagementReducer.carts)

    useEffect(() => {
        dispatch(fetchAllCoupons())
    }, [dispatch])

    const handleIncrement = (param) => {
        let productObj = {};
        productObj.id = param.id;
        productObj.name = param.name;
        productObj.price = param.price;
        productObj.count = param.count + 1
        let carting = carts.map((item) => item.id === param.id ? productObj : item);
        dispatch(reloadCart(carting))
    }

    const handleDecrement = (param) => {
        let productObj = {};
        productObj.id = param.id
        productObj.name = param.name;
        productObj.price = param.price
        productObj.count = param.count - 1
        let carting = carts.map((item) => item.id === param.id ? productObj : item);
        dispatch(reloadCart(carting))
    }

    const handlePatient = (param) => {
        dispatch(updateToCart(param))
        
        router.push({ pathname: "/patientInfo/patient-info" })
    }

    const handleAction = (param) => {
        if (param === "y") {
            let carting = carts.filter((item) => item.id !== state.selectCart.id);
            setState({ ...state, cart: carting, isOpen: false })
            dispatch(reloadCart(carting))
        } else {
            setState({ ...state, isOpen: false })
        }
    }

    const handleOpen = (param) => {
        setState({ ...state, isOpen: true, selectCart: param })
    }

    const handleCoupon = () => {
        setState({ ...state, isCoupon: true })
    }

    const handleCouponClose = () => {
        setState({ ...state, isCoupon: false })
    }
    let discountPrice = carts.map((item) => (item.price * item.count)).reduce((acc, cur) => acc + cur, 0)
    
    const handleApply = (param) => {
        // let discountPrice = carts.map((item) => (item.price * item.count)).reduce((acc, cur) => acc + cur, 0)
        let dis = parseInt(discountPrice) - parseInt(param.flat_amount) + parseInt(state.shippingCharge)
        setState({ ...state, discount: param.flat_amount, total: dis, isCoupon: false, discountName: param.name })
        dispatch(userApplyCoupon({ "coupenCode": param.name, "discount": parseInt(param.flat_amount) }))
    }

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography>Products</Typography></TableCell>
                                <TableCell><Typography>Price</Typography></TableCell>
                                <TableCell><Typography>quantity</Typography></TableCell>
                                <TableCell><Typography>Total</Typography></TableCell>
                                <TableCell><Typography>Remove</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carts && carts.length > 0 && carts.map((item, index) => (
                                <TableRow key={index.toString()}>
                                    <TableCell> <Typography>{item.name}</Typography></TableCell>
                                    <TableCell> <Typography>{`$${item.price}`}</Typography></TableCell>
                                    <TableCell>{item.count > 1 && <IconButton className={basicStyle.iconButton} onClick={() => handleDecrement(item)}><RemoveIcon /></IconButton>}
                                        <TextField value={item.count} InputProps={{ sx: { width: "45px", height: "40px", borderRadius: '0px' } }} />
                                        <IconButton className={basicStyle.iconButton} onClick={() => handleIncrement(item)}><AddSharpIcon /></IconButton></TableCell>
                                    <TableCell><Typography>{`$${(item.count * item.price)}`}</Typography></TableCell>
                                    <TableCell><IconButton onClick={() => handleOpen(item)}><DisabledByDefaultIcon /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} sm={3} style={{ border: "2px solid #000", borderRadius: "10px" }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField size="small" placeholder={"Coupon code"} />
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={() => handleCoupon()} variant="contained" fullWidth className={basicStyle.iconButton} style={{ textTransform: "none", borderTopLeftRadius: "1px" }}>View</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={() => handleCoupon()} variant="contained" fullWidth className={basicStyle.iconButton} style={{textTransform: "none", borderTopRightRadius: "10px", borderTopLeftRadius: "1px" }}>Apply</Button>
                        </Grid>
                        <Grid item xs={12} style={{ padding: "15px", backgroundColor: '#e1e7ff' }}>
                            <Typography className={basicStyle.text}>Cart Summary</Typography>
                        </Grid>
                        <Grid container spacing={2} style={{ padding: "0px 10px" }}>
                            <Grid item xs={12}>
                                <Typography className={basicStyle.cartHeading} >Products</Typography>
                            </Grid>
                            {carts !== undefined && carts.map((item, index) => (
                                <Grid item xs={12} key={index.toString()}>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <Typography className={basicStyle.listTextCart}>{index + 1}. {item.name}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography align={"center"}>{`${item.count}X`}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography align={"right"}>{`$${item.count * item.price}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                        <Typography className={basicStyle.cartHeading}>Shipping charges</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography align={"right"}>+</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography align={"right"}>{`$${state.shippingCharge}`}</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography className={basicStyle.cartHeading}>Discount<span> ( {state.discountName} )</span></Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography align={"right"}>-</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography align={"right"}>{`$${!state.discount ? 0 : state.discount}`}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={basicStyle.cartHeading}>Total</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align={"right"}>{`$${!state.total ? parseInt(discountPrice) + parseInt(state.shippingCharge) : state.total} `}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {carts !== undefined && carts.length > 0 &&
                            <Grid item xs={12} textAlign={"center"}>
                                <Button variant={"contained"} fullWidth onClick={() => handlePatient(carts)} className={basicStyle.iconButton} style={{ textTransform: "none", float: "center", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }}>Proceed to checkout</Button>
                            </Grid>
                        }
                    </Grid>
                    <Dialog open={state.isCoupon} onClose={() => handleCouponClose()} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '10px' } }}>
                        <DialogTitle style={{ backgroundColor: '#e1e7ff' }} >
                            <Typography align={"center"} className={basicStyle.cartHeading}>View Coupons</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} style={{ paddingTop: "10px" }}>
                                {props.coupons !== undefined && props.coupons.map((item, index) =>
                                    <Grid item xs={12} key={index.toString()}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography>{item.name}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>{`$${item.flat_amount}`}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant={"contained"} onClick={() => handleApply(item)} style={{ textTransform: "none" }} className={basicStyle.iconButton}>Apply</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={state.isOpen} onClose={() => handleNo()} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
                        <DialogTitle style={{ backgroundColor: '#e1e7ff' }}  >
                            <Typography align={"center"} className={basicStyle.textView}>Delete Confirmation !</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography align={"center"} className={basicStyle.textView} padding={'20px'}>Are you sure want to delete <b>{state.selectCart !== null && state.selectCart.name}</b> ?</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant={'contained'} style={{ float: "right", fontWeight: "bold", backgroundColor: 'tomato' }} onClick={() => handleAction("n")}>No</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant={'contained'} style={{ float: "left", fontWeight: "bold", backgroundColor: 'slateblue' }} onClick={() => handleAction("y")}>Yes</Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </Grid>
            </Grid>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        coupons: state.couponReducer.coupons,
    }
}
export default connect(mapStateToProps)(Cart);
