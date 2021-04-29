import React from 'react';
import { Ingredient } from '../Ingredient';
import './ingredientList.css';

const IngredientList = ({ ingredients }) => {
  const ingredientElements = ingredients.map(ingredient => {
    return <Ingredient key={ingredient.id} {...ingredient}/>;
  });

  return (
    <div className="ingredient-grid">
      {ingredientElements}
    </div>
  );
}

export { IngredientList }