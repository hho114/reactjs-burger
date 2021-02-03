import React from 'react';
import classes from "./Burger.module.css";
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
const burger =(props)=>{
    

let transformedIngredients = Object.keys(props.ingredients).map(
(igKey) => {

    return [...Array(props.ingredients[igKey])].map((_,index)=>{
        return <BurgerIngredient type={igKey} key={igKey+index} />;
    });
}
).reduce((previousArr, currentArr)=>{
    return previousArr.concat(currentArr);
},[]);

if (transformedIngredients.length ===0) {
    transformedIngredients = <p>Please adding ingredients!</p>;
    
}
    return (<div className = {classes.Burger}>
        <BurgerIngredient type = "bread-top" />
        {transformedIngredients}
        <BurgerIngredient type = "bread-bottom" />

    </div>);

};

export default burger;