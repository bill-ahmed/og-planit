import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    heading: {
        fontSize: 28,
        color: backgroundBlue
    },
    content: {
        marginTop: 30,
    },
    selectDateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30
    },
    filtersIntroduction: {
        marginBottom: 30
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    subtext: {
        fontSize: 15,
        color: '#545B62'
    },
    footer: {
        alignSelf: 'center',
        width: '100%',
        marginTop: '30%'
    }
})