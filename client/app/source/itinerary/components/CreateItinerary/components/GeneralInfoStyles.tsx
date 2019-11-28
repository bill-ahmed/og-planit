import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        marginBottom: 10
    },
    heading: {
        fontSize: 28,
        color: backgroundBlue
    },
    content: {
        marginTop: 15,
    },
    selectDateContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 30
    },
    form:{
        width: "80%",
        marginBottom: 30
    },
    formItem: {
        marginBottom: 20
    },
    datePlaceholder:{
        fontSize: 24,
        color: 'darkgray'
    },
    dateBody:{
        fontSize: 24
    },
    textInputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 18,
        padding: 8,
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
      color: backgroundBlue, // Colour for font if "transparent" flag given
      fontSize: 24
    },
    buttonIcon: {
        color: backgroundBlue
    },
    footer: {
        alignSelf: 'center',
        width: '100%',
        marginTop: '30%'
    }
})