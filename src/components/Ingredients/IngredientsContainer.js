import React from 'react';
import Spinner from '../layout/Spinner';
import IngredientsList from './IngredientsList';

export default function(props) {
    const { ingredients } = props;
    return (        
        ingredients.loading
            ? <Spinner />
            : <IngredientsList ingredients={ingredients.ingredients}></IngredientsList>
    )
}