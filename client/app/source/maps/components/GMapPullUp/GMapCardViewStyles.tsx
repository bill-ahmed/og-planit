import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'absolute', 
      bottom: 0, 
      minWidth: 320,
      width: "100%",
      maxHeight: 250,
      padding: 10,
    },
    content: {
        width: "100%",
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 28,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.5)'
    },
    description: {
        fontSize: 18,
        marginTop: 10,
    },
    footer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
    }
  });