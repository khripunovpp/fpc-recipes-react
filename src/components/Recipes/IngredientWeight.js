import React from 'react';

export default function({error, ingredient, onWeightChange, index}) {
    return(
        <div className="container ingredientsList">
            <div className="row ingredientsList__item">
                <div className="col-md-3">
                    <label className="col-form-label" htmlFor={ingredient.value}><b>{index}</b>. {ingredient.label}</label>
                </div>
                <div className="col-md-9">
                    <input type="text" id={ingredient.value} name={ingredient.value} onChange={onWeightChange} className="form-control" placeholder={`Set "${ingredient.label}" weight`} aria-label={`Set ${ingredient.value} weight`}></input>
                    {error()}
                </div>
            </div>
        </div>
    )
}