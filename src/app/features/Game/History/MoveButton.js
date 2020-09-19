import React, { useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

import styles from './History.module.css'

export const MoveButton = props => {
    const ref = useRef(null)

    useEffect(() => {
        if (props.selected) {
            ref.current.scrollIntoView({ behavior: "smooth" })
        }
    })

    const variant = props.selected ? 'primary' : 'light'

    return (
        <Button
            ref={ref}
            variant={variant}
            onClick={props.onClick}
            className={styles.notationButton}
        >
            {props.text}
        </Button>
    )
}