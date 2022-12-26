import { fetchOrderById, fetchOrders } from '../reducers/orderReducer';
import { removeCart } from '../reducers/productManagementReducer';
import API from '../../api/orderApi';
import Router from 'next/router';

export function fetchOrdersByMemberId(id) {
    return async dispatch => {
        API.get(`orders/${id}`).then((response) => {
            if (response.status === "success") {
                dispatch(fetchOrderById(response.payload))
                // console.log("&&&&&&&" + JSON.stringify(response.payload))
            }
        })
    }
}
export function fetchAllOrders() {
    return async dispatch => {
        API.get(`orders`).then((response) => {
            if (response.status === "success") {
                dispatch(fetchOrders(response.payload))
            }
        })
    }
}

export function createNewOrder(data) {
    return async dispatch => {
        API.post(`orders/createNewOrder`, data).then((response) => {
            if (response.status === "success") {
                dispatch(removeCart())
                Router.push('/');

            }
        })
    }
}
