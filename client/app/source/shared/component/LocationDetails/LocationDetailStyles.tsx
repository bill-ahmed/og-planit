import { StyleSheet } from 'react-native'
const blueTheme = '#1977B5';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contactInfoContainer: {
        flex:1,
        paddingRight: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    content: {
        padding: 20,
    },
    textHeader:{
        fontSize: 25,
        marginTop: 40,
    },
    textBody:{
        fontSize: 20,
    },
    criticalInfo:{
        marginTop:10,
        fontSize: 20,
        color: "grey",
    },
    eventHeader:{
        fontSize: 28,
        color: blueTheme,
        fontWeight: 'bold',
    },
    iconStyle: {
        color: blueTheme
    },
    bodyContainer: {
        flex:1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 10
    },
    titleRating: {
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});
// import { StyleSheet, Dimensions } from 'react-native'

// const backgroundBlue = '#1977B5';
// export default StyleSheet.create({
//     header: {
//         backgroundColor: backgroundBlue,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backButton: {
//         width: '50px'
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         flexDirection: 'row',
//         backgroundColor: backgroundBlue
//     },
//     containerContent: {
//         justifyContent: 'flex-start',
//         flexDirection: 'column',
//         backgroundColor: backgroundBlue
//     },
//     content: {
//         backgroundColor: backgroundBlue,
//     },
//     button: {
//         margin: 10,
//         marginTop: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     inputFields: {
//         //marginTop: '10%',
//         //backgroundColor: 'white',
//         borderWidth: 30,
//     },
//     label: {
//         //padding: '10%',
//         color: 'white',
//     },
//     textInput: {
//         borderWidth: 2, 
//         borderRadius: 7,
//         borderColor: "white", 
//         padding: '3%',
//         margin: '2%',
//         marginTop: '5%',
//         marginBottom: '5%',
//         fontSize: 18,
//         color: 'white',
//     },
//     h24: {
//         fontSize: 24,
//     },
//     h18: {
//         fontSize: 18,
//     },
//     h16: {
//         fontSize: 16,
//     },
//     h14: {
//         fontSize: 14,
//     },
//     Text:{
//         color: 'white',
//     }
    
// });