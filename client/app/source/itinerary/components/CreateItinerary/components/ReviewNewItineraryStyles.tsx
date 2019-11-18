import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    eventHeader:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 25,
    },
    heading: {
        fontSize: 24,
    },
    content: {
        marginTop: 0,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        height: "100%"
    },
    touchableOpacity: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    text: {
        fontSize: 18,
        marginTop: 10
    },
    subtext: {
        fontSize: 15,
        color: '#545B62',
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonFont: {
        fontSize: 16
    }
})