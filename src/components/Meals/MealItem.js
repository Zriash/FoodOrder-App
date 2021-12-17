import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import Card from '../UI/Card';
import MealItemForm from './MealItemForm';
import CartContex from '../../store/cart-context';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContex);

  const onAddToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <Card>
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
        </div>
      </li>
    </Card>
  );
};

export default MealItem;
