import React, {Component} from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import * as actions from '../../store/actions/index'


export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
       this.props.onIngredientInit()
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelledHandler =  () => {
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler =  () => {
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    canPurchase(ingredients){

        const sum = Object.keys(ingredients).map((igK) => (
            ingredients[igK]
        )).reduce((acum,el) => (acum + el),0)

        return sum > 0 
    }


    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for (let k in disableInfo) {
            disableInfo[k] = (disableInfo[k] <= 0)   
        }
        let orderSummary = null
        let burger = this.props.error ? <p> Ingredients can't be loaded </p>: <Spinner/> 
        if (this.props.ings) {
            orderSummary = (
                <OrderSummary 
                ingredients={this.props.ings}
                continued={this.purchaseContinuedHandler}
                cancelled={this.purchaseCancelledHandler}
                totalPrice={this.props.total}
            />
            )
            
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdd={this.props.onIngredientAdd} 
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        purchaseable={this.canPurchase(this.props.ings)} 
                        totalPrice={this.props.total}
                        purchaseBurger={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelledHandler}
                > 
                    {orderSummary}           
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemove: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onIngredientInit: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.initPurchase()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))