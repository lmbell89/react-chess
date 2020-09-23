import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { DrawModal } from './DrawModal'

export const SideButtons = props => {
    const [isDrawModalOpen, setIsDrawModalOpen] = useState(false)

    const drawText = props.canDraw ? 'Draw Game' : 'Offer Draw'
    const drawVariant = props.canDraw ? 'success' : 'primary'


    const DrawButton = props => {
        if (!props.canDraw || props.isGameOver) return null

        return (
            <Button
                variant={drawVariant}
                onClick={() => setIsDrawModalOpen(true)}
                block
            >
                {drawText}
            </Button>
        )
    }

    const FlipButton = props => {
        if (props.gameType !== 'local') return null

        return (
            <Button variant={"secondary"} onClick={props.onClick} block>
                Flip Board
            </Button>
        )
    }

    //let drawButton
    //if (props.canDraw && !props.isGameOver) {
    //    drawButton = <Button
    //        variant={drawVariant}
    //        onClick={() => setIsDrawModalOpen(true)}
    //        block
    //    >
    //        {drawText}
    //    </Button>
    //}

    return (
        <div className="pb-4 mx-auto">
            <Link to='/lobby' className="btn btn-danger btn-block">Exit Game</Link>
            <DrawButton />
            <FlipButton gameType={props.gameType} onClick={props.onInvertBoard} />
            <ButtonGroup aria-label="Show or hide moves" className="my-2 w-100">
                <Button
                    variant="secondary"
                    active={!props.showLegalMoves}
                    onClick={() => props.onShowLegalMoves(false)}
                >
                    Hide Moves
                    </Button>
                <Button
                    variant="secondary"
                    active={props.showLegalMoves}
                    onClick={() => props.onShowLegalMoves(true)}
                >
                    Show Moves
                    </Button>
            </ButtonGroup>
            <DrawModal
                isOpen={isDrawModalOpen}
                onClose={() => setIsDrawModalOpen(false)}
                canDraw={props.canDraw}
                onDraw={props.onDraw}
            />
        </div>
    )
}