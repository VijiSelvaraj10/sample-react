import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, paymentElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Button } from '@mui/material';
import { createNewOrder } from '../../store/action/orderAction';
import { styled } from '@mui/system';

const CardInputWrapper = styled(`div`)({
  border: "2px solid grey",
  borderRadius: "8px",
  padding: "10px 4px",
});

const inputStyle = {
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

export const CheckoutForm = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const elements = useElements(); // use element provider state
  const stripe = useStripe(); // stripe sdk
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.productManagementReducer.carts);
  const userSelectedCouponDetails = useSelector((state) => state.couponReducer.userSelectCoupon);

  const onSubmit = async () => {

    paymentElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: paymentElement,  // pass as card
    });

    if (!error) {

      const { id } = paymentMethod;

      let data = {};
      let memberDetails = {};
      memberDetails.first_name = props.data.first_name
      memberDetails.last_name = props.data.last_name;
      memberDetails.phone_number = props.data.phone_number;
      memberDetails.email = props.data.email;
      memberDetails.address_line1 = props.data.address_line1;
      memberDetails.address_line2 = props.data.address_line2;
      memberDetails.gender = props.data.gender;
      memberDetails.zip_code = props.data.zip_code;
      memberDetails.allergies = props.data.allergies;
      memberDetails.city = props.data.city;
      memberDetails.state = props.data.state;
      memberDetails.date_of_birth = props.data.date_of_birth;
      data.member = memberDetails;

      let allergies = {};
      allergies.is_allergy = props.detail.is_allergy;
      allergies.type = props.detail.type;
      allergies.medication = props.detail.medication;
      allergies.severity = props.detail.severity;
      allergies.value = props.detail.value;
      data.allergy = allergies;

      let orderData = {};
      orderData.name = props.data.first_name;
      orderData.phone_number = props.data.phone_number;
      orderData.shipping_address = props.data.address_line_1;
      orderData.status = props.data.status;
      orderData.total_price = props.total;
      orderData.products = carts.map((item) => item);
      orderData.paid_date = new Date();
      orderData.delivery_date = new Date(12 / 10 / 2022);
      orderData.delivery_at = new Date(13 / 10 / 2022);
      orderData.payment_type = "card";
      orderData.discount = !userSelectedCouponDetails ? 0 : userSelectedCouponDetails.discount;
      orderData.promotion_code = !userSelectedCouponDetails ? null : userSelectedCouponDetails.coupenCode;
      data.order = orderData;

      let paymentData = {
        amount: props.total,
        id: id,
      };

      data.payment = paymentData;
      dispatch(createNewOrder(data))

    } else {
      console.log("ERROR====>" + JSON.stringify(error))
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label>Card Number</label>
          <CardInputWrapper>
            <CardNumberElement
              options={{
                style: {
                  base: inputStyle,
                }
              }}
            />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={6}>
          <label>CVC</label>
          <CardInputWrapper>
            <CardCvcElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={6}>
          <label>Expiry Date</label>
          <CardInputWrapper>
            <CardExpiryElement />
          </CardInputWrapper>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Button variant={"contained"} style={{ textTransform: "none", float: "center", backgroundColor: '#f1b0b7', color: "#000" }} onClick={onSubmit}>Pay {`$${props.total}`}</Button>
        </Grid>
        {isLoading === true ? <CircularProgress /> : null}
      </Grid>
    </>
  );
};