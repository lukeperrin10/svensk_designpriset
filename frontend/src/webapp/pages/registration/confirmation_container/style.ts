import { PRIMARY_BACKGROUND_COLOR, PRIMARY_GOLD, STANDARD_TEXT_COLOR } from '../../../config/style';

export default {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
        borderRadius: 5,
        padding: 50,
    },
    header: {
        textAlign: 'center' as 'center',
        color: PRIMARY_GOLD,
        marginTop: 50
    },
    textContainer: {
        padding: 30,
        maxWidth: 800,
        color: STANDARD_TEXT_COLOR
    },
    link: {
        color: STANDARD_TEXT_COLOR
    },
    footer: {
        textAlign: 'center' as 'center'
    },
    logo: {
        height: 100,
        marginBottom: 20
    }
}