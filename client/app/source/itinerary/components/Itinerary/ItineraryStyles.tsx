import { StyleSheet } from 'react-native'
const backgroundBlue = '#1977B5';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 30
    },
    addbtn: {
        //position: "absolute",
        borderRadius: 26,
        width: "90%",
        backgroundColor: backgroundBlue,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        alignSelf: "center",
    },
    plus: {
        color: 'white',
        fontSize: 35,
        alignSelf: 'center',
        margin: 10,
    },
    wrapbtn: {
        justifyContent: 'flex-end',
        bottom: 10,
        right: 10,
    },
    follow: {
        flexDirection: 'row-reverse',
        fontWeight: "bold",
        justifyContent: 'flex-end',
        backgroundColor: backgroundBlue,
        alignSelf: 'flex-end',
        padding: 10
    },
    card: {
        margin: 10,
        width: "95%",
        alignSelf: "center",
        color: "white",

    }
});