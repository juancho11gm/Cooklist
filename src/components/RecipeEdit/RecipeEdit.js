import React, { useContext } from 'react';
import { RecipeIngredientEdit } from '../RecipeIngredientEdit';
import { RecipeContext } from '../App';
import './recipeEdit.css';
import { uuid } from 'uuidv4';

const RecipeEdit = ({ recipe }) => {
  const {
    name,
    cookTime,
    servings,
    instructions,
    ingredients
  } = recipe;

  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

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

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuid(),
      name: '',
      amount: ''
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange( { ingredients: recipe.ingredients.filter(i => i.id !== id) })
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
          </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">Name</label>
        <input className="recipe-edit__input" type="text" name="name" id="name" value={name} onChange={e => handleChange({ name: e.target.value })} />

        <label className="recipe-edit__label" htmlFor="cooktTime">Cook Time</label>
        <input className="recipe-edit__input" type="text" name="cooktTime" id="cooktTime" value={cookTime} onChange={e => handleChange({ cookTime: e.target.value })} />

        <label className="recipe-edit__label" htmlFor="servings">Servings</label>
        <input className="recipe-edit__input" type="number" min="1" name="servings" id="servings" value={servings} onChange={e => handleChange({ servings: parseInt(e.target.value) || 0 })} />

        <label className="recipe-edit__label" htmlFor="instructions">Instructions</label>
        <textarea className="recipe-edit__input" name="instructions" id="instructions" value={instructions} onChange={e => handleChange({ instructions: e.target.value })} />
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
                  handleIngredientDelete={handleIngredientDelete}
                />
              );
            })
          }
        </div>
        <div className="recipe-edit__add-ingredient-btn-container">
          <button
            className="btn btn--primary"
            onClick={() => handleIngredientAdd()}
          >
            Add Ingredient
            </button>
        </div>
      </div>
    </div>
  );
}

export { RecipeEdit }