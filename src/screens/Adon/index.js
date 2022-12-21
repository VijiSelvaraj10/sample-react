import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import basicStyles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux'
// import { createAdons, fetchAllAdons } from '../../store/action/adons';
import { fetchAllProducts } from '../../store/action/productManagementAction';
import TopBar from '../../components/TopBar';

function Adon(props) {
    const [state, setState] = useState({
        isOpen: false,
        product: '',
        productId: null,
        adon: '',
        relatedProductId: null,
        status: 'Active',
        productError: false,
        adonError: false,
        isSubmit: false,
        mode: null,
        selected: []
    });

    const products = useSelector((state) => state.productManagementReducer.products);

    const dispatch = useDispatch();

    // const editProduct = (param) => {
    //     alert("Work under progress")
    // }
    const handleClose = () => {
        setState({ ...state, isOpen: false })
    }
    // const handleCancel = () => {
    //     setState({ ...state, isOpen: false })
    // }
    // const buttonAction = () => {
    //     setState({ ...state, isOpen: true, mode: "ADD" })
    // }
    // const handleSumbit = () => {
    //     let data = {};
    //     data.product_id = state.productId;
    //         data.related_product_id = state.relatedProductId;
    //         data.status = state.status;
    //     if (state.mode === "ADD") {
    //         dispatch(createAdons(data, () => setState({ ...state, isOpen: false })))
    //     }
    // }
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch, products.length])

    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar
                //  buttonAction={() => buttonAction()} 
                 title ={"Add Product"} />
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', padding: '10px', position: "fixed", width: "79rem", top: '80px', zIndex: 1 }}>
                    <Grid container justifyContent='center' alignItems={"center"}>
                        <Grid item xs={3}>
                            <Typography align="left" className={basicStyles.textDesign}>Product Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={basicStyles.textDesign}>Description</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign}>Status</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className={basicStyles.textDesign}>Action</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                    {products.map((item, index) => (item.category !== undefined && item.category.code === "ADN" &&
                        <Grid item xs={12} key={index.toString()} position="relative">
                            <Grid container justifyContent='center' alignItems='center' style={{ border: '1px solid grey', backgroundColor: '#EFEFEF', borderRadius: '10px', padding: "5px" }}>
                                <Grid item xs={3}>
                                    <Typography>{item.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="center">{item.description}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align="center">{item.status}</Typography>
                                </Grid>
                                <Grid item xs={1} textAlign={"center"}>
                                    <IconButton 
                                    // onClick={() => editProduct()}
                                    ><FaEdit color='#405D99' /></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {/* <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }}>
                <Typography color={"#FFF"} style={{ backgroundColor: '#1368E9', padding: "15px", fontSize: "24px" }}>Add Ad-ons</Typography>
                <DialogContent style={{ borderRadius: '20px' }}>
                    <Grid container spacing={2}>                                         
                                <Grid item xs={6}>
                                    <Typography> Product</Typography>
                                    <TextField size="small"
                                        fullWidth
                                        select
                                        InputProps={{ sx: { borderRadius: '5px' } }}
                                        onChange={(e) => setState({ ...state, productId: e.target.value })}
                                        value={state.productId}>
                                        {products !== undefined && products.map((item, index) => (item.category !== undefined && item.category.code === "PDT" &&
                                            <MenuItem key={index.toString()} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Ad-ons</Typography>
                                    <Select size="small"
                                        fullWidth
                                        multiple
                                        InputProps={{ sx: { borderRadius: '5px' } }}
                                        onChange={(e) => setState({ ...state, selected: [...e.target.value] })}
                                        value={state.selected}>
                                        {products !== undefined && products.map((item, index) => (item.category !== undefined && item.category.code === "ADN" &&
                                            <MenuItem key={index.toString()} value={item}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>                          
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Status</Typography>
                                    <TextField size='small'
                                        value={state.status}
                                        select
                                        onChange={(e) => setState({ ...state, status: e.target.value })}
                                        InputProps={{ sx: { borderRadius: '5px' } }}
                                        fullWidth>
                                        <MenuItem value={'Active'}>Active</MenuItem>
                                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={6} textAlign={"right"}>
                                    <Button variant="outlined" style={{ textTransform: "none" }} onClick={() => handleCancel()}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => { state.mode === "ADD" ? handleSumbit() : null }}>{state.mode === "ADD" ? "Submit" : "Update"}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog> */}
        </>
    )
}
export default Adon;