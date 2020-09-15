import * as React from 'react'
import styles from './registration_info.module.css'
import logo from '../../../assets/img/logo.png'
import facebook from '../../../assets/img/facebook-f.png'
import instagram from '../../../assets/img/instagram.png'
import mail from '../../../assets/img/mail.png'
import { REGISTER_INFO } from '../../../config/text';
import { IContent } from '../../../model'
import Text from '../../../components/text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../../../components/text/text'
import { getText } from '../../../helpers'
import { getDayWithMonth } from '../../../helpers/dates'
// import divider from '../../../assets/ui/divider.png'

interface props {
    registerInfo: IContent[],
    lastDate: Date
}


class RegistrationInfo extends React.Component<props> {
    render() {
        const {registerInfo} = this.props
        return (
            <div className={styles.container}>
                <Text type={TEXT_TYPES.H1} headlineSize={HEADLINE_SIZES.LARGE}>{getText('Anmäl bidrag')}</Text>
                <Text className={styles.dateText} type={TEXT_TYPES.INGRESS} headlineSize={HEADLINE_SIZES.MEDIUM}>{getText('Sista dag')} {getDayWithMonth(this.props.lastDate)}</Text>
                {registerInfo.length > 0 &&
                <div className={styles.instruction_container} dangerouslySetInnerHTML={{__html: registerInfo[0].content}} />
                }
            </div>
        )
    }
}

export default RegistrationInfo