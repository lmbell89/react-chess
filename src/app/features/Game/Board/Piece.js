import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChessPawn,
    faChessKnight,
    faChessBishop,
    faChessRook,
    faChessQueen,
    faChessKing
} from '@fortawesome/free-solid-svg-icons'

import styles from './Board.module.css'

const iconsForSymbols = {
    'p': faChessPawn,
    'n': faChessKnight,
    'b': faChessBishop,
    'r': faChessRook,
    'q': faChessQueen,
    'k': faChessKing
}

export const Piece = props => {
    const isWhite = props.pieceSymbol.toUpperCase() === props.pieceSymbol
    const faIcon = iconsForSymbols[props.pieceSymbol.toLowerCase()]

    let css
    if (props.isPromotion) {
        css = styles.promotionPiece
    } else if (props.isTaken) {
        css = styles.takenPiece
    } else {
        css = isWhite ? styles.whitePiece : styles.blackPiece
    }

    return (
        <FontAwesomeIcon icon={faIcon} className={css} />
    )
}