import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(

    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact active> Burger Builder</NavigationItem>
        <NavigationItem link="/orders"> Orders </NavigationItem>

    </ul>
);

export default navigationItems;