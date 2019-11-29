import { StyleSheet } from 'react-native'
const blueTheme = '#1977B5';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: blueTheme,
    },
    contactInfoContainer: {
        flex:1,
        paddingRight: 10,
        marginBottom: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    content: {
        padding: 20,
    },
    textHeader:{
        fontSize: 25,
        marginTop: 40,
        color: "white",
    },
    textBody:{
        fontSize: 20,
        color: "#C4C7C6",
    },
    criticalInfo:{
        marginTop: 5,
        fontSize: 20,
        color: "white",
    },
    eventHeader:{
        fontSize: 28,
        color: "white",
        fontWeight: 'bold',
    },
    iconStyle: {
        color: "white",
    },
    iconStyle2: {
        color: "white",
        marginLeft: 3
    },
    bodyContainer: {
        flex:1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 10,
        backgroundColor: blueTheme,
    },
    eventTitle: {
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 15,
        marginTop: 30,
        elevation: 10,
    },
    ratingStyle:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5,
    },
    backgroundStyle: {
        backgroundColor: blueTheme
    },
    imageContainer:{
        backgroundColor: blueTheme,
        shadowColor:'black',
        shadowOffset:{width: 10, height: 10},
        shadowRadius: 10,
        elevation: 15,
    },
    imageModalContainer:{
        backgroundColor: "black",
        flex:1,
        justifyContent: 'center',
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