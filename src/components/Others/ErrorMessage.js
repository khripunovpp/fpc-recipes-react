import React from 'react';

export default function({children, type}) {
    return(
        <p className={`error error-${type||'warning'}`} role="alert">
            {children}
        </p>
    )
}