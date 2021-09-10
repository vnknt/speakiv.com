import React from 'react'
import { Spinner } from 'react-bootstrap'
import { displayIf } from '../../utilities/helpers/displayIf'
export default function LoadingSpinner({ show }) {
    return (
        <div className={`col-12 text-center ${displayIf(!show)}`}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}
