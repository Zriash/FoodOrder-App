import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../UI/Input';

const MealItemForm = (props) => {
  const [amountIsValid, setamountIsValid] = useState(true);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const amountInputRef = useRef();

  const bump = () => {
    setBtnIsHighlighted(true);
    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 125);
    return;
  };

  const btnClass = btnIsHighlighted ? classes.bump : '';

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim() === '' ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setamountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        inputId={'Amount_' + props.id}
        input={{
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button className={btnClass} onClick={bump}>
        + Add
      </button>
      {!amountIsValid && <p>Please enter valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
