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
        marginTop: 15,
    },
    filtersIntroduction: {
        marginBottom: 30
    },
    distanceContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    categoriesContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    otherContainer: {
        marginTop: 20,
        marginBottom: 20,
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
        color: '#545B62'
    },
    slider: {
        marginTop: 10,
        marginBottom: 10,
        color: backgroundBlue
    },
    footer: {
        alignSelf: 'center',
        width: '100%',
        marginTop: '30%'
    }
})