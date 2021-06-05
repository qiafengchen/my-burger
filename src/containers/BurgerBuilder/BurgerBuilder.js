import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axio-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as Actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchasing:false,
        // loading:false,
        // error:false
    }

    componentDidMount () {
        this.props.onInitIngredient();
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients:res.data});
        //     })
        //     .catch(error=>{
        //         this.setState({error:true});
        //     });

    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(el => ingredients[el])
        .reduce((sum, el) => {
            return sum + el
        }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    //     this.setState({ ingredients:updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    //     this.setState({ ingredients:updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler= () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render (){
        const disabledInfo ={
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        let burger = this.props.error?<p>Ingredient can't be loaded!</p>:<Spinner/>;
        if(this.props.ings) {
            burger= (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                            ingredientAdded={this.props.onAddIngredients}
                            ingredientRemoved={this.props.onRemoveIngredients}
                            disabled ={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}
                        />
                </Auxiliary>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings} 
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            total={this.props.price}/>;
        }
        // if(this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients:(ingType) => dispatch(Actions.addIngredient(ingType)),
        onRemoveIngredients:(ingType) => dispatch(Actions.removeIngredient(ingType)),
        onInitIngredient:() => dispatch(Actions.initIngredient()),
        onInitPurchase: () => dispatch(Actions.purchasedInit()),
        onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));