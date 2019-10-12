import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        width: 200,
        marginTop: 30,
        alignSelf: 'center',
    },
    loginIntro: {
        marginTop: 100,
    },
    textInput: {
        borderWidth: 1, 
        borderRadius: 7,
        borderColor: "#BBC0C4", 
        padding: 5,
        margin: 10,
        marginTop: 10,
        marginBottom: 5,
    }
});