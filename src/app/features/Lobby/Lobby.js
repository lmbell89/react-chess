import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Card, Col } from 'react-bootstrap'

import { ComputerModal } from './ComputerModal'

export const Lobby = props => {
    const [showModalType, setShowModalType] = useState(null)

    return (
        <Container fluid className="pt-5">
            <Col
                xs={12}
                sm={{ span: 10, offset: 1 }}
                md={{ span: 8, offset: 2 }}
                lg={{ span: 6, offset: 3 }}
            >
                <Card className="mx-auto">
                    <Card.Body>
                        <Card.Title>Chess Lobby</Card.Title>

                        <Card.Subtitle className="mb-2 text-muted">
                            Select a game type
                        </Card.Subtitle>

                        <Link to='/local' className='btn btn-primary btn-block'>
                            Play Local Game
                        </Link>

                        <Button
                            block
                            variant="primary"
                            onClick={() => setShowModalType('computer')}
                        >
                            Play Against Computer
                        </Button>

                    </Card.Body>
                </Card>

                <ComputerModal
                    isOpen={showModalType === 'computer'}
                    onClose={() => setShowModalType(null)}
                    setUserColor={props.setUserColor}
                    setSkill={props.setSkill}
                />
            </Col>
        </Container>
        )
}