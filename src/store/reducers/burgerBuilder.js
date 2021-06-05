import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    meat:1.5,
    bacon: 1
}

const initialState = {
    ingredients:null,
    price:4,
    error:false,
    building:false
}

const addIngredient = (state, action) => {
        const updatedIngredient = {[action.inType]:state.ingredients[action.inType] + 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            price:state.price + INGREDIENT_PRICE[action.inType],
            building:true
        }
        return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
        const updatedIngredient = {[action.inType]:state.ingredients[action.inType] - 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            price:state.price - INGREDIENT_PRICE[action.inType],
            building:true
        }
        return updateObject(state, updatedState);
}



const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false,
                price:4,
                building:false
            }
        case actionTypes.FETCHINGREDIENTFAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
}

export default reducer;