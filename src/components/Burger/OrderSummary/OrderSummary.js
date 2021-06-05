import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (<li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}</li>);
    });
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <p><strong>Total Price: ${this.props.total.toFixed(2)}</strong></p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success'clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummary;