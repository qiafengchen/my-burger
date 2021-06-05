import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from '../Checkout/ContactInfo/ContactInfo';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice:0
    // }

    // UNSAFE_componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //     price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice:price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-info');
    }

    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased?<Redirect to='/' />:null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-info'}  
                    component={ContactInfo}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);