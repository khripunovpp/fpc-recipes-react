import React from 'react';
import Alert from "../Others/Alert";
import IngredientsTable from "./IngredientsTable";

export default function(props) {
    const { ingredients } = props;
    return (
        ingredients.length
            ? <IngredientsTable ingredients={ingredients} />
            : <Alert>ingredients Not Found</Alert>
    )
}