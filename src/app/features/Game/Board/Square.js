import React from 'react'

import styles from './Board.module.css'
import { Piece } from './Piece'

export const Square = props => {
    let css = styles.square + ' '

    if (props.isSelected) {
        css += styles.selectedSquare
    } else if (props.isLastMove) {
        css += styles.lastMove
    } else if (props.isLegalMove) {
        css += styles.legalMove
    } else {
        css += styles[props.color + 'Square']
    }

    let piece
    if (props.pieceSymbol) {
        piece = <Piece pieceSymbol={props.pieceSymbol} />
    }

    const invertedClass = props.isInverted ? styles.invert : null

    return (
        <div
            onClick={props.onClick}
            className={css + ' ' + invertedClass}
            id={props.id}
        >
            {piece}
        </div>
    )
}