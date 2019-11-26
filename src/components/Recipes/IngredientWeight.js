import React from 'react';

export default function({data, onWeightChange, children: index}) {
    return(
        <div className="container ingredientsList">
            <div className="row ingredientsList__item">
                <div className="col-md-3">
                    <label className="col-form-label" htmlFor={data.value}><b>{index}</b>. {data.label}</label>
                </div>
                <div className="col-md-9">
                    <input type="text" id={data.value} name={data.value} onChange={onWeightChange} className="form-control" placeholder={`Set "${data.label}" weight`} aria-label={`Set ${data.value} weight`}></input>
                </div>
            </div>
        </div>
    )
}