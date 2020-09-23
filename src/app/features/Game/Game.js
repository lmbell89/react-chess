import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Chess from 'chess.js'

import { Board } from './Board'
import { SideButtons } from './SideButtons'
import { History } from './History'
import { Header } from './Header'
import { initEngine, getBestMove } from './Engine'

export const Game = props => {
    const [chess] = useState(new Chess())
    const [previousFens, setPreviousFens] = useState([])
    const [selectedFenIndex, setSelectedFenIndex] = useState(0)
    const [canDraw, setCanDraw] = useState(false)
    const [gameEndReason, setGameEndReason] = useState(null)
    const [showLegalMoves, setShowLegalMoves] = useState(false)

    const invert = props.gameType !== 'local' && props.userColor === 'black'
    const [boardInverted, setBoardInverted] = useState(invert)

    const doMove = move => {
        const invaldMove = chess.move(move, { sloppy: true }) == null
        if (invaldMove) return

        let newFens = previousFens.slice()
        newFens.push(chess.fen())
        setPreviousFens(newFens)

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


        if (!gameEndReason &&
            props.gameType === 'computer' &&
            chess.turn() !== props.userColor[0]) {

            getBestMove(chess.fen(), doMove)
        }
    }

    const doDraw = () => {
        if (!canDraw) return;
        setGameEndReason('Draw - threefold repitition')
    }

    useEffect(() => {
        initEngine(props.skill)

        if (props.gameType === 'computer' && props.userColor === 'black') {
            getBestMove(chess.fen(), doMove)
        }
    }, [])



    let legalMoves = chess.moves({ verbose: true })
        .map(move => move.from + move.to)

    const isCurrent = selectedFenIndex >= chess.history().length - 1

    const previousMove = chess.history({ verbose: true }).slice(-1)
        .map(move => move.from + move.to).toString()

    const userCanMove = !gameEndReason &&
        (props.gameType === 'local' ||
        props.userColor[0].toLowerCase() === chess.turn())

    return (
        <Container fluid>
            <Header
                gameEndReason={gameEndReason}
                turn={chess.turn()}
                userColor={props.userColor}
                gameType={props.gameType}
            />
            <Row>
                <Col
                    xs={12}
                    sm={{ span: 10, offset: 1 }}
                    md={{ span: 8, offset: 2 }}
                    lg={{ span: 3, offset: 0 }}
                >
                    <SideButtons
                        showLegalMoves={showLegalMoves}
                        onShowLegalMoves={setShowLegalMoves}
                        onInvertBoard={() => setBoardInverted(!boardInverted)}
                        isGameOver={Boolean(gameEndReason)}
                        canDraw={canDraw}
                        onDraw={doDraw}
                        gameType={props.gameType}
                    />
                </Col>
                <Col
                    xs={12}
                    sm={{ span: 10, offset: 1 }}
                    lg={{ span: 6, offset: 0 }}
                >
                    <Board
                        isInverted={boardInverted}
                        fen={previousFens[selectedFenIndex] ?? chess.fen()}
                        legalMoves={legalMoves}
                        lastMove={previousMove}
                        showLegalMoves={showLegalMoves}
                        onMove={doMove}
                        isCurrentPosition={isCurrent}
                        userCanMove={userCanMove}
                    />
                </Col>
                <Col
                    xs={12}
                    sm={{ span: 10, offset: 1 }}
                    md={{ span: 8, offset: 2 }}
                    lg={{ span: 3, offset: 0 }}
                >
                    <History
                        previousMoves={chess.history()}
                        onShowMove={setSelectedFenIndex}
                        selectedIndex={selectedFenIndex}
                    />
                </Col>
            </Row>
        </Container>
    )
}