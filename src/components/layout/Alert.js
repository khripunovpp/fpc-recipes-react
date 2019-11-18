import React from 'react';

export default function({children, dismiss, type}) {
    const closed = dismiss && 'data-dismiss="alert"';
    return(
        <div className={`alert alert-${type||'warning'} fade show`} role="alert">
            {children}
            <button type="button" className="close" {...closed} aria-label="Close">
                {dismiss && <span aria-hidden="true">&times;</span>}
            </button>
        </div>
    )
}