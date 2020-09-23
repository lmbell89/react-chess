import React, { useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

import { useWindowDimensions } from '../../../utils/Utils'
import styles from './History.module.css'

const BREAKPOINT = 992

export const MoveButton = props => {
    const { width } = useWindowDimensions()
    const ref = useRef(null)

    useEffect(() => {
        if (props.selected && width >= BREAKPOINT) {
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