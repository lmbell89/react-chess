import React, { useState } from 'react'

import styles from './Board.module.css'
import { Square } from './Square'
import { PromoteModal } from './PromoteModal'
import { TakenPieces } from './TakenPieces'

const getEmptySquares = () => {
    let squares = []
    for (let row of '87654321') {
        for (let col of 'abcdefgh') {
            const color = (col.charCodeAt() + +row) % 2 ? 'light' : 'dark'
            const colInt = col.charCodeAt() - 96
            squares.push({
                id: col + row,
                row: +row,
                col: colInt,
                color: color,
                pieceSymbol: null,
                isLastMove: false,
                isSelected: false,
            })
        }
    }
    return squares
}

const getSquaresFromFen = fen => {
    const stringToParse = fen.split(' ')[0]
    let squares = getEmptySquares()

    let col = 1
    let row = 8

    for (let character of stringToParse) {
        if (parseInt(character)) {
            col += parseInt(character)
        } else if (character === '/') {
            row--
            col = 1
        } else {
            squares
                .find(square => square.row === row && square.col === col)
                .pieceSymbol = character
            col++
        }
    }
    return squares
}

export const Board = props => {
    const [selectedSquareId, setSelectedSquareId] = useState('')
    const [isPawnSelected, setIsPawnSelected] = useState(false)
    const [promotingMove, setPromotingMove] = useState('')

    const squares = getSquaresFromFen(props.fen)

    let legalMovesFromSelectedSquare = []

    if (props.showLegalMoves) {
        legalMovesFromSelectedSquare = props.legalMoves
            .filter(move => move.substring(0, 2) === selectedSquareId)
            .map(move => move.substring(2, 4))
    }

    const makeMove = move => {
        const isFinalRank = (move[3] === '1' || move[3] === '8')

        if (isPawnSelected && isFinalRank) {
            setPromotingMove(move)
        } else {
            props.onMove(move)
        }
    }

    const selectSquare = (squareId, legalMoves, pieceSymbol) => {
        const isMoveablePiece =
            legalMoves.find(move => move.substring(0, 2) === squareId)

        const selectId = isMoveablePiece ? squareId : ''

        setSelectedSquareId(selectId)
        setIsPawnSelected(pieceSymbol && pieceSymbol.toUpperCase() === 'P')
    }

    const onSquareClick = (squareId, pieceSymbol, legalMoves) => {
        if (!props.userCanMove || !props.isCurrentPosition) return

        const move = selectedSquareId + squareId

        if (legalMoves.includes(move)) {
            makeMove(move, pieceSymbol)
            setSelectedSquareId('')
        } else {
            selectSquare(squareId, legalMoves, pieceSymbol)
        }
    }

    const squareComponents = squares.map(square => {
        return <Square
            key={square.id}
            color={square.color}
            id={square.id}
            pieceSymbol={square.pieceSymbol}
            isSelected={square.id === selectedSquareId}
            isLastMove={props.isCurrentPosition && props.lastMove.includes(square.id)}
            isLegalMove={legalMovesFromSelectedSquare.includes(square.id)}
            isInverted={props.isInverted}
            onClick={() => onSquareClick(
                square.id,
                square.pieceSymbol,
                props.legalMoves,
                props.isUserCurrentPlayer
            )}
        />
    })

    const onPromoteClick = pieceSymbol => {
        const move = promotingMove + '=' + pieceSymbol
        props.onMove(move)
    }

    let promoteModal = null
    if (promotingMove) {
        promoteModal = <PromoteModal
            pieceSymbol={promotingMove}
            onMove={onPromoteClick}
        />
    }

    const invertedClass = props.isInverted ? styles.invert : null

    return (
        <div className={invertedClass}>
            <TakenPieces
                color='white'
                fen={props.fen}
                isInverted={props.isInverted}
            />
            <div className={styles.board}>
                {squareComponents}
                {promoteModal}
            </div>
            <TakenPieces
                color='black'
                fen={props.fen}
                isInverted={props.isInverted}
            />
        </div>
    )
}