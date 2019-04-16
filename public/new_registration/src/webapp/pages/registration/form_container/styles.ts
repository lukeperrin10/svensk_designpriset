import { PRIMARY_GOLD, PRIMARY_BACKGROUND_COLOR } from 'src/webapp/config/style';

/** @type {{formGroup: React.CSSProperties}} */

export default {
    container: {
        backgroundColor: PRIMARY_GOLD,
        padding: 20
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
        justifyContent: 'space-between'
    },
    toolbar: {
        width: '100%',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
        position: 'fixed' as 'fixed',
        bottom: 0,
        left: 0,
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
    }
}