import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions} from 'react-native';
import { Container, Content,  Button, Icon, Form, Item, Label, Input} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import GeneralInfo from './GeneralInfo';
import styles, { StepperStyles } from './CreateItineraryStepperStyles';

/**Represent a new itinerary the user will construct */
interface NewItinerary{
    /**Name of the itinerary */
    name: String,
    /**Where the user is located */
    location: String,
    /**Start date and time */ 
    startTime: Date,
    /**End date and time */
    endTime: Date,
}

/**A progress stepper to allow users to create a new itinerary */
export default function CreateItineraryStepper(props){
    var itinerary : NewItinerary = {
        name: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
    }

    const [itineraryInfo, setItineraryInfo] = useState(itinerary);
    const[currentStep, setCurrentStep] = useState(0);

    // Component to render at each step
    const steps = [
        <GeneralInfo itineraryInfo={itineraryInfo} 
            updateItinerary={(newData: NewItinerary) => updateItineraryInfo(newData)} 
            goNext={() => handleNextStep()} goBack={() => handlePrevStep()}/>
        ,

        <View>
            <Text>Select Filters</Text>
        </View>
    ];

    const labels = ["General Info", "Select Filters"];

    /**Update all data in itinerary */
    const updateItineraryInfo = (newData : NewItinerary) => {
        console.log("new itinerary data", newData);
        setItineraryInfo(newData);
    }

    /**Go to the next step in creating itinerary */
    const handleNextStep = () => {
        if(currentStep < steps.length){
            setCurrentStep(currentStep + 1);
        }
    }

    /**Go to the previous step in creating itinerary */
    const handlePrevStep = () => {
        if(currentStep > 0){
            setCurrentStep(currentStep - 1);
        }
    }

    return(
        <View style={styles.container}>
            
            {/* Header content */}
            <View style={styles.header}>
                <Button transparent onPress={() => props.navigation.pop()}>
                  <Icon name="arrow-back" />
                </Button>
                
                <Text style={styles.heading}>
                  Create an Itinerary
                </Text>
            </View>

            <StepIndicator
                customStyles={StepperStyles}
                currentPosition={currentStep} 
                stepCount={steps.length}
                labels={labels}
            />

            {steps[currentStep]}
        </View>
    );
}