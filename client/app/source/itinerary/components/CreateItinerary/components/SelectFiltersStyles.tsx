import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    container: {
        padding: 10,
    },
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
    form:{
        width: "50%"
    },
    formItem: {
        marginBottom: 20
    },
    text: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    }
})