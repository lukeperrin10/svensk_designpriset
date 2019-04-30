import { PRIMARY_GOLD, PRIMARY_BACKGROUND_COLOR } from 'src/webapp/config/style';

/** @type {{formGroup: React.CSSProperties}} */

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
        width: '100vw',
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        position: 'fixed' as 'fixed',
        bottom: 0,
        left: 0,
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
        display: 'flex',
        justifyContent: 'center'
    },
    toolbar: {
        width: '100vw',
        maxWidth: 1600,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
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
        
    },
    space: {
        height: 75
    },
    logo: {
        height: 50
    },
    modalBody: {
        margin: 'auto'
    }
}