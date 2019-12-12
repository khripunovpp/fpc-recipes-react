import React from 'react';
import ErrorMessage from "../Others/ErrorMessage";

export default function({errorMsg, ingredient, onWeightChange, index}) {
    return(
        <div className="container ingredientsList">
            <div className="row ingredientsList__item">
                <div className="col-md-3">
                    <label className="col-form-label" htmlFor={ingredient.value}><b>{index}</b>. {ingredient.label}</label>
                </div>
                <div className="col-md-9">
                    <input type="text" id={ingredient.value} name={ingredient.value} onChange={onWeightChange} className="form-control" placeholder={`Set "${ingredient.label}" weight`} aria-label={`Set ${ingredient.value} weight`}></input>
                    {errorMsg && <ErrorMessage type="danger">{errorMsg}</ErrorMessage>}
                </div>
            </div>
        </div>
    )
}