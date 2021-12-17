import React, { useRef, useState } from 'react';
import classes from './CheckoutForm.module.css';

const isEmpty = (value) => value.trim() === '';
const isMinFive = (value) => value.trim().length > 4;

const CheckoutForm = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const refName = useRef();
  const refStreet = useRef();
  const refPostal = useRef();
  const refCity = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const eneteredName = refName.current.value;
    const eneteredStreet = refStreet.current.value;
    const eneteredPostal = refPostal.current.value;
    const eneteredCity = refCity.current.value;

    const enteredNameIsValid = !isEmpty(eneteredName);
    const enteredStreetIsValid = !isEmpty(eneteredStreet);
    const enteredCityIsValid = !isEmpty(eneteredCity);
    const enteredPostalIsValid = isMinFive(eneteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      eneteredCity &&
      enteredPostalIsValid;

    if (!isFormValid) {
      return;
    } else {
      props.onSubmitData({
        name: eneteredName,
        city: eneteredCity,
        postal: eneteredPostal,
        street: eneteredStreet,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name ? classes.invalid : ''
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={refName} />
        {!formInputValidity.name && <p>Please enter a valid name!.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.street ? classes.invalid : ''
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={refStreet} />
        {!formInputValidity.street && <p>Please enter a valid street!.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.postal ? classes.invalid : ''
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={refPostal} />
        {!formInputValidity.postal && <p>Please enter a valid postal code!.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city ? classes.invalid : ''
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={refCity} />
        {!formInputValidity.city && <p>Please enter a valid name!.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
