import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        marginTop: "20%",
        height: "50%",
        padding: "10%",
    },
    Content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ViewContainer: {
        flex: 1, 
        justifyContent: "center",
        flexDirection: "row",

        width:"100%"
    }
})