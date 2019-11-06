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
        padding: 20,
    },
    selectDateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30
    },
    form:{
        width: "50%"
    },
    formItem: {
        marginBottom: 20
    },
    textInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 7,
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
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