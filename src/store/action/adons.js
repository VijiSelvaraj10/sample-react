import { fetchAdons, addAdons } from "../reducers/adon";
import API from '../../api/orderApi';

export function fetchAllAdons () {
    return async dispatch => {
        API.get("adons").then((response) => {
            if(response.status === "success"){
                dispatch(fetchAdons(response.payload));
            }
        })
    }
}

export function createAdons (data, setState) {
    return async dispatch => {
        API.post("adons", data).then((response) => {
            if(response.status === "success"){
                dispatch(addAdons(response.payload));
                setState();                
            }
        })
    }
}