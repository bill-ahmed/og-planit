import { StyleSheet } from 'react-native'

export const backgroundBlue = '#1977B5';

export default StyleSheet.create({
    title:{
        fontSize: 26,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 10,
    },
    heading: {
        fontSize: 28,
        color: backgroundBlue
    },
    content: {
        width: "100%",
        padding: 5
    },
    cardHeader: {
        fontSize: 25,
        color: backgroundBlue
    },
    button: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 30
    },
    itineraryBody: {
        margin: 2,
        fontSize: 16
    },
    iconButton: {
        margin: 5,
        width: 90,
        padding: 5,
        paddingLeft: 0,
        paddingRight: 10,
        borderRadius: 10,
        color: "white",
    },
    fab: {
        backgroundColor: backgroundBlue,
    }
});