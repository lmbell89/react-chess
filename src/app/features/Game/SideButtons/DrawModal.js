import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const DrawModal = props => {
    const variant = props.canDraw ? 'success' : 'primary'
    const buttonText = props.canDraw ? 'Draw Game' : 'Offer Draw'

    let bodyText = 'Are you sure you want to '

    if (props.canDraw) {
        bodyText += 'draw the game?'
    } else {
        bodyText += 'offer a draw to your opponent?'
    }

    const confirmDraw = () => {
        props.onDraw()
        props.onClose()
    }

    return (
        <Modal show={props.isOpen} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Draw</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
                <Button variant={variant} onClick={confirmDraw}>
                    {buttonText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}