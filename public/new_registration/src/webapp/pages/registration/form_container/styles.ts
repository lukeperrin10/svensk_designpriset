import { PRIMARY_GOLD, PRIMARY_BACKGROUND_COLOR } from 'src/webapp/config/style';

/** @type {{formGroup: React.CSSProperties}} */

const isMobile = window.innerWidth < 376
console.log(isMobile)

export default {
    container: {
        backgroundColor: PRIMARY_GOLD,
        padding: 20,
    },
    addButton: {
        // borderRadius: 100,
        // width: 50,
        // height: 50,
        // fontSize: '2rem',
        // padding: 0,
        // marginRight: 30,
        // boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
    },
    addButtonContainer: {
        width: '100%',
        // textAlign: 'right' as 'right'
        display: 'flex',
        
    },
    toolbarContainer: {
        maxWidth: 1250,
        minHeight: 85,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginBottom: 30
    },
    toolbar: {
        width: '100vw',
        maxWidth: 1250,
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as 'wrap',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        marginLeft: 10,
        marginRight: 10
    },
    buttonPrimary: {
        backgroundColor: PRIMARY_GOLD,
        borderColor: PRIMARY_BACKGROUND_COLOR
    },
    toolbarRight: {
        marginTop: 10
    },
    logo: {
        height: 50
    },
    modalBody: {
        margin: 'auto'
    }
}