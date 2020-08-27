import React, { Component } from 'react';
import styles from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component 
  { 
      shouldComponentUpdate(nextProps, nextState){
          return nextProps.show!==this.props.show;

        }
        UNSAFE_componentWillUpdate (){
            console.log("[Modal] WillUpdate")
        }
      render(){
          return(
<Aux>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
<div 
className={styles.Modal} 
style={{
    transform: this.props.show?'translateY(0)':'translateY(-100vh)',
    opacity: this.props.show?'1':'0'}}>
    
    {this.props.children}

</div>
</Aux>
          );
      } 
  
  
}

export default Modal;