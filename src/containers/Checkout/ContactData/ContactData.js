import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 2,
                    
                },
                valid: false,
                tounched: false
        
            },
            
            stress: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                tounched: false
            },
            zipcode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                tounched: false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                tounched: false
            },
            
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                tounched: false
            },

            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options: [
                        {
                        value:'fastest',
                        displayValue:'Fastest',
                    },
                    {
                        value:'cheapest',
                        displayValue:'Cheapest',
                    }
                ]
                },
                
                value:'fastest',
                validation: {},
                valid: true,
                
            },
        },
        formIsValid: false,
        
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if (rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length > rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length < rules.maxLength && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier )=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = 
        {...updatedOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.tounched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formValid = true;

        for (let inputId in updatedOrderForm) {
            formValid = updatedOrderForm[inputId].valid && formValid;
        }

        this.setState({
            orderForm: updatedOrderForm, 
            formIsValid: formValid
        });
        
        
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderTime : new Date().toLocaleString(),
            orderData: formData
        }
        this.props.onOrderBurger(order, this.props.token);

    }
    render() {

        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {
                formElementArray.map(formElement=>
                    (
                        <Input 
                        key= {formElement.id}
                        elementType= {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        tounched = {formElement.config.tounched}
                        changed = {(event)=>this.inputChangedHandler(event,formElement.id) } />
                    ))}
            
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />
        }
        return (

            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))

    };
};

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(ContactData,axios));