import React, { useState } from 'react';
import { Modal, View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions} from 'react-native';
import { Container, Content,  Button, Icon, Form, Item, Label, Input} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import GeneralInfo from './GeneralInfo';
import SelectFilters from './SelectFilters';
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

    const [itineraryInfo, setItineraryInfo] = useState(itinerary);  // All itinerary data to be uploaded
    const [currentStep, setCurrentStep] = useState(0);  // Current step in progress bar

    // Component to render at each step
    const steps = [
        <GeneralInfo itineraryInfo={itineraryInfo} 
            updateItinerary={(newData: NewItinerary) => updateItineraryInfo(newData)} 
            goNext={() => handleNextStep()} goBack={() => handlePrevStep()}/>
        ,

        <SelectFilters itineraryInfo={itineraryInfo} updateItinerary={(newData: NewItinerary) => updateItineraryInfo(newData)}
            goNext={() => handleNextStep()} goBack={() => handlePrevStep()}/>
        ,
        <View>
            <Text>Generate the itinerary</Text>
        </View>
        ,
        <View>
            <Text>Save/Upload itinerary</Text>
        </View>

    ];

    const labels = ["General Info", "Select Filters", "Generate Itinerary", "Done!"];

    /**Update all data in itinerary */
    const updateItineraryInfo = (newData : NewItinerary) => {
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
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle='fullScreen' onRequestClose={() => props.close()}>
            <View style={styles.container}>
                
                {/* Header content */}
                <View style={styles.header}>
                    <Button transparent onPress={() => props.close()}>
                    <Icon name="arrow-back" />
                    </Button>
                    
                    <Text style={styles.heading}>
                    Create an Itinerary
                    </Text>
                </View>

                {/* Main body content */}
                <View style={styles.content}>
                    <StepIndicator
                        customStyles={StepperStyles}
                        currentPosition={currentStep} 
                        stepCount={steps.length}
                        labels={labels}
                    />

                    {steps[currentStep]}
                </View>

                {/* Footer content */}
                <View style={styles.footer}>
                    <Button full transparent iconLeft disabled={currentStep === 0} onPress={() => handlePrevStep()}>
                        <Icon style={styles.buttonIcon} name='arrow-round-back'/>
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>

                    <Button full transparent iconRight disabled={currentStep === steps.length} onPress={() => handleNextStep()}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon style={styles.buttonIcon} name='arrow-round-forward'/>
                    </Button>
                </View>
            </View>
        </Modal>
    );
}