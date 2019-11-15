import React from 'react';
import { Link } from "react-router-dom";

export default function({recipe}) {
    return (
        <div className={`recipe__card card`}>
            <img src="https://firebasestorage.googleapis.com/v0/b/recipes-619a5.appspot.com/o/epic-summer-salad.jpg?alt=media&token=f51d9e15-25c3-4a8a-85a6-78fe29be2a6c" className="card-img-top" alt={recipe.title}></img>
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                {recipe.description && <p className="card-text">{recipe.description}</p>}
                <Link to={`/recipes/${recipe.uid}`} className="card-link">See more</Link>
            </div>
        </div>
    )
}