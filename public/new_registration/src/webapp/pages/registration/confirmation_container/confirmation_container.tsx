import * as React from 'react'
import { GENERAL_TEXT } from 'src/webapp/config/text';
import styles from './style'
import Logo from '../../../assets/img/logo.png'

interface IConf {
    update: boolean
}

class ConfirmationContainer extends React.Component<IConf> {

    constructor(p: IConf) {
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
                        <h1>{this.props.update ? 'Uppdatering klar' : 'Din anmälan är klar!'}</h1>
                    </div>
                    <div style={styles.textContainer}>
                        <p>{this.props.update ? GENERAL_TEXT.after_update : GENERAL_TEXT.after_submit}</p>
                        
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