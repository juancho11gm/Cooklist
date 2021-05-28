import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { RecipeContext } from '../App/App';
import { Recipe } from './Recipe';

const recipe = {
    id: 1,
    name: 'bbq pork',
    cookTime: 2,
    servings: 3,
    instuctions: [],
    ingredients: []
};

test('renders content', () => {
    const recipeContextValue = {
        handleRecipeSelect: jest.fn(),
        handleRecipeDelete: jest.fn()
    };

    const component = render(
        <RecipeContext.Provider value={recipeContextValue}>
            <Recipe handle {...recipe} />
        </RecipeContext.Provider>
    )

    component.getByText('bbq pork');
});

test('should click the edit button', () => {
    const handleRecipeSelect = jest.fn();
    const { getByText } = render(
        <RecipeContext.Provider value={{ handleRecipeSelect }}>
            <Recipe handle {...recipe} />
        </RecipeContext.Provider>
    )

    const editBtn = getByText('Edit');
    fireEvent.click(editBtn);

    expect(handleRecipeSelect).toHaveBeenCalledTimes(1);
});

test('should click the delete button', () => {
    const handleRecipeDelete = jest.fn();
    const { getByText } = render(
        <RecipeContext.Provider value={{ handleRecipeDelete }}>
            <Recipe handle {...recipe} />
        </RecipeContext.Provider>
    )

    const deleteBtn = getByText('Delete');
    fireEvent.click(deleteBtn);

    expect(handleRecipeDelete).toHaveBeenCalledTimes(1);
});
