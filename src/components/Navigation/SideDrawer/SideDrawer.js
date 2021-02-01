import React from "react";
import Logo from "../../Logo/Logo";
import Navigationitems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer =(props)=>{
    let attachedClasses=[styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedClasses=[styles.SideDrawer, styles.Open];
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={styles.Logo}>
            <Logo />
            </div>
            
            <nav>
            <Navigationitems isAuthenticated={props.isAuth}/>
            </nav>
            
        </div>
        </Aux>
    );
};

export default sideDrawer;