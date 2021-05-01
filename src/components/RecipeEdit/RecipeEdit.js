import React, { useContext } from 'react';
import { RecipeIngredientEdit } from '../RecipeIngredientEdit';
import { RecipeContext } from '../App';
import './recipeEdit.css';

const RecipeEdit = ({ recipe }) => {
  const {
    id,
    name,
    cookTime,
    servings,
    instructions,
    ingredients
  } = recipe;

  const { handleRecipeChange } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(
      recipe.id,
      {
        ...recipe,
        ...changes
      }
    )
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...ingredients];
    const index = newIngredients.findIndex(i => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({
      ingredients: newIngredients
    })
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button">&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">Name</label>
        <input className="recipe-edit__input" type="text" name="name" id="name" value={name} onInput={e => handleChange({ name: e.target.value })} />

        <label className="recipe-edit__label" htmlFor="cooktTime">Cook Time</label>
        <input className="recipe-edit__input" type="text" name="cooktTime" id="cooktTime" value={cookTime} onInput={e => handleChange({ cookTime: e.target.value })} />

        <label className="recipe-edit__label" htmlFor="servings">Servings</label>
        <input className="recipe-edit__input" type="number" min="1" name="servings" id="servings" value={servings} onInput={e => handleChange({ servings: parseInt(e.target.value) || 0 })} />

        <label className="recipe-edit__label" htmlFor="instructions">Instructions</label>
        <textarea className="recipe-edit__input" name="instructions" id="instructions" value={instructions} onInput={e => handleChange({ instructions: e.target.value })} />
      </div>
      <div>
        <br />
        <label className="recipe-edit__label">Ingredients</label>
        <div className="recipe-edit__ingredient-grid">
          <div>Name</div>
          <div>Amount</div>
          <div></div>
          {
            ingredients.map(ingredient => {
              return (
                <RecipeIngredientEdit
                  key={ingredient.id}
                  ingredient={ingredient}
                  handleIngredientChange={handleIngredientChange}
                />
              );
            })
          }
        </div>
        <div className="recipe-edit__add-ingredient-btn-container">
          <button className="btn btn--primary">Add Ingredient</button>
        </div>
      </div>
    </div>
  );
}

export { RecipeEdit }