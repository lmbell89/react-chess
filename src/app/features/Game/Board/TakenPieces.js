import React from 'react'
import { Piece } from './Piece'
import styles from './Board.module.css'

const pieces = { 'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1 }

export const TakenPieces = props => {
    console.log(props.fen)
    const pieceString = props.fen.split(' ')[0]
    let components = []    

    for (const [letter, count] of Object.entries(pieces)) {
        const symbol = props.color === 'white' ? letter.toUpperCase() : letter
        const missingCount = count - pieceString.split(symbol).length + 1

        for (let i = 0; i < missingCount; i++) {
            components.push(<Piece pieceSymbol={symbol} isTaken={true} />)
        }
    }

    const invertClass = props.isInverted ? styles.invert : null

    return (<div className={styles.takenPieceContainer + ' ' + invertClass}>
        {[...components]}
    </div>)
}