import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    contentDateTime: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    contentPricing:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    contentCategory:{
        flex: 3
    },
    ratingHeader:{
        marginTop:10,
        marginBottom: 20,
    },
    dateHeader:{
        fontSize: 35,
    },
    datePlaceholder:{
        fontSize: 28,
        color: 'darkgray'
    },
    dateBody:{
        fontSize: 28
    },
    divider:{
        backgroundColor: 'blue'
    }
});