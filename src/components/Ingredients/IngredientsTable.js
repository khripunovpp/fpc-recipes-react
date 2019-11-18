import React from 'react';
import { Link } from "react-router-dom";


export default function(props) {
    const { data: ingredients } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map(( ingredient, i ) => <tr key={ingredient.uid}><th scope="row">{i+1}</th><td><Link to={`/ingredients/${ingredient.uid}`} >{ingredient.name}</Link></td></tr>)}
            </tbody>
        </table>
    )
}