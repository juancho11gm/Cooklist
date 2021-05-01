import { uuid } from 'uuidv4';
import React, { useState, useEffect } from 'react';
import { RecipeList } from '../RecipeList'
import { RecipeEdit } from '../RecipeEdit';
import './app.css';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) {
      setRecipes(JSON.parse(recipeJSON));
    } else {
      setRecipes(sampleRecipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuid(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr. ',
      ingredients: [
        {
          id: uuid(),
          name: 'Name',
          amout: '1 Tbs'
        }
      ]
    }

    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      { selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken \n2. Put chicken in oven \n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork \n 2. Put pork in oven \n 3. Eat pork',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '1 Tbs'
      }
    ]
  }
]

export { App }