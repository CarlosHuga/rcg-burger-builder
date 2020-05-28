import React, { useState } from 'react';
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import classes from './ContactData.css'
import * as actions from '../../../store/actions/index'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity } from '../../../shared/utility'




const contactData = (props) => {
    
    const [formIsValid, setFormIsValid] = useState(false)
    const [orderForm, setOrderForm] = useState({     
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false

        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false

        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                minLength: 5,
                maxLength: 5,
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },                
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })
        
    

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let k in orderForm){
            formData[k] = orderForm[k].value
        }
        const order = {
            // Mosca con creer en lo que dice el cliente
            // web, es importante validar temas de plata
            // como el precio total en el servidor 
            ingredients: props.ings,
            price: props.total,
            orderData: formData,
            userId: props.userId
           
        }

        props.onOrderBurger(order,props.token)
       
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value)
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(orderForm,{[inputIdentifier] : updatedFormElement} )
        
        let checkFormIsValid = true
        for (let inp in updatedOrderForm){
            checkFormIsValid = (updatedOrderForm[inp].valid) && checkFormIsValid
        }

        setOrderForm(updatedOrderForm)
        setFormIsValid(checkFormIsValid)
    }

   
    
    const formElementsArray = []
    for (let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formE => {
                return <Input 
                    invalid={!formE.config.valid}
                    shouldValidate={formE.config.validation}
                    touched={formE.config.touched}
                    key={formE.id}
                    elementType={formE.config.elementType}
                    elementConfig={formE.config.elementConfig}
                    value={formE.config.value}
                    changed={(event) => inputChangedHandler(event, formE.id)}
                />
            })}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    )
    if (props.loading){
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));