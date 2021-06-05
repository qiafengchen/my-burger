import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+ token, orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
            })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
    }
}

export const purchasedInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAILED,
        error:error
    }
}

export const fetchOrdersStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId) => {
  return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedData = [];
                for(let key in res.data){
                    fetchedData.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedData))
            })
            .catch(Error => {
                dispatch(fetchOrdersFailed(Error));
            })
        }
}