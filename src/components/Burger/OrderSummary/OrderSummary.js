import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    
    
    
    const ingredientSummary = Object.keys(props.ingredients).map((igK)=>(
    <li key={igK}>
        <span style={{textTransform: 'capitalize'}}>{igK}</span>: {props.ingredients[igK]}
    </li>
    ))
    
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>You created a delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Your total is {props.totalPrice.toFixed(2)}</strong></p> 
            <p>Continue to checkout?</p>
            <Button 
                btnType="Danger"
                clicked={props.cancelled}
            >
                CANCEL
            </Button>
            <Button 
                btnType="Success"
                clicked={props.continued}
            >
                CONTINUE
            </Button>
            
        </Aux>
    )
    
}

export default orderSummary;