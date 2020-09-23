import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Dropdown, Button } from 'react-bootstrap'

import styles from './Lobby.module.css'

export const ComputerModal = props => {
    const [color, setColor] = useState(null)
    const [skill, setSkill] = useState(null)

    let history = useHistory()

    const startGame = () => {
        if (!color || !skill) return

        props.setUserColor(color.toLowerCase())
        props.setSkill(skill)
        history.push('/computer')
    }

    const SkillDropdown = () => {
        let buttonList = []

        for (let i = 1; i < 21; i++) {
            const item =
                <Dropdown.Item onClick={() => setSkill(i)} key={`skill${i}`}>
                    {i}
                </Dropdown.Item>
            buttonList.push(item)
        }

        return (
            <Dropdown className="flex-grow-1 mx-1">
                <Dropdown.Toggle variant="primary" block>
                    {skill ?? 'Select Skill Level'}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.longDropdown}>
                    {[...buttonList]}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    if (!props.isOpen) {
        return null
    }

    return (
        <Modal onHide={props.onClose} show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Play Against Computer</Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex">
                <Dropdown className="flex-grow-1 mx-1">
                    <Dropdown.Toggle variant="primary" block>
                        {color ?? 'Select Colour'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setColor('White')}>
                            White
                    </Dropdown.Item>
                        <Dropdown.Item onClick={() => setColor('Black')}>
                            Black
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <SkillDropdown />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Cancel
            </Button>
                <Button variant="success" onClick={startGame}>
                    Play Against Computer
            </Button>
            </Modal.Footer>
        </Modal>
    )
}