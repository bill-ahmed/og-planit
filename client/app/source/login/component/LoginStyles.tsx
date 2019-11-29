import { StyleSheet } from 'react-native'

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    stretch: {
        height: '26%',
        width: '60%',
        alignSelf: 'flex-start',
        //resizeMode: 'contain',
        flexDirection: 'row',
        marginLeft: '1%'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        color: '#FFFFFF',
    },
    content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundBlue,
    },
    button: {
        marginHorizontal: '10%',
        marginTop: '10%',
        alignSelf: 'center',
        width: '60%',
    },
    loginIntro: {
        width: '90%',
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
    loginOuttro: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 19,
    },
    signUp: {
        color: 'white',
        alignSelf: 'center',
        marginTop: 30,
    }

});