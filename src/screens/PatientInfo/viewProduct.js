import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, IconButton, TextField } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, fetchAllProducts } from '../../store/action/productManagementAction';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveIcon from '@mui/icons-material/Remove';
import basicStyle from './index.module.scss';

function ViewProduct(props) {
    const [state, setState] = useState({
        count: 1,
        product: null
    })

    const dispatch = useDispatch();

    const products = useSelector((state) => state.productManagementReducer.products);
    const carts = useSelector((state) => state.productManagementReducer.carts);

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);

    useEffect(() => {
        updateProduct()
    }, [])

    const updateProduct = () => {
        setState({ ...state, product: products !== undefined && products.length > 0 && products.filter((item) => item.id == props.productId)[0] })
    }

    const handleAddCart = (item, count) => {
        let productObj = {};
        productObj.id = item.id
        productObj.name = item.name;
        productObj.price = item.price;
        productObj.count = count;
        if (carts.filter((i) => i.id === item.id).length === 0) {
            dispatch(addToCart(productObj))
        }
    }

    const handleIncrement = () => {
        setState({ ...state, count: state.count + 1 })
    }

    const handleDecrement = () => {
        setState({ ...state, count: state.count > 1 ? state.count - 1 : 1 })
    }

    const handleSelect = (param) => {
        let adonObj = {};
        adonObj.id = param.id
        adonObj.name = param.name;
        adonObj.price = param.price;
        adonObj.count = 1;
        dispatch(addToCart(adonObj))
    }

    return (
        <>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12}>
                    <Grid container justifyContent={"space-evenly"}>
                        <Grid item xs={12} sm={3} style={{ height: "50vh" }}>
                            <Image src={`/${state.product !== null && state.product.storage}`} alt='package' height='320px' width='300px' />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography fontWeight={500} fontSize={'30px'}>{state.product !== null && state.product.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontWeight={500} fontSize={'24px'}>Price: {`$${state.product !== null && state.product.price}`}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <Typography className={basicStyle.textView} style={{ wordBreak: "break-word" }}>{state.product !== null && state.product.description}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <Typography className={basicStyle.textView}>Quantity : </Typography>
                                    <IconButton className={basicStyle.iconButton} onClick={() => handleDecrement()}><RemoveIcon /></IconButton>
                                    <TextField
                                        value={state.count}
                                        InputProps={{ sx: { width: "45px", height: "40px", borderRadius: '0px' } }}
                                        onChange={(e) => setState({ ...state, count: e.target.value })}
                                    />
                                    <IconButton className={basicStyle.iconButton} onClick={() => handleIncrement()}><AddSharpIcon /></IconButton>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={8}>
                                    <Button variant="contained" style={{ backgroundColor: '#f1b0b7', color: "#000", fontWeight: 500, textTransform: "none" }} onClick={() => handleAddCart(state.product, state.count)}>Add To Cart</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography fontWeight={500} fontSize={'20px'}>Related Products</Typography>
                        </Grid>
                        {state.product !== null && state.product.relatedProduct !== undefined && state.product.relatedProduct.length > 0 && state.product.relatedProduct.map((item, index) => (
                            <Grid item xs={6} sm={2} key={index.toString()}>
                                <Grid container spacing={2} justifyContent={"center"}>
                                    <Grid item xs={12}>
                                        <Image src={`/${products.find((value) => value.id === item.related_product_id).storage}`} alt="png" height="200px" width="200px" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align={"center"} className={basicStyle.text}>{item.name}</Typography>
                                    </Grid>
                                    {products.map((param, index) => (param.name === item.name &&
                                        <div key={index.toString()}>
                                            <Grid item xs={12} >
                                                <Typography align={"center"} className={basicStyle.text}>Price: {`$${param.price}`}</Typography>
                                            </Grid>
                                            <Grid item xs={12} textAlign={"center"}>
                                                <Button variant={"contained"} style={{ backgroundColor: '#f1b0b7', color: "#000", fontWeight: 500, textTransform: "none" }} onClick={() => handleSelect(param)}>Add to cart</Button>
                                            </Grid>
                                        </div>
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

ViewProduct.getInitialProps = async (context) => {
    const { productId } = context.query;
    return { productId: productId };
};
export default ViewProduct;