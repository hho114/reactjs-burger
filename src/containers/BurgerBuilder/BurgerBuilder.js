import React, { Component } from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false,
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((prevSum, added) => { return prevSum + added; }, 0);

        this.setState({ purchasable: sum > 0 });
    }

     

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => { 
        // alert('You continue!');
        
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
            
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&'); 
        this.props.history.push({
            pathname:'/checkout',
        search: '?'+ queryString
        });
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get("https://reactjs-burger-ff2b1.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error=>{
        //         this.setState({error:true});
        //     });
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger =this.state.error?<p>Ingredients can't be load!</p>: <Spinner />;

        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        disabled={disableInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>;

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;

        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded:(ingName)=> dispatch({type:actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved:(ingName)=> dispatch({type:actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));