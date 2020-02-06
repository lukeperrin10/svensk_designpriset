import * as React from 'react'
import styles from './dev_header.module.css'
import { PHASES } from '../../model/constants'
import Button from 'react-bootstrap/Button'

interface props {
    currentPhase: string,
    changePhase: (phase: PHASES) => void

}

const DevHeader = ({currentPhase, changePhase}:props) => {
    const setPhase = (phase: PHASES) => {
        changePhase(phase)
    }

    return (
        <div className={styles.container}>
            <Button 
            className={currentPhase === PHASES.ONE ? styles.selected : ''} 
            onClick={() => setPhase(PHASES.ONE)}>Fas 1</Button>
            <Button 
            className={currentPhase === PHASES.TWO ? styles.selected : ''} 
            onClick={() => setPhase(PHASES.TWO)}>Fas 2</Button>
            <Button 
            className={currentPhase === PHASES.THREE ? styles.selected : ''} 
            onClick={() => setPhase(PHASES.THREE)}>Fas 3</Button>
            <Button 
            className={currentPhase === PHASES.FOUR ? styles.selected : ''} 
            onClick={() => setPhase(PHASES.FOUR)}>Fas 4</Button>
            <Button 
            className={currentPhase === PHASES.FIVE ? styles.selected : ''} 
            onClick={() => setPhase(PHASES.FIVE)}>Fas 5</Button>
        </div>
    )
}

export default DevHeader
