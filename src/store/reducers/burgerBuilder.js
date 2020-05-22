import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const operateIngredient = (state, action, op) => {
    const newIngredient = {}
    newIngredient[action.ingredientName] = state.ingredients[action.ingredientName] + (op === '+' ? 1 : -1)
    const updatedIngredients = updateObject(state.ingredients, newIngredient)
    const updatedState = {
        ingredients: updatedIngredients, 
        totalPrice: state.totalPrice + (op === '+' ? INGREDIENT_PRICES[action.ingredientName] : -1*INGREDIENT_PRICES[action.ingredientName]),
        building: true
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return operateIngredient(state,action,'+')
        case actionTypes.REMOVE_INGREDIENT: return operateIngredient(state,action,'-')
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default:
            return state;
    }

}

export default reducer