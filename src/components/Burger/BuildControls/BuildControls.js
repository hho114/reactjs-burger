import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(item => (
            <BuildControl key={item.label} label={item.label} disabled={props.disabled[item.type]} remove={() => props.ingredientRemoved(item.type)} add={() => props.ingredientAdded(item.type)} />
        ))}
        <button className={styles.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;