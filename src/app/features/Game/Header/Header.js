import React from 'react'

export const Header = props => {
    let text

    if (props.gameEndReason) {
        text = props.gameEndReason
    } else if (props.isUserCurrentPlayer) {
        text = 'Your move'
    } else {
        text = props.isWhiteToMove ? 'White to move' : 'Black to move'
    }

    return (
        <div>
            <h1 className="text-center">{text}</h1>
        </div>
    )
}