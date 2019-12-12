import React from 'react';

export default function({children}) {
    return (
        <div className="card">
            <div className="card-header">
                Featured
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
)}