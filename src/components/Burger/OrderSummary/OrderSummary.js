import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    
    // Componente funcional, se deja solo para debugging
    // componentDidUpdate() {
    //     console.log('[OrderSummary] componentDidUpdate')
    // } 

    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igK)=>(
        <li key={igK}>
            <span style={{textTransform: 'capitalize'}}>{igK}</span>: {this.props.ingredients[igK]}
        </li>
        ))
        
        
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>You created a delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Your total is {this.props.totalPrice.toFixed(2)}</strong></p> 
                <p>Continue to checkout?</p>
                <Button 
                    btnType="Danger"
                    clicked={this.props.cancelled}
                >
                    CANCEL
                </Button>
                <Button 
                    btnType="Success"
                    clicked={this.props.continued}
                >
                    CONTINUE
                </Button>
                
            </Aux>
        )
    }
}

export default OrderSummary;