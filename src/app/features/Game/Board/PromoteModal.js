import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { Piece } from './Piece'
import styles from './Board.module.css'

export const PromoteModal = props => {
    const [show, setShow] = useState(true)

    const onButtonClick = pieceSymbol => {
        props.onMove(pieceSymbol)
        setShow(false)
    }

    return (
        <Modal
            aria-label='promote pawn to'
            show={show}
            backdrop="static"
            keyboard={false}
            size="sm"
        >
            <Modal.Body className={styles.promote}>
                <Button
                    variant={"light"}
                    className={styles.promote}
                    onClick={() => onButtonClick('q')}
                >
                    <Piece pieceSymbol='q' isPromotion={true} />
                </Button>
                <Button
                    variant={"light"}
                    className={styles.promote}
                    onClick={() => onButtonClick('r')}
                >
                    <Piece pieceSymbol='r' isPromotion={true} />
                </Button>
                <Button
                    variant={"light"}
                    className={styles.promote}
                    onClick={() => onButtonClick('n')}
                >
                    <Piece pieceSymbol='n' isPromotion={true} />
                </Button>
                <Button
                    variant={"light"}
                    className={styles.promote}
                    onClick={() => onButtonClick('b')}
                >
                    <Piece pieceSymbol='b' isPromotion={true} />
                </Button>
            </Modal.Body>
        </Modal>
    )
}