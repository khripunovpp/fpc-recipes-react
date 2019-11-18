import React from 'react';

export default function({children, dismiss, type}) {
    return(
        <div className={`alert alert-${type||'warning'} fade show`} role="alert">
            {children}
            {dismiss && <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>}
        </div>
    )
}