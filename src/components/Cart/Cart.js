import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContex from '../../store/cart-context';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
  const cartCtx = useContext(CartContex);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorPosting, setErrorPosting] = useState(false);
  const [submittedSuccessfuly, setSubmittedSuccessfuly] = useState(false);

  const orderHandler = () => {
    setIsOrdered(true);
  };

  const onCancel = () => {
    setIsOrdered(false);
  };

  const cartItemRemoveHandler = (id) => {
    if (cartCtx.items.length === 1) {
      onCancel();
    }
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitDataHandler = async (userData) => {
    setIsSubmiting(true);
    setErrorPosting(false);
    const OrderInformation = { ...userData, totalAmount, items: cartCtx.items };
    const response = await fetch(process.env.REACT_APP_ORDER_API, {
      method: 'POST',
      body: JSON.stringify({ OrderInformation }),
    });
    setIsSubmiting(false);
    if (!response.ok) {
      setErrorPosting(true);
      return;
    } else {
      setSubmittedSuccessfuly(true);
      cartCtx.clearCart();
    }
  };

  if (submittedSuccessfuly) {
    return (
      <Modal onClick={props.onHideCart}>
        <p>Thank you for your Order!!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal onClick={props.onHideCart}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmiting && <p>Sending Order...</p>}
      {errorPosting && <p>Something went wrong..please try again</p>}
      {isOrdered && (
        <CheckoutForm onCancel={onCancel} onSubmitData={submitDataHandler} />
      )}
      {!isOrdered && modalActions}
    </Modal>
  );
};

export default Cart;
