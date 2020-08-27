import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be functional component, does not have to be class
    UNSAFE_componentWillUpdate(){
    console.log("[OrderSummary] WillUpdate")
}
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(
            igKey => { return (<li key={igKey}><span style={{ textTransfrom: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]} </li>); });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Delicious Burger with following these ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Total price: {this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>


        );


    }
}

export default OrderSummary;