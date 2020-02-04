import * as React from 'react'
import styles from './style'
import logo from '../../../assets/img/logo.png'
import facebook from '../../../assets/img/facebook-f.png'
import instagram from '../../../assets/img/instagram.png'
import mail from '../../../assets/img/mail.png'
import { REGISTER_INFO } from '../../../config/text';
// import divider from '../../../assets/ui/divider.png'



class RegistrationInfo extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.logoContainer}>
                    <a href='http://www.designpriset.se'>
                        <img style={styles.logo} alt='Svenska Designpriset Logo' src={logo} />
                    </a>
                    </div>
                    <h1 style={styles.h1}>Anmälan Svenska Designpriset</h1>
                    <div style={styles.iconContainer}>
                        <a style={styles.iconsA} href='https://facebook.com/designpriset'><img style={styles.icons} src={facebook} alt='Facebook'/></a>
                        <a style={styles.iconsA} href='https://instagram.com/designpriset'><img style={styles.icons} src={instagram} alt='Instagram'/></a>
                        <a style={styles.iconsA} href='mailto:info@designpriset.se'><img style={styles.icons} src={mail} alt='Email'/></a>
                    </div>
                </div>
                <div style={styles.line}></div>
                <div style={styles.warningContainer}>
                    <p style={styles.warningP}>Detta är en ny version av registreringsformuläret.</p>
                    <p style={styles.warningP}>Upplever du problem? Vänligen kontakta <a href="mailto:info@designpriset.se">info@designpriset.se</a></p>
                    
                </div>
                
                <div style={styles.instructionContainer}>
                    {Object.keys(REGISTER_INFO).map(s => {
                        const step = REGISTER_INFO[s]
                        return (
                            <div key={s}style={styles.stepContainer}>
                                <h3 style={styles.h3}>{step.label}</h3>
                                <ul>
                                    {step.content.map(c => {
                                        return (
                                            <li key={c}>{c}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <div style={styles.divider}>
                    {/* <img src={divider} /> */}
                </div>

            </div>
        )
    }
}

export default RegistrationInfo