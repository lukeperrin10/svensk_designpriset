import * as React from 'react'
import styles from './registration_info.module.css'
import logo from '../../../assets/img/logo.png'
import facebook from '../../../assets/img/facebook-f.png'
import instagram from '../../../assets/img/instagram.png'
import mail from '../../../assets/img/mail.png'
import { REGISTER_INFO } from '../../../config/text';
import { IContent } from '../../../model'
// import divider from '../../../assets/ui/divider.png'

interface props {
    registerInfo: IContent[]
}


class RegistrationInfo extends React.Component<props> {
    render() {
        const {registerInfo} = this.props
        return (
            <div>
                {registerInfo.length > 0 &&
                <div className={styles.instruction_container} dangerouslySetInnerHTML={{__html: registerInfo[0].content}} />
                }
            </div>
        )
    }
}

export default RegistrationInfo