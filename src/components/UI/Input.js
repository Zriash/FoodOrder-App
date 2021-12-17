import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.inputId}>{props.label}</label>
      <input ref={ref} id={props.inputId} {...props.input} />
    </div>
  );
});

export default Input;
