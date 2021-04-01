import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  
        const ingredientsSummary = Object.keys(props.ingredients).map(
            igKey => { return (<li key={igKey}><span style={{ textTransfrom: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} </li>); });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Delicious Burger with following these ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                
                <p>Continue to checkout?</p>
                <p><strong>Total price: {Number.parseFloat( props.price ).toFixed( 2 ) }</strong></p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>


        );


}

export default OrderSummary;