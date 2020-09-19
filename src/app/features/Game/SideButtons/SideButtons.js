import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { DrawModal } from './DrawModal'

export const SideButtons = props => {
    const [isDrawModalOpen, setIsDrawModalOpen] = useState(false)

    const drawText = props.canDraw ? 'Draw Game' : 'Offer Draw'
    const drawVariant = props.canDraw ? 'success' : 'primary'

    let drawButton
    if (props.canDraw && !props.isGameOver) {
        drawButton = <Button
            variant={drawVariant}
            onClick={() => setIsDrawModalOpen(true)}
            block
        >
            {drawText}
        </Button>
    }

    return (
        <div className="pb-4 mx-auto">
            <DrawModal
                isOpen={isDrawModalOpen}
                onClose={() => setIsDrawModalOpen(false)}
                canDraw={props.canDraw}
                onDraw={props.onDraw}
            />
            {drawButton}
            <Button variant={"secondary"} onClick={props.onInvertBoard} block>
                Flip Board
            </Button>
            <ButtonGroup aria-label="Show or hide moves" className="mt-2 w-100">
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
        </div>
    )
}