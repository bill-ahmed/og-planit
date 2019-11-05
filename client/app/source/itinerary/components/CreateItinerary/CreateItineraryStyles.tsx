import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    container: {
        justifyContent: "center",
        marginTop: "20%",
        height: "50%",
        padding: "10%",
        backgroundColor: backgroundBlue
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
    },
    button:{
        flex: 1,
        justifyContent:"center",
        backgroundColor: backgroundBlue
    },
    textInput: {
        borderWidth: 2, 
        borderRadius: 7,
        borderColor: "white", 
        padding: '3%',
        margin: '2%',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 18,
        color: 'white',
    },
})