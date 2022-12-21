import { ORDER_API_END_POINT } from "../helpers/constant";
import axios from 'axios';



function parseResponse(response) {  
    return response.json().then((json) => {      
        if (json.status === "success" || json.status === "failed") {
            return json;
        }
        return Promise.reject(json);
    });
}

// function parseAxiosResponse(response) {
// 	if (response.statusText === "OK" || response.status === 200) {
// 		return response.data
// 	} else {
// 		return Promise.reject(response.statusText);
// 	}
// }
const ORDERAPI = {
    //get url access  
    async get(url) {
        try {
            const response = await fetch(`${ORDER_API_END_POINT}${url}`, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
            return parseResponse(response);
        } catch (err) {
            console.log(err);
        }
    },

    async post(url, data) {
        const body = JSON.stringify(data);
        return fetch(`${ORDER_API_END_POINT}${url}`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body,
        })
            .then(parseResponse)
    },

    //put url access
    async put(url, data) {
        const body = JSON.stringify(data);

        return fetch(`${ORDER_API_END_POINT}${url}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body,
        })
            .then(parseResponse)
    },
}

export default ORDERAPI;