import React, {useState, useEffect, useCallback} from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { useDispatch, useSelector } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import * as actions from '../../store/actions/index'


const burgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch()
    
    const {ings,total,error,isAuthenticated} = useSelector(state => {
        return {
            ings: state.burgerBuilder.ingredients,
            total: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuthenticated: state.auth.token !== null
        }
    })
    

    const onIngredientAdd = (ingredient) => dispatch(actions.addIngredient(ingredient))
    const onIngredientRemove = (ingredient) => dispatch(actions.removeIngredient(ingredient))
    const onIngredientInit = useCallback(() => dispatch(actions.initIngredients()),[dispatch])
    const onPurchaseInit = () => dispatch(actions.initPurchase())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onIngredientInit()
    },[onIngredientInit])

    
    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
        
    }

    const purchaseCancelledHandler =  () => {
        setPurchasing(false)
    }

    const purchaseContinuedHandler =  () => {
        onPurchaseInit()
        props.history.push('/checkout')
    }

    const canPurchase = (ingredients) => {

        const sum = Object.keys(ingredients).map((igK) => (
            ingredients[igK]
        )).reduce((acum,el) => (acum + el),0)

        return sum > 0 
    }


    const disableInfo = {
        ...ings
    }
    for (let k in disableInfo) {
        disableInfo[k] = (disableInfo[k] <= 0)   
    }
    let orderSummary = null
    let burger = error ? <p> Ingredients can't be loaded </p>: <Spinner/> 
    if (ings) {
        orderSummary = (
            <OrderSummary 
            ingredients={ings}
            continued={purchaseContinuedHandler}
            cancelled={purchaseCancelledHandler}
            totalPrice={total}
        />
        )
        
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls 
                    ingredientAdd={onIngredientAdd} 
                    ingredientRemove={onIngredientRemove}
                    disabled={disableInfo}
                    purchaseable={canPurchase(ings)} 
                    totalPrice={total}
                    purchaseBurger={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        )
    }

    return (
        <Aux>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelledHandler}
            > 
                {orderSummary}           
            </Modal>
            {burger}
        </Aux>
    );
    

}


export default withErrorHandler(burgerBuilder,axios)