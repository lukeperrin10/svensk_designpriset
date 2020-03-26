import * as React from 'react'
import { GENERAL_TEXT } from '../../../config/text';
import styles from './style'
import Logo from '../../../assets/img/logo.png'
import { Link } from 'react-router-dom';

interface IConf {
    update: boolean
}

class ConfirmationContainer extends React.Component<IConf> {

    constructor(p: IConf) {
        super(p)
    }
    componentDidMount() {
        window.scrollTo(0,0)
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
                <div>
                    <div style={styles.header}>
                        <img style={styles.logo} src={Logo} alt='Logo' />
                        <h1>{this.props.update ? 'Uppdatering klar' : 'Din anmälan är klar!'}</h1>
                    </div>
                    {/* <div style={styles.textContainer}>
                        <p>{this.props.update ? GENERAL_TEXT.after_update : GENERAL_TEXT.after_submit}</p>
                        
                    </div> */}
                    <div style={styles.footer}>
                        <a style={styles.link} href="http://www.designpriset.se">Tillbaka till designpriset.se</a>
                        {/* <Link to=''>Tillbaka till designpriset</Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmationContainer