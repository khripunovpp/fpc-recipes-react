import React from 'react';

export default function({children}) {
    return(
        <div className="alert alert-success fade show" role="alert">
            {children}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}