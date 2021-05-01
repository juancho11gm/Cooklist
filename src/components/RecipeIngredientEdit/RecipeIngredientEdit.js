import React from 'react';

function RecipeIngredientEdit(props) {
    const { ingredient, handleIngredientChange, handleIngredientDelete } = props;
    const { id, name, amount } = ingredient;

    function handleChange(changes) {
        handleIngredientChange(id, { ...ingredient, ...changes });
    }

    return (
        <>
            <input
                className="recipe-edit__input"
                type="text" value={name}
                onChange={(e) => handleChange({ name: e.target.value })}
            />
            <input
                className="recipe-edit__input"
                type="text" value={amount}
                onChange={(e) => handleChange({ amount: e.target.value })}
            />
            <button
                className="btn btn--danger"
                onClick={() => handleIngredientDelete(id)}
            >
                &times;
            </button>
        </>
    );
}

export { RecipeIngredientEdit };