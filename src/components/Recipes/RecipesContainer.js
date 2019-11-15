import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

export default function(props) {
    const { recipes } = props;
    return (
        recipes.length 
            ? recipes.map((recipe)=>(
                <Fragment key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    <br />
                </Fragment>
            ))
            : <p>Recipes Not Found</p>
    )
}