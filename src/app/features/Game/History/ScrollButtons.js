import React from 'react';
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretRight,
    faCaretLeft,
    faFastForward,
    faFastBackward
} from '@fortawesome/free-solid-svg-icons'

export const ScrollButtons = props => {
    return (
        <div className="d-flex">
            <Button
                variant="secondary"
                className="flex-grow-1 mx-1"
                onClick={() => props.onClick(-Infinity)}
            >
                <FontAwesomeIcon icon={faFastBackward} />
            </Button>
            <Button
                variant="secondary"
                className="flex-grow-1 mx-1"
                onClick={() => props.onClick(-1)}
            >
                <FontAwesomeIcon icon={faCaretLeft} />
            </Button>
            <Button
                variant="secondary"
                className="flex-grow-1 mx-1"
                onClick={() => props.onClick(1)}
            >
                <FontAwesomeIcon icon={faCaretRight} />
            </Button>
            <Button
                variant="secondary"
                className="flex-grow-1 mx-1"
                onClick={() => props.onClick(Infinity)}
            >
                <FontAwesomeIcon icon={faFastForward} />
            </Button>
        </div>
    )
}