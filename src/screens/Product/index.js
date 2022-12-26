import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, IconButton, Dialog, DialogContent, TextField, MenuItem, InputAdornment, Autocomplete } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import basicStyles from './index.module.scss';
import { fetchAllProducts, createProductAction, updateProductAction, createProductAdonAction } from '../../store/action/productManagementAction';
import { fetchAllCategories } from '../../store/action/categoryAction';
import { useSelector, useDispatch } from 'react-redux';
import TopBar from '../../components/TopBar';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import _ from 'underscore';

function Product() {
    const [state, setState] = useState({
        isOpen: false,
        isAdon: false,
        productName: '',
        category_id: '',
        price: '',
        description: '',
        quantity: '',
        futureInventory: '',
        status: 'Active',
        product_name_error: false,
        description_error: false,
        id: "",
        isSubmit: false,
        mode: null,
        selected: [],
        adonName: "",
        selectedRelatedProductId: []
    })

    const products = useSelector((state) => state.productManagementReducer.products);
    const categories = useSelector((state) => state.categoryReducer.categories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts())
        dispatch(fetchAllCategories())
    }, [dispatch, products.length]);

    let listProduct = products !== undefined && products.length > 0 ? products.filter((item) => item.category !== undefined && item.category.code === "ADN" ? item : null) : []
    // console.log("********88"+JSON.stringify(listProduct))
    const editProduct = (param) => {
        setState({ ...state, isOpen: true, productName: param.name, description: param.description, status: param.status, futureInventory: param.ordered_quantity, quantity: param.quantity, price: param.price, id: param.id, mode: "EDIT", category_id: param.category_id })
    }

    const handleClose = () => {
        setState({ ...state, isOpen: false })
    }

    const handleCancel = () => {
        setState({ ...state, isOpen: false })
    }

    const adonAdd = (item) => {
        let selectedRelatedProductId = _.pluck(item.relatedProduct, "related_product_id")
        let result = products.filter((item) => item.category.code === "ADN" && selectedRelatedProductId.includes(item.id))
        setState({ ...state, isAdon: true, productName: item.name, id: item.id, mode: "ADONADD", selected: result, selectedRelatedProductId: [...selectedRelatedProductId] })
    }

    const adonClose = () => {
        setState({ ...state, isAdon: false, selected: [] })
    }

    const handleSumbit = () => {
        let isError = false;
        if (state.productName === null || state.productName === "" || state.productName === undefined) {
            setState({ ...state, product_name_error: true });
            isError = true;
        }
        if (state.description === null || state.description === "" || state.description === undefined) {
            setState({ ...state, description_error: true });
            isError = true;
        }
        if (isError === false) {
            let data = {};
            data.id = state.id;
            data.category_id = state.category_id;
            data.name = state.productName;
            data.description = state.description;
            data.status = state.status;
            data.quantity = state.quantity;
            data.ordered_quantity = state.futureInventory;
            data.price = state.price;
            data.lower_threshold = 11;
            data.product_code = "AAAA";
            if (state.mode === "ADD") {
                dispatch(createProductAction(data, () => setState({ ...state, isOpen: false })))
            }
            if (state.mode === "EDIT") {
                dispatch(updateProductAction(data, () => setState({ ...state, isOpen: false })))
            }
        }
    }

    const AdonSubmit = () => {
        let data = {};
        data.product_id = state.id;
        data.related_product_id = _.pluck(state.selected, "id");
        data.status = state.status;
        if (state.mode === "ADONADD") {
            dispatch(createProductAdonAction(data, state, setState))
        }
    }

    const buttonAction = () => {
        setState({ ...state, isOpen: true, mode: "ADD" })
    }

    const handleText = (event, value) => {
        event.preventDefault();
        if (state.selected.filter((item) => item.id === value.id).length > 0) {
            setState({
                ...state,
                selected: state.selected.filter((item) => item.id !== value.id),
                selectedRelatedProductId: _.pluck(state.selected.filter((item) => item.id !== value.id), "id")
            })
        } else {
            setState({
                ...state,
                selected: [...value],
                selectedRelatedProductId: _.pluck(state.value, "id"),
            })
        }
    }

    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar buttonAction={buttonAction} title={"Add Product"} />
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', padding: "10px", position: "fixed", width: "83vw", top: '80px', zIndex: 1 }}>
                    <Grid container >
                        <Grid item xs={2}>
                            <Typography align="center" className={basicStyles.textDesign}>Product Name</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={basicStyles.textDesign}>Description</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography align="center" className={basicStyles.textDesign}>Status</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign}>Inventory</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={basicStyles.textDesign}>Adon</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className={basicStyles.textDesign}>Action</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className={basicStyles.textDesign}>Ads</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                    {products.length > 0 && products.map((item, index) => (item.category !== undefined && item.category.code === "PDT" &&
                        <Grid item xs={12} key={index.toString()} >
                            <Grid container justifyContent='center' alignItems='center' style={{ border: '1px solid grey', backgroundColor: '#EFEFEF', borderRadius: '10px', position: 'relative' }}>
                                <Grid item xs={2}>
                                    <Typography marginLeft={1} align={"left"}>{item.name}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align={"center"} style={{ wordBreak: "break-word" }}>{item.description}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography align={"center"}>{item.status}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align={"center"}>{item.quantity}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align={"center"}>{item.relatedProduct.map((name, index) => name.name + `${(index === item.relatedProduct.length - 1) ? '' : ', '}`)}</Typography>
                                </Grid>
                                <Grid item xs={1} textAlign="center">
                                    <IconButton onClick={() => editProduct(item)}> <FaEdit color='#405D99' /></IconButton>
                                </Grid>
                                <Grid item xs={1} textAlign="center">
                                    <IconButton onClick={() => adonAdd(item)}> <AddSharpIcon color='#405D99' /></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={'md'}>
                <Typography className={basicStyles.DialogHeading}> {state.mode === "ADD" ? "Add Product" : "Edit Product"}</Typography>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={10}>
                                <Grid item xs={6}>
                                    <Typography>Category</Typography>
                                    <TextField select
                                        size="small"
                                        fullWidth
                                        placeholder='Enter product'
                                        value={state.category_id}
                                        onChange={(e) => setState({ ...state, category_id: e.target.value })}
                                        InputProps={{ sx: { borderRadius: "5px" } }}>
                                        {categories !== null && categories.map((item, index) => (
                                            <MenuItem key={index.toString()} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Product Name</Typography>
                                    <TextField size='small'
                                        value={state.productName}
                                        fullWidth
                                        placeholder='Enter product'
                                        InputProps={{ endAdornment: (<InputAdornment position='end'><IconButton><GrEdit /></IconButton></InputAdornment>), sx: { borderRadius: '5px' } }}
                                        onChange={(e) => setState({ ...state, productName: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1), product_name_error: false })}
                                        error={state.product_name_error}
                                        helperText={state.product_name_error === true ? "Please enter the product Name" : null} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={10}>
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
                                <Grid item xs={6}>
                                    <Typography>Future Inventory</Typography>
                                    <TextField size='small'
                                        InputProps={{ endAdornment: (<InputAdornment position='start'><IconButton><GrEdit /></IconButton></InputAdornment>), sx: { borderRadius: '5px' } }}
                                        fullWidth
                                        value={state.futureInventory}
                                        onChange={(event) => setState({ ...state, futureInventory: event.target.value })} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={10}>
                                <Grid item xs={6}>
                                    <Typography>Price</Typography>
                                    <TextField size='small'
                                        fullWidth
                                        placeholder='Enter price'
                                        value={state.price}
                                        InputProps={{ endAdornment: (<InputAdornment position='end'><IconButton><GrEdit /></IconButton></InputAdornment>), sx: { borderRadius: '5px' } }}
                                        onChange={(e) => setState({ ...state, price: e.target.value, product_name_error: false })} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Current Inventory</Typography>
                                    <TextField size='small'
                                        placeholder='Enter current inventory'
                                        value={state.quantity}
                                        fullWidth
                                        InputProps={{ endAdornment: (<InputAdornment position='start'><IconButton><GrEdit /></IconButton></InputAdornment>), sx: { borderRadius: '5px' } }}
                                        onChange={(e) => setState({ ...state, quantity: e.target.value })} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Details</Typography>
                            <TextField size='small'
                                fullWidth
                                value={state.description}
                                placeholder={"Please enter description"}
                                minRows={4}
                                multiline
                                error={state.description_error}
                                helperText={state.description_error && "please"}
                                InputProps={{ endAdornment: (<InputAdornment position='start'><IconButton><GrEdit /></IconButton></InputAdornment>), sx: { borderRadius: '5px' } }}
                                onChange={(e) => setState({ ...state, description: e.target.value, description_error: false })} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} textAlign={"right"}>
                                    <Button variant="outlined" style={{ textTransform: "none" }} onClick={() => handleCancel()}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => handleSumbit()}>{state.mode === "ADD" ? "Submit" : "Update"}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={state.isAdon} onClose={() => adonClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={'md'}>
                <Typography className={basicStyles.DialogHeading}>Add Adons</Typography>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Typography>Product</Typography>
                                    <TextField size="small"
                                        value={state.productName}
                                        disabled
                                        fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Ad-ons</Typography>
                                    <Autocomplete
                                        size="small"
                                        multiple
                                        options={listProduct}
                                        defaultValue={state.selected}
                                        disableCloseOnSelect
                                        filterSelectedOptions
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, value) => handleText(e, value)}
                                        renderOption={(props, option) =>
                                            <li {...props}>
                                                {`${option.name}`}
                                            </li>
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Typography>Status</Typography>
                                    <TextField size='small'
                                        value={state.status}
                                        select
                                        defaultValue={"Active"}
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
                                    <Button variant="outlined" style={{ textTransform: "none" }} onClick={() => adonClose()}>Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" style={{ textTransform: "none" }} onClick={() => AdonSubmit()} >{state.isAdon ? "Submit" : "Update"}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Product;
