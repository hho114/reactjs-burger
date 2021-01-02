import React from 'react';
import styles from "./Button.module.css";

const button=(props)=>(
<button 
disabled={props.disabled}
onClick={props.clicked} 
className={[styles.Button, styles[props.btnType]].join(' ')}>{props.children}
</button>
);

export default button;