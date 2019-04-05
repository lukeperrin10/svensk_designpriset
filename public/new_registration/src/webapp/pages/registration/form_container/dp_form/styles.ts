import { PRIMARY_BACKGROUND_COLOR, BUTTON_COLOR, HEADER_TEXT_COLOR } from 'src/webapp/config/style';

/** @type {{formGroup: React.CSSProperties}} */

export default {
    container: {
        padding: 20,
        paddingTop: 40,
        // borderColor: 'grey',
        // borderWidth: 1,
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
        borderRadius: 5,
        marginBottom: 20,
        overFlow: 'auto',
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        
    },
    title: {
        margin: 30,
        color: HEADER_TEXT_COLOR
    },
    button: {
        backgroundColor: BUTTON_COLOR,
        borderColor: 'black'
    },
    row: {
        margin: 10
    },
    input: {
        minWidth: 300,
        width: '40vw',
        
    },
    inputContainer: {
        width: '50%',
        minWidth: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        // margin: 'auto',
        // flexGrow: 1
    },
    formGroup: {
        display: "flex",
        flexWrap: "wrap" as "wrap",
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        padding: 10,
        textAlign: 'right' as 'right'
    },
    error: {
        color: 'red',
        height: 10
    }
}