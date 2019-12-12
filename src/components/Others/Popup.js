import React from 'react';

export default function({onSubmit, onCancel, title, children, ...props}) {
    return(
        <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true" {...props}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCancel}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel}>Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onSubmit}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}