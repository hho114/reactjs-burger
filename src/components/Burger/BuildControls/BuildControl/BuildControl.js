import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} disabled={props.disabled} onClick={props.remove}>Less</button>
        <button className={styles.More} onClick={props.add} >More</button>
    </div>
);

export default buildControl;