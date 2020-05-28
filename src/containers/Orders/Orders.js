import React, { useEffect } from 'react';
import axios from '../../axios-orders'
import { connect } from 'react-redux'

//import classes from './Orders.css' 

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

const orders = (props) => {
    
    const {onFetchOrders, token, userId} = props 

    useEffect(() => {
       onFetchOrders(token, userId) 
    },[onFetchOrders, token, userId])
    
    

    let orders = <Spinner/>
    if (!props.loading){
        if (props.orders){
            orders = props.orders.map(el => {
                return <Order 
                    key={el.id} 
                    price={el.price} 
                    ingredients={el.ingredients}
                /> 
            }) 
        } else {
            orders = <p>No orders available</p>
        }
    }
    return (
            <div>
                {orders}
            </div>
    );
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        loading: state.order.loading,
        orders: state.order.orders,
        userId: state.auth.userId
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders, axios));