import * as React from 'react'
import { GENERAL_TEXT } from 'src/webapp/config/text';
import styles from './style'

class ConfirmationContainer extends React.Component {

    constructor(p: {}) {
        super(p)
    }
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1>Din anmälan är klar!</h1>
                </div>
                <div style={styles.textContainer}>
                    <p>{GENERAL_TEXT.after_submit}</p>
                    
                </div>
                <div style={styles.footer}>
                    <a href="http://www.designpriset.se">Tillbaka till designpriset.se</a>
                </div>

            </div>
        )
    }
}

export default ConfirmationContainer