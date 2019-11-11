import React, { useState } from 'react';
import { Modal, View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions, ScrollView} from 'react-native';
import { Container, Content,  Button, Icon, Form, Item, Label, Input, Footer} from 'native-base';
import { ViewPager } from 'rn-viewpager'
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
    /**Maximum distance from location */
    maxDistance: number,
    categories: [],
}

/**A progress stepper to allow users to create a new itinerary */
export default function CreateItineraryStepper(props){
    var itinerary : NewItinerary = {
        name: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
        maxDistance: 0,
        categories: [],
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
            <Text> {JSON.stringify(itineraryInfo)} </Text>
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

    /**Handle updating a new step */
    const updateCurrentStep = (newStep: number) => {
        if(newStep > currentStep){
            handleNextStep();
        } else {
            handlePrevStep();
        }
    }

    return(
       
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle='fullScreen' hardwareAccelerated={true} onRequestClose={() => props.close()}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    
                    {/* Header content */}
                    <View style={styles.header}>
                        <Button transparent onPress={() => props.close()}>
                        <Icon name="close" />
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
                    </View>

                    <ViewPager style={styles.viewPager} initialPage={0} onPageSelected={elem => updateCurrentStep(elem.position)}>
                            {steps.map((elem: any, index: number) => {
                                return(
                                    <View style={styles.screenContainer} key={index}>
                                        {elem}
                                    </View>
                                );
                            })}
                    </ViewPager>
                    
                    
                </View>
            </ScrollView>
        </Modal>

    );
}