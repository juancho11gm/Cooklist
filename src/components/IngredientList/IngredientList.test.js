import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { IngredientList } from './IngredientList';
import { prettyDOM } from '@testing-library/dom';

const ingredients = [
    {
        id: 1,
        name: 'rice',
        amount: '10'
    },
    {
        id: 2,
        name: 'meat',
        amount: '5'
    },
    {
        id: 3,
        name: 'potato',
        amount: '2'
    }
];

test('renders content', () => {
    const component = render(<IngredientList ingredients={ingredients} />)
    component.getByText('meat');
    component.getByText('5');
});

test('renders 3 ingredients', () => {
    const { container } = render(<IngredientList ingredients={ingredients} />)
    const list = container.querySelector('.ingredient-grid');
    expect(list.children).toHaveLength(6);
});