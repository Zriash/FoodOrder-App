import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContex from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContex);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const badgeClasses = `${classes.badge} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={badgeClasses}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
