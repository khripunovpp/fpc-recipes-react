import React from 'react';

export default function(props) {
    return(
        <div>
            {props.value}
            <input type="text" name={props.value} onChange={props.onWeightChange}/>
        </div>
    )
}