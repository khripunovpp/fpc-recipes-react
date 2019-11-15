import React from 'react';
import RecipeCard from "./RecipeCard";

export default function(props) {
    const { recipes } = props;
    return (
        recipes.length
            ? recipes.map(( recipe ) => <RecipeCard recipe={recipe} key={recipe.uid}/> )
            : <p>Recipes Not Found</p>
    )
}