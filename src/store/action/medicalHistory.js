import { fetchHistories } from "../reducers/medicalHistory";
import API from '../../api/orderApi';

export function fetchMedicalHistories() {
    return async dispatch => {
        API.get(`medical-histories`).then((response) => {
            if (response.status === "success") {
                dispatch(fetchHistories(response.payload))
            }
        })
    }
}

export function createMedicalHistories(data) {
    return async dispatch => {
        API.post(`medical-histories`, data).then((response) => {
            console.log("data===>"+JSON.stringify(response.payload))
            if (response.status === "success") {
                dispatch(fetchMedicalHistories(response.payload))
            }
        })
    }
}

