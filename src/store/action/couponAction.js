import { fetchCoupons } from '../reducers/couponReducer';
import API from '../../api/orderApi';

export function fetchAllCoupons () {
    return async dispatch => {
        API.get("coupons").then((response)=> {
            if(response.status === "success") {
                dispatch(fetchCoupons(response.payload))
            }

        })
    }
}

export function createCoupons (data, props) {
    return async dispatch => {
        API.post("coupons", data).then((response)=> {
            if(response.status === "success") {
                dispatch(fetchAllCoupons())
                props.closeAdd();
            }
        })
    }
}

export function updateCoupons (data, props) {
    return async dispatch => {
        API.put(`coupons/${data.id}`, data).then((response)=> {
            if(response.status === "success") {
                dispatch(fetchAllCoupons())
                props.closeEdit();
            }
        })
    }
}