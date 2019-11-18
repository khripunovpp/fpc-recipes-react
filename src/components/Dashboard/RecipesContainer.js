import React from 'react';
import RecipeCard from "./RecipeCard";
import Alert from "../layout/Alert";

export default function(props) {
    const { recipes } = props;
    return (
        recipes.length
            ? recipes.map(( recipe ) => <RecipeCard recipe={recipe} key={recipe.uid}/> )
            : <Alert>Recipes Not Found</Alert>
    )
}