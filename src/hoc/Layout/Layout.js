import React, {useState} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

const  Layout = props => {

    const [sideDrawIsVisible, setSideDrawIsVisible] = useState(false);


    const sideDraweClosedHandler=()=>{

       setSideDrawIsVisible(false);

    }
    const sideDrawerToggleHandler=()=>{
        setSideDrawIsVisible(!sideDrawIsVisible);
    }

    
        return(
            <Aux>
            <Toolbar 
            isAuth= {props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
             isAuth= {props.isAuthenticated}
            open={sideDrawIsVisible}
            closed={sideDraweClosedHandler}/>
            <main className={classes.Content}>{props.children}</main>
            </Aux>
        );
    
    
};

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps) (Layout);