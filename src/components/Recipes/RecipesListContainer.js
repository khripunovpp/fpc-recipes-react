import React from 'react';
import RecipesList from "./RecipesList";
import Spinner from '../layout/Spinner';

export default function(props) {
    const recipes = [...props.recipesData.recipes];
    return (
        recipes.loading 
            ? <Spinner />
            : <RecipesList recipes={recipes}></RecipesList>
    )
}