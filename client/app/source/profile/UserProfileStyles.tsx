import { StyleSheet } from 'react-native'
const blueTheme = '#1977B5';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    textHeader:{
        fontSize: 25,
        margin: 10,
        marginTop: 30,
        color: blueTheme,
    },
    textBody:{
        fontSize: 20,
        margin: 5,
        // color: "#C4C7C6",
    },
    button: {
        marginTop: 30,
    }
});