import React from 'react';

export default function(props) {
    return(
        <div className="container ingredientsList">
            <div className="row ingredientsList__item">
                <div className="col-md-3">
                    <label className="col-form-label" htmlFor={props.value}>{props.value}</label>
                    </div>
                <div className="col-md-9">
                    <input type="text" id={props.value} name={props.value} onChange={props.onWeightChange} className="form-control" placeholder={`Set ${props.value} weight`} aria-label={`Set ${props.value} weight`}></input>
                </div>
            </div>
        </div>
    )
}