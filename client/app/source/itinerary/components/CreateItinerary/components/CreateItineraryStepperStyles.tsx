import {StyleSheet} from 'react-native';

const backgroundBlue = '#1977B5';
export default StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        marginBottom: 20
    },
    heading: {
        fontSize: 28,
        color: backgroundBlue
    },
    content: {
        padding: 20,
    },
    viewPager: {
        flex: 1,
    },
    screenContainer: {
        padding: 20
    },
    buttonText: {
      color: backgroundBlue, // Colour for font if "transparent" flag given
      fontSize: 24,
      margin: 5
    },
    buttonIcon: {
        color: backgroundBlue
    }
});

export const StepperStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: backgroundBlue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: backgroundBlue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: backgroundBlue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: backgroundBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: backgroundBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: backgroundBlue,
  }