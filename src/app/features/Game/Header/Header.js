import React from 'react'

export const Header = props => {
    let text

    if (props.gameEndReason) {
        text = props.gameEndReason
    } else if (props.gameType !== 'local' &&
        props.userColor[0] === props.turn)
    {
        text = 'Your move'
    } else {
        text = props.turn === 'w' ? 'White to move' : 'Black to move'
    }

    return (
        <div>
            <h1 className="text-center">{text}</h1>
        </div>
    )
}