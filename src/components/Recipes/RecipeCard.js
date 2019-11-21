import React from 'react';
import { Link } from "react-router-dom";

export default function({recipe}) {
    return (
        <div className="recipe__card card">
            {recipe.thumbnail && <img src={recipe.thumbnail} className="card-img-top" alt={recipe.title} />}
            <span className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                {recipe.description && <p className="card-text">{recipe.description}</p>}
                <Link to={`/recipes/${recipe.uid}`} className="card-link">See more</Link>
            </span>
        </div>
    )
}