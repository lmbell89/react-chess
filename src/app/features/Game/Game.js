import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Chess from 'chess.js'

import { Board } from './Board'
import { SideButtons } from './SideButtons'
import { History } from './History'
import { Header } from './Header'


export const Game = () => {
    const [chess] = useState(new Chess())
    const [previousFens, setPreviousFens] = useState([])
    const [selectedFenIndex, setSelectedFenIndex] = useState(0)
    const [canDraw, setCanDraw] = useState(false)
    const [gameEndReason, setGameEndReason] = useState(null)
    const [showLegalMoves, setShowLegalMoves] = useState(false)
    const [boardInverted, setBoardInverted] = useState(false)

    let legalMoves = chess.moves({ verbose: true }).map(move => move.from + move.to)

    const doMove = move => {
        const invald = chess.move(move, { sloppy: true }) == null
        if (invald) return

        let newFens = previousFens.slice()
        newFens.push(chess.fen())
        setPreviousFens(newFens)

        console.log(previousFens[chess.history().length - 1])
        setSelectedFenIndex(chess.history().length - 1)
        setCanDraw(chess.in_threefold_repetition())

        if (chess.in_checkmate()) {
            const winner = chess.turn() === 'b' ? 'White' : 'Black'
            setGameEndReason(winner + ' wins - checkmate')
        } else if (chess.in_stalemate()) {
            setGameEndReason('Draw - stalemate')
        } else if (chess.insufficient_material()) {
            setGameEndReason('Draw - insufficient material')
        } else if (chess.in_draw() && !chess.in_threefold_repetition()) {
            setGameEndReason('Draw - 50 move rule')
        }
    }

    const doDraw = () => {
        if (!canDraw) return;
        setGameEndReason('Draw - threefold repitition')
    }

    const isCurrent = selectedFenIndex >= chess.history().length - 1

    const previousMove = chess.history({ verbose: true }).slice(-1)
        .map(move => move.from + move.to).toString()

    return (
        <Container fluid>
            <Header
                gameEndReason={gameEndReason}
                isWhiteToMove={chess.turn() === 'w'}
            />
            <Row>
                <Col xs={12} sm={10} lg={3}>
                    <SideButtons
                        showLegalMoves={showLegalMoves}
                        onShowLegalMoves={setShowLegalMoves}
                        onInvertBoard={() => setBoardInverted(!boardInverted)}
                        isGameOver={Boolean(gameEndReason)}
                        canDraw={canDraw}
                        onDraw={doDraw}
                    />
                </Col>
                <Col xs={12} sm={10} lg={6}>
                    <Board
                        isInverted={boardInverted}
                        fen={previousFens[selectedFenIndex] ?? chess.fen()}
                        legalMoves={legalMoves}
                        lastMove={previousMove}
                        showLegalMoves={showLegalMoves}
                        onMove={doMove}
                        isGameOver={Boolean(gameEndReason)}
                        isCurrentPosition={isCurrent}
                    />
                </Col>
                <Col xs={12} sm={10} lg={3}>
                    <History
                        previousMoves={chess.history()}
                        onShowMove={setSelectedFenIndex}
                        selectedIndex={selectedFenIndex}
                    />
                </Col>
            </Row>
        </Container>
    );
}