import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [httpErr, setHttpErr] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(process.env.REACT_APP_MEALS_API);

      if (!response.ok) {
        throw new Error();
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          key: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    };
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpErr('Something went wrong!');
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (httpErr) {
    return (
      <section className={classes.meals}>
        <p className={classes.error}>{httpErr}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      {isLoading && <p>Preparing Manu...</p>}
      <ul>{mealsList}</ul>
    </section>
  );
};

export default AvailableMeals;
