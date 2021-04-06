
import React, { useEffect } from 'react';
import Order from '../../containers/Checkout/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    const {onFetchOrders} = props;

    useEffect(() =>{
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);
    
        let orders = <Spinner />
        if (!props.loading) {
            orders =
                props.orders.map(
                    order => (
                        
                    <Order
                    
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        datetime={order.orderTime}
                    />
                    )
                    );

        }
        return (
            <div>
                {orders}
            </div>

        );
    
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));