import API from '../../api/orderApi';
import { createAccount } from '../reducers/sessionReducer';
import Router from 'next/router'

export function createSignUpAction (data) {
    return async dispatch => {
        API.post("user/Sign-up", data).then((response)=> {
            if(response.status === "success") {
                dispatch(createAccount(response.payload))
            }
        })
    }
}