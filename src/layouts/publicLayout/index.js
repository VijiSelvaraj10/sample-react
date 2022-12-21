
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Snackbar, Alert, TextField, IconButton, AppBar, Badge } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { isHomeButton } from '../../store/reducers/productManagementReducer';

// import { addToCart } from '../../store/action/productManagementAction';


// export const withMediaQuery = (queries = []) => Component => props => {
//    const mediaProps = {}
//    queries.forEach(q => {
//       mediaProps[q[0]] = useMediaQuery(q[1])
//    })
//    return <Component {...mediaProps} {...props} />
// }

function PublicLayout(props) {

   useEffect(() => {
      carts
   }, []);

   const router = useRouter();
   const dispatch = useDispatch();

   const carts = useSelector((state) => state.productManagementReducer.carts)
   const IsHomeButton = useSelector((state) => state.productManagementReducer.isHomeButton)

   const viewCart = () => {
      router.push({ pathname: '/patientInfo/cart' })
      dispatch(isHomeButton(true))
   }

   const handleProductView = () => {
      router.push({ pathname: '/patientInfo' })
      dispatch(isHomeButton(false))
   }

   const handleAdminView = () => {
      router.push({ pathname: '/' })
   }

   const { title, children, classes, isDesktop, alertMessage, openAlert, alertSeverity } = props;
   return (
      <>
         <AppBar position={"fixed"}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
               <Grid item xs={12} style={{ backgroundColor: '#e1e7ff', color: '#000', padding: "10px" }}>
                  <Grid container alignItems={"center"}>
                     <Grid item xs={4}>
                        <Typography style={{ fontSize: "18px" }}>Vitality Treasure valley</Typography>
                     </Grid>
                     <Grid item xs={4}>
                        <TextField size={"small"} placeholder={"Search for products"} fullWidth InputProps={{ sx: { backgroundColor: "#000", color: "#FFF" } }} />
                     </Grid>
                     {IsHomeButton &&
                        <Grid item xs={1} textAlign="center">
                           <IconButton onClick={() => handleProductView()}><HomeIcon /></IconButton>
                        </Grid>
                     }
                     <Grid item xs={2} textAlign="center">
                        <IconButton size="medium" style={{ color: "#000" }} onClick={() => viewCart()}> <Badge badgeContent={carts.length} color="secondary"><AddShoppingCartOutlinedIcon /></Badge></IconButton>
                     </Grid>
                     <Grid item xs={1}>
                        <IconButton onClick={() => handleAdminView()}><AccountCircleIcon /></IconButton>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </AppBar>
         <main style={{ minHeight: '80vh', marginTop: "75px" }}>
            {children}
         </main>
      </>
   )
}
export default PublicLayout;