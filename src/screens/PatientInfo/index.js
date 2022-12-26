import React, { useEffect } from 'react';
import { Grid, Typography, Button, CardMedia, CardContent, Card, CardActions, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchProductById, addToCart } from '../../store/action/productManagementAction';
import Image from 'next/image'
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isHomeButton } from '../../store/reducers/productManagementReducer';

function DisplayProduct() {

    const router = useRouter();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productManagementReducer.products);
    const carts = useSelector((state) => state.productManagementReducer.carts);

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    const handleView = (param) => {
        router.push({ pathname: '/patientInfo/view-product', query: "productId=" + param.id })
        dispatch(fetchProductById(param.id))
        dispatch(isHomeButton(true))
    }

    const handleCart = (param) => {
        let productObj = {};
        productObj.id = param.id;
        productObj.name = param.name;
        productObj.price = param.price;
        productObj.count = 1;
        if (carts.filter((i) => i.id === param.id).length === 0) {
            dispatch(addToCart(productObj))
        }
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" backgroundColor={"#FFF"}>
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent={"center"}>
                    {products !== undefined && products.map((item, index) => (item.category !== undefined && item.category.code === "PDT" &&
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3} key={index.toString()}>
                            <Card sx={{ maxWidth: 350 }}>
                                <CardMedia>
                                    <Image src={`/${item.storage}`} alt="Package" height="230px" width={"280px"} />
                                </CardMedia>
                                <CardContent>
                                    <Grid item xs={12}>
                                        <Typography align= "center">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align = "center">{`$${item.price}`}</Typography>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Button variant={"text"} startIcon={<RemoveRedEyeIcon />} style={{ textTransform: "none", color: "#D19C97" }} onClick={() => handleView(item)}>View detail</Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant={"text"} onClick={() => handleCart(item)} startIcon={<ShoppingCartIcon />} style={{ textTransform: "none", color: "#D19C97" }}>Add to cart</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
DisplayProduct.getInitialProps = async (context) => {
    const { productId } = context.query;
    return { productId: productId };
};

export default DisplayProduct;