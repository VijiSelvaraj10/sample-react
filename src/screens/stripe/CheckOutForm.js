import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { payment } from '../../store/action/memberAction';
import { useDispatch, useSelector, } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Button } from '@mui/material';

export const CreateCardPayment = () => {
  // const [name, setName] = useState("");
  const [isLoading, setisLoading] = useState(false)
  const elements = useElements(); // use element provider state
  const stripe = useStripe(); // stripe sdk
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.productManagementReducer.carts);

  const inputStyle = {
    iconColor: '#000',
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#EFEFEF',
    },
  }

  // const CardInputWrapper = {
  //   border: "2px solid #00f",
  //   borderRadius: "8px",
  //   padding: "20px 4px",
  // }

  const onSubmit = async (event) => {
    setisLoading(true)
    event.preventDefault();
    const cardNumberElement = elements.getElement(CardNumberElement);
    
    console.log("***************isLoad"+isLoading)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,  // pass as card
      // billing_details: {
      //   name, // name of the user
      // },
    });

    if (!error) {
      const { id } = paymentMethod
      let data = {
        amount: carts.map((item) => (item.price * item.count)).reduce((acc, cur) => acc + cur, 0),
        id: id,
      }
      dispatch(payment(data))
    }else{
      console.log("ERROR====>"+JSON.stringify(error))
    }
  }
  
  return (
    <>
      {/* <CardInputWrapper>  */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardNumberElement
            options={{
              style: {
                base: inputStyle,
              }
            }}
          />
        </Grid>
        <Grid item xs={6} border={"2px solid green"}>
          <CardCvcElement />
        </Grid>
        <Grid item xs={6}>
          <CardExpiryElement />
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Button variant={"contained"} style={{ textTransform: "none", float: "center", backgroundColor: '#f1b0b7', color: "#000" }} onClick={onSubmit}>Pay with card</Button>
        </Grid>
        {setisLoading === true ?  <CircularProgress /> : null}
      </Grid>
      {/* </CardInputWrapper> */}

    </>

  );
};