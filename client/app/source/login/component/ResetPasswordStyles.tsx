import { StyleSheet } from 'react-native'

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    header: {
        backgroundColor: backgroundBlue,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    content: {
        backgroundColor: "white",
        width: "90%",
        padding: 20,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5
        },
    },
    button: {
        margin: 10,
        textAlign: "center"
    },
    textInput: {
        borderWidth: 2, 
        borderRadius: 7,
        padding: '3%',
        margin: '2%',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 18,
    }
});