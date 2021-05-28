import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Ingredient } from './Ingredient';

const ingredientProps = {
    name: 'rice',
    amount: '10'
};

test('renders content', () => {
    const component = render(<Ingredient {...ingredientProps} />)
    component.getByText('rice');
    component.getByText('10');
});