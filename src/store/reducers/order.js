import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading:false,
    purchased:false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS :
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
            return {
                ...state,
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading:false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return {
                ...state,
                loading:false,
                error:false,
                orders:action.orders
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading:false,
                error:true
            }
        default:
            return state;
    }
}

export default reducer;