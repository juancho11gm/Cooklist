import React, { useContext } from 'react';
import { RecipeContext } from '../App';
import { Recipe } from '../Recipe';
import './recipeList.css';

const RecipeList = (props) => {
  const { recipes } = props;
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      <div>
        {
          recipes.map((recipe) => {
            return (
              <Recipe key={recipe.id} {...recipe}/>
            )
          })
        }
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}

export { RecipeList }