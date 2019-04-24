import * as React from 'react'
import { GENERAL_TEXT } from 'src/webapp/config/text';
import styles from './style'
import Logo from '../../../assets/img/logo.png'

class ConfirmationContainer extends React.Component {

    constructor(p: {}) {
        super(p)
    }
    componentDidMount() {
        window.addEventListener('beforeunload', (e: Event) => {
            localStorage.clear()
            
        })
    }
    componentWillUnmount() {
        window.addEventListener('beforeunload', (e: Event) => {
            localStorage.clear()
        })
    }
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <img style={styles.logo} src={Logo} alt='Logo' />
                        <h1>Din anmälan är klar!</h1>
                    </div>
                    <div style={styles.textContainer}>
                        <p>{GENERAL_TEXT.after_submit}</p>
                        
                    </div>
                    <div style={styles.footer}>
                        <a style={styles.link} href="http://www.designpriset.se">Tillbaka till designpriset.se</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmationContainer