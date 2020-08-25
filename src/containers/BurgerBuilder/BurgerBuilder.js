import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon:0.4,
    cheese:0.3,
    meat:0.7,

};
class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing: false
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((prevSum, added)=> {return prevSum+added;},0);

       this.setState({purchasable: sum>0});
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount+1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type]=updateCount;

        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice+INGREDIENT_PRICE[type];

        this.setState({ingredients: updateIngredients,totalPrice: updatePrice});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
            
        }
        const updateCount = oldCount-1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type]=updateCount;

        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice - INGREDIENT_PRICE[type];

        this.setState({ingredients: updateIngredients,totalPrice: updatePrice});
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    render(){
        const disableInfo={
            ...this.state.ingredients
        };
        for (const key in disableInfo) {
            disableInfo[key]= disableInfo[key]<=0;
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                disabled = {disableInfo} 
                ingredientRemoved= {this.removeIngredientHandler} 
                ingredientAdded = {this.addIngredientHandler} 
                price={this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;