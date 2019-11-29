import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Modal, View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions, ScrollView} from 'react-native';
import { Container, Content,  Button, Icon, Form, Item, Label, Input, Footer} from 'native-base';
import { ViewPager } from 'rn-viewpager'
import StepIndicator from 'react-native-step-indicator';
import GeneralInfo from './GeneralInfo';
import SelectFilters from './SelectFilters';
import GenerateItinerary from './GenerateItinerary';
import { Filter, PlanitLocation } from "../../../models/location";
import globalVariables from '../../../../../../global';
import styles, { StepperStyles } from './CreateItineraryStepperStyles';

/**Represent a new itinerary the user will construct */
export interface NewItinerary{
    /**Name of the itinerary */
    name: string,
    /**Where the user is located */
    location: string,
    /**Start date and time */ 
    startTime: Date,
    /**End date and time */
    endTime: Date,
    /**Maximum distance from location */
    maxDistance: number,
    maxDistanceBetweenEvents: number,
    categories: [],
    groupSize: number,
    budget: 0,
}

/**A progress stepper to allow users to create a new itinerary */
export default function CreateItineraryStepper(props){
    var itinerary : NewItinerary = {
        name: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
        maxDistance: 0,
        maxDistanceBetweenEvents: 0,
        categories: [],
        groupSize: 0,
        budget: 0,
    };

    var filter: Filter = {
        Name: itinerary.name,
        City: itinerary.location,
        StartTime: itinerary.startTime,
        EndTime: itinerary.endTime,
        TravelDistance: itinerary.maxDistanceBetweenEvents,
        Categories: itinerary.categories,
        GroupSize: itinerary.groupSize,
        Budget: itinerary.budget
    };
    //const generatedItinerary = CreateFromUserSetting(filter);
    const [itineraryInfo, setItineraryInfo] = useState(itinerary);  // All itinerary data to be uploaded
    const [filters, setFilter] = useState(filter);
    const [currentStep, setCurrentStep] = useState(0);  // Current step in progress bar
    const accessToken = useSelector(state => state['UserInfo']['accessToken']);

    // Component to render at each step
    const steps = [
        <GeneralInfo itineraryInfo={itineraryInfo} 
            updateItinerary={(newData: NewItinerary) => updateItineraryInfo(newData)} 
            goNext={() => handleNextStep()} goBack={() => handlePrevStep()}/>
        ,

        <SelectFilters itineraryInfo={itineraryInfo} updateItinerary={(newData: NewItinerary) => updateItineraryInfo(newData)}
            goNext={() => handleNextStep()} goBack={() => handlePrevStep()}/>
        ,
        <GenerateItinerary reloadItineraries={() => props.reloadItineraries()} closeModal={() => props.close()} uploadItinerary={(events: PlanitLocation[]) => uploadItinerary(events)} itineraryFilterInfo={filters}/>
    ];

    const labels = ["General Info", "Select Filters", "Generate Itinerary"];

    /**Update all data in itinerary */
    const updateItineraryInfo = (newData : NewItinerary) => {
        setItineraryInfo(newData);
        setFilter({
            Name: newData.name,
            City: newData.location,
            StartTime: newData.startTime,
            EndTime: newData.endTime,
            TravelDistance: newData.maxDistanceBetweenEvents,
            Categories: newData.categories,
            GroupSize: newData.groupSize,
            Budget: newData.budget
        });
    }

    /**Upload this user's generated itinerary to database */
    const uploadItinerary = async (eventData: PlanitLocation[]): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            // Body data for HTTP request
            let body = {
                accessToken: accessToken,
                itineraryDetails: {
                    name: itineraryInfo.name,
                    last_edit_time: new Date()
                },
                events: eventData
            }
            
            // Headers and stringified body for HTTP request
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body)
            }

            // First, validate the data
            if(body.itineraryDetails.name !== "" && body.events.length !== 0){
                fetch(`${globalVariables.ENDPOINT}createItinerary`, options)
                .then(resp => {
                    resolve(resp.ok);
                })
                .catch(res => {
                    reject(res);
                    console.log(res)
                });

            } else {
                reject(false);
            }
        });
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
        </Modal>

    );
}