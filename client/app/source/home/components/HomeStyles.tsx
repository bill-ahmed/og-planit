import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    button: {
        marginBottom: 30,
    },
    eventHeader:{
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 25,
    },
    cardBody:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: "center"
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    floatingContainter:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    floatingButton:{
        marginLeft: 10,
        marginRight: 10
    },
    headerButton: {
        marginTop:10
    }
});