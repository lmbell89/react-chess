import React from 'react';

import styles from './History.module.css';
import { MoveButton } from './MoveButton';
import { ScrollButtons } from './ScrollButtons';

export const History = props => {
    const incrementSelectedFen = byAmount => {
        let index = props.selectedIndex + byAmount

        if (index >= props.previousMoves.length) {
            index = props.previousMoves.length - 1
        }

        if (index < 0) {
            index = 0
        }

        props.onShowMove(index)
    }

    let allMoves = []
    let movePair = []

    props.previousMoves.forEach((move, index) => {
        if (index % 2 === 0) {
            movePair.push(
                <span
                    key={`turnNumber${index}`}
                    className={styles.notationLabel}
                >
                    {(index / 2) + 1 + '. '}
                </span>
            )
        }

        movePair.push(
            <MoveButton
                key={`halfMove${index}`}
                text={move}
                selected={index === props.selectedIndex}
                onClick={() => props.onShowMove(index)}
            />
        )

        if (index % 2 === 1 || index === props.previousMoves.length - 1) {
            allMoves.push(
                <div
                    className={styles.notationGroup}
                    key={`notationGroup${index}`}
                >
                    {movePair}
                </div>
            )

            movePair = []
        }
    })

    return (
        <>
            <ScrollButtons onClick={incrementSelectedFen} />
            <div className={styles.notationContainer}>
                {allMoves}
            </div>
        </>
        )
}