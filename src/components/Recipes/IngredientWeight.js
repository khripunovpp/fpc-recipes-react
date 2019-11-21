import React from 'react';

export default function({value, onWeightChange}) {
    return(
        <div className="container ingredientsList">
            <div className="row ingredientsList__item">
                <div className="col-md-3">
                    <label className="col-form-label" htmlFor={value}>{value}</label>
                    </div>
                <div className="col-md-9">
                    <input type="text" id={value} name={value} onChange={onWeightChange} className="form-control" placeholder={`Set ${value} weight`} aria-label={`Set ${value} weight`}></input>
                </div>
            </div>
        </div>
    )
}