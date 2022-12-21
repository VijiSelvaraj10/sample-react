import { fetchOrderById } from '../reducers/orderReducer';
import API from '../../api/orderApi';

export function fetchOrdersById(id) {
    API.get(`orders/${id}`).then((response) => {
       if( response.status === "success" ){
        dispatch(fetchOrderById(response.payload))
       }
    })
}
