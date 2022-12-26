import { fetchProduct, addProduct, updateProduct, addProductAdon, fetchProductId, addCart, updateCart } from '../reducers/productManagementReducer';
import API from '../../api/orderApi';


export function fetchAllProducts() {
  return async dispatch => {
    API.get("products").then((response) => {
      if (response.status === "success") {
        // console.log("*************"+JSON.stringify(response))
        dispatch(fetchProduct(response.payload))
      }
    })
  }
}



export function addToCart(data) {
  return async dispatch => {
    dispatch(addCart(data))
  }
}

export function updateToCart(data) {
  return async dispatch => {
    dispatch(updateCart(data))
  }
}

export function fetchProductById(id) {
  return async dispatch => {
    API.get(`products/${id}`).then((response) => {
      if (response.status === "success") {
        dispatch(fetchProductId(response.payload))
      }
    })
  }
}

export function createProductAction(data, setState) {
  return async dispatch => {
    API.post("products", data).then(async (response) => {
      if (response.status === "success") {
        await dispatch(addProduct(response.payload))
        setState();
      }
    })
  }
}

export function updateProductAction(data, setState) {
  return async dispatch => {
    API.put(`products/${data.id}`, data).then(async (response) => {
      if (response.status === "success") {
        await dispatch(fetchAllProducts(response.payload))
        setState();
      }
    })
  }
}

export function createProductAdonAction(data, state,setState) {
  return async dispatch => {
    console.log("*******in*****"+JSON.stringify(data))
    API.post(`adons`, data).then(async (response) => {
      if (response.status === "success") {
        console.log("*******response*****"+JSON.stringify(response))
        dispatch(fetchAllProducts())
         setState({...state, isAdon:false})
        }
    })
  }
}




