import { StyleSheet } from 'react-native'

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    title:{
        color: '#5f9ea0',
        backgroundColor: "#ffffff",
        fontSize: 36,
        height: "15%"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 30
    },
    blue: {
        backgroundColor: backgroundBlue
    }
});