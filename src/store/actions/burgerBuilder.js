import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        inType:name
    }
}

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        inType:name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type:actionTypes.FETCHINGREDIENTFAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
               dispatch(setIngredient(res.data));
            })
            .catch(error=>{
                dispatch(fetchIngredientFailed());
            });
    }
}

