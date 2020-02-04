import { PRIMARY_BACKGROUND_COLOR, PRIMARY_GOLD, STANDARD_TEXT_COLOR } from '../../../config/style';
import divider from '../../../assets/ui/divider.png'

export default {
    container: {
        width: '100vw',
        // minHeight: '70vh',
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        flexWrap: 'wrap' as 'wrap'
    },
    h1: {
        display: 'inline',
        textAlign: 'center' as 'center'
    },
    warningContainer: {
        marginTop: 10,
        textAlign: 'center' as 'center'
    },
    warningP: {
        margin: 2,
        color: STANDARD_TEXT_COLOR
    },
    logo: {
        width: 50
    },
    logoContainer: {
        width: 150,
        textAlign: 'center' as 'center'
    },
    iconContainer: {
        display: 'flex',
        width: 150,
        justifyContent: 'space-between'
    },
    iconsA: {
        backgroundColor: PRIMARY_GOLD,
        borderRadius: 50,
        height: 40,
        width: 40,
        display: 'flex'
    },
    icons: {
        height: 20,
        margin: 'auto'
    },
    line: {
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginLeft: 5,
        marginRight: 5
    },
    instructionContainer: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'space-around',
        maxWidth: 1200,
        margin: 'auto',
        marginTop: 40,
    },
    stepContainer: {
        width: 300,
        color: STANDARD_TEXT_COLOR
    },
    h3: {
        color: PRIMARY_GOLD
    },
    button: {
        backgroundColor: PRIMARY_GOLD,
        borderColor: PRIMARY_BACKGROUND_COLOR
    },
    divider: {
        textAlign: 'center' as 'center',
        // marginTop: 50,
        backgroundImage: `url(${divider})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

        height: 100
    }
}