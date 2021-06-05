import React , { Component } from 'react';
import axios from '../../../axio-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactInfo.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';

class ContactInfo extends Component {
    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            county:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your e-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig: {
                    options:[
                        // {value:'', displayValue:'Choose delivery method'},
                        {value:'fastest', displayValue:'fastest' },
                        {value: 'normal', displayValue:'normal'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        loading:false,
        formIsValid:false
    }


    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let identifier in this.state.orderForm) {
            orderData[identifier] = this.state.orderForm[identifier].value;
        }

        const order = {
            contactData:orderData,
            ingredient:this.props.ings,
            price:this.props.price,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]:updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm, formIsValid});
    }

    render() {
        const formElementsArray =[];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => (
                    <Input 
                        key={el.id} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        invalid={!el.config.valid} 
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(event) => this.inputChangedHandler(event,el.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        } 
        return (
            <div className={classes.ContactInfo}>
                <h4>Enter your contact information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchtToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchtToProps)(withErrorHandler(ContactInfo,axios));