import React from 'react';
import styles from './Input.module.css';
 


const input = (props) => {
    let validationError = null;
    let inputElement = null;
    const InputStyles = [styles.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        InputStyles.push(styles.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }
switch (props.elementType) {
    case ('input'):
    inputElement = <input 
    className={InputStyles.join(' ')} 
    {...props.elementConfig} 
    value={props.value}
    onChange={props.changed}/>;
    break;
        
    case ('textarea'):
    inputElement = <textarea 
    className={styles.InputElement}
    {...props.elementConfig} 
    value={props.value}
    onChange={props.changed}/>;    
    break;

    case ('select'):
    inputElement = <select
     className={styles.InputElement}
     value={props.value}
     onChange={props.changed}>
    {
        props.elementConfig.options.map(option=>(
            <option 
            key={option.value} 
            value={option.value}
            onChange={props.changed}>
                {option.displayValue}
            </option>
        ))
    }

     </select>;    
    break;

    default:
    inputElement = <input 
    className={styles.InputElement}
    {...props.elementConfig} 
    value={props.value}/>;
    break;
}

return (
<div className={styles.Input}>
    <label className={styles.Label} >
        {props.label}
        {inputElement}
        {validationError}
    </label>

</div>
);
}

export default input;