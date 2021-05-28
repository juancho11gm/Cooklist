import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { RecipeIngredientEdit } from './RecipeIngredientEdit';

const recipeIngredientEdit = {
    ingredient: {
        id: 1,
        name: 'rice',
        amount: 2
    }
}

test('delete ingredient', () => {
    const mockHandleIngredientDelete = jest.fn();

    const { getByText } = render(<RecipeIngredientEdit handleIngredientDelete={mockHandleIngredientDelete} {...recipeIngredientEdit} />);

    const deleteBtn = getByText('×');
    fireEvent.click(deleteBtn);

    expect(mockHandleIngredientDelete).toHaveBeenCalledTimes(1);
});

test('update name', () => {
    const handleIngredientChange = jest.fn();
    const { container } = render(<RecipeIngredientEdit handleIngredientChange={handleIngredientChange} {...recipeIngredientEdit} />);
    const nameInput = container.querySelector('.recipe-edit__input--name');
    //TO DO: update for fireEvent
    nameInput.value = 'meat';
    expect(nameInput.value).toBe('meat')
})

