import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Form, Item, Label, Input} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from './GeneralInfoStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions, ScrollView} from 'react-native';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import { NewItinerary } from './CreateItineraryStepper';

export default function GeneralInfo(props){

  // Keep track of all itinerary data
  const itineraryData = props.itineraryInfo;

  // Start date and time
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startTimeVisible, setStartTimeVisible] = useState(false);

  // End date and time
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  /**Update name of the itinerary
   * @param name The new name for current itinerary
   */
  const handleSetName = (name: string)=>{
    let temp = {...itineraryData, name: name};

    props.updateItinerary(temp);// We update local state so component can re-render easily
  }

  /**Update name of the location
   * @param location The new location
   */
  const handleSetLocation= (name: string) =>{
    let temp = {...itineraryData, location: name};
    
    props.updateItinerary(temp);
  }

  /** Update the end data for this itinerary */
  const handleSetStartDate = (newStartDate: Date) => {
    let temp = {...itineraryData, startTime: newStartDate};

    props.updateItinerary(temp);
    // Update itinerary data to reflect this
  }

  /** Update the end data for this itinerary */
  const handleSetEndDate = (newEndDate: Date) => {
    let temp = {...itineraryData, endTime: newEndDate};
    
    props.updateItinerary(temp);
  }

  /** Update start time for this itinerary */
  const handleSetStartTime = (newStartTime : Date) => {
    let curr = itineraryData.startTime;

    newStartTime.setFullYear(curr.getFullYear(), curr.getMonth(), curr.getDate())
    let temp = {...itineraryData, startTime: newStartTime};

    props.updateItinerary(temp);
  }

  /** Update end time for this itinerary */
  const handleSetEndTime = (newEndTime : Date) => {
    let curr = itineraryData.endTime;
    
    newEndTime.setFullYear(curr.getFullYear(), curr.getMonth(), curr.getDate())
    let temp = {...itineraryData, endTime: newEndTime};

    props.updateItinerary(temp);
  }

  /**All the date and time picker to display */
  const dateTimePickers = [
    {
      isVisible: startDateVisible,  // should date/time picker be visible or not
      onConfirm: (res: Date) => {setStartDateVisible(false); handleSetStartDate(res)},  // Function to call on complete
      onCancel: () => setStartDateVisible(false), // Function to call if user hits "Cancel" button
      mode: "date"  // What type of picker to show
    },
    {
      isVisible: startTimeVisible,
      onConfirm: (res: Date) => {setStartTimeVisible(false); handleSetStartTime(res)},
      onCancel: () => setStartTimeVisible(false),
      mode: "time"
    },
    {
      isVisible: endDateVisible,
      onConfirm: (res: Date) => {setEndDateVisible(false); handleSetEndDate(res)},
      onCancel: () => setEndDateVisible(false),
      mode: "date"
    },
    {
      isVisible: endTimeVisible,
      onConfirm: (res: Date) => {setEndTimeVisible(false); handleSetEndTime(res)},
      onCancel: () => setEndTimeVisible(false),
      mode: "time"
    },
  ];

  return(
    <ScrollView>
        <View style={{height: '100%'}}>

          {/* Main content of page */}
          <View style={styles.content}>

            <Text style={styles.text}>
              Lets start with some general information. Fill out all the fields below to continue.
            </Text>

            {/* Get name and initial location for itinerary */}
            <Item regular style={styles.textInputContainer} error={itineraryData.name === ""} success={itineraryData.name !== ""}>
              <Input style={styles.textInput} keyboardType="default" placeholder="Name" onChange={text => handleSetName(text.nativeEvent.text)}/>
            </Item>
            
            <Item regular style={styles.textInputContainer} error={itineraryData.location === ""} success={itineraryData.location !== ""}>
              <Input style={styles.textInput} keyboardType="default" placeholder="City (e.g. Toronto, Vancouver)" onChange={text => handleSetLocation(text.nativeEvent.text)}/>
            </Item>

            {/* Get user to enter start date/time */}
            <View style={styles.selectDateContainer}>
              <Form style={styles.form}>
                <Item floatingLabel style={styles.formItem} onPress={() => setStartDateVisible(true)}>
                  <Label>Start Date</Label>
                  <Icon active name='calendar'/>
                  <Input disabled value={itineraryData.startTime.toDateString()}/>
                </Item>

                <Item floatingLabel style={styles.formItem} onPress={() => setStartTimeVisible(true)}>
                  <Label>Start Time</Label>
                  <Icon active name='clock'/>
                  <Input disabled value={itineraryData.startTime.toTimeString().slice(0, 5)}/>
                </Item>
              </Form>
              
              {/* Populate end date/time */}
              <Form style={styles.form}>
                <Item floatingLabel error={itineraryData.endTime < itineraryData.startTime} style={styles.formItem} onPress={() => setEndDateVisible(true)}>
                  <Label>End Date</Label>
                  <Icon active name='calendar'/>
                  <Input disabled value={itineraryData.endTime.toDateString()}/>
                </Item>

                <Item floatingLabel error={itineraryData.endTime < itineraryData.startTime} style={styles.formItem} onPress={() => setEndTimeVisible(true)}>
                  <Label>End Time</Label>
                  <Icon active name='clock'/>
                  <Input disabled value={itineraryData.endTime.toTimeString().slice(0, 5)}/>
                </Item>
              </Form>
            </View>
          </View>

          {dateTimePickers.map(elem => {
            return(
              <DateTimePicker
                  isVisible={elem.isVisible}
                  onConfirm={(res) => elem.onConfirm(res)}
                  onCancel={() => elem.onCancel()}
                  mode={elem.mode}
              />
            );
          })}

        </View>
      </ScrollView>
  );
}