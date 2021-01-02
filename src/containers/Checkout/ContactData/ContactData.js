import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Alex",
                address: {
                    stress: "test stress 1",
                    zipcode: "54321",
                    country: "us"
                },
                email: "test@test.com",

            },
            orderTime : new Date().toLocaleString(),
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ loading: false });
            });
        console.log(this.props.ingredients);

    }
    render() {
        let form = (<form>
            <input className={styles.Input} type='text' name='name' placeholder='your name' />
            <input className={styles.Input} type='text' name='email' placeholder='your mail' />
            <input className={styles.Input} type='text' name='street' placeholder='street' />
            <input className={styles.Input} type='text' name='postal' placeholder='postal code' />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (

            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        );
    }
}
export default ContactData;