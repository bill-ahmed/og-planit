import { StyleSheet, Dimensions } from 'react-native'

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    header: {
        backgroundColor: backgroundBlue,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: '50px'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: backgroundBlue
    },
    containerContent: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: backgroundBlue
    },
    content: {
        backgroundColor: backgroundBlue,
    },
    button: {
        margin: 10,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    inputFields: {
        //marginTop: '10%',
        //backgroundColor: 'white',
        borderWidth: 30,
    },
    label: {
        //padding: '10%',
        color: 'white',
    },
    textInput: {
        borderWidth: 2, 
        borderRadius: 7,
        borderColor: "white", 
        padding: '3%',
        margin: '2%',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 18,
        color: 'white',
    },
    h24: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    h18: {
        fontSize: 22,
    },
    h16: {
        fontSize: 20,
    },
    h14: {
        fontSize: 18,
    },
    Text:{
        color: 'white',
    }
    
});