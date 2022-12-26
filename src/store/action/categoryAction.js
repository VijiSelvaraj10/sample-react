import { fetchCategory } from "../reducers/categoryReducer";
import API from '../../api/orderApi';

export function fetchAllCategories() {
    return async dispatch => {
        API.get("categories").then(async(response) => {
            // console.log("*****************" + JSON.stringify(response))
            if (response.status === "success") {
                await dispatch(fetchCategory(response.payload))
            }
        })
    }
}