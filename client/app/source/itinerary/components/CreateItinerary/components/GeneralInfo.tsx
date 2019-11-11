import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Form, Item, Label, Input} from 'native-base';
import styles from './GeneralInfoStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions, ScrollView} from 'react-native';

export default function GeneralInfo(props){

  // Keep track of all itinerary data
  const [itineraryData, setItineraryData] = useState(props.itineraryInfo);

  /**Update name of the itinerary
   * @param name The new name for current itinerary
   */
  const handleSetName = (name: string)=>{
    let temp = {...itineraryData, name: name};

    props.updateItinerary(temp);
    setItineraryData(temp); // We update local state so component can re-render easily
  }

  /**Update name of the location
   * @param location The new location
   */
  const handleSetLocation= (name: string) =>{
    let temp = {...itineraryData, location: name};
    
    props.updateItinerary(temp);
    setItineraryData(temp);
  }

  /** Update the end data for this itinerary */
  const handleSetStartDate = (newStartDate: Date) => {
    let temp = {...itineraryData, startTime: newStartDate};

    props.updateItinerary(temp);
    setItineraryData(temp);

    // Update itinerary data to reflect this
  }

  /** Update the end data for this itinerary */
  const handleSetEndDate = (newEndDate: Date) => {
    let temp = {...itineraryData, endTime: newEndDate};
    
    props.updateItinerary(temp);
    setItineraryData(temp);

    // Update itinerary data to reflect this
  }

  /** Update start time for this itinerary */
  const handleSetStartTime = (newStartTime : Date) => {
    let temp = {...itineraryData, startTime: newStartTime};

    props.updateItinerary(temp);
    setItineraryData(temp);
  }

  /** Update end time for this itinerary */
  const handleSetEndTime = (newEndTime : Date) => {
    let temp = {...itineraryData, endTime: newEndTime};

    props.updateItinerary(temp);
    setItineraryData(temp);

  }

  
  /**Callback for when user clicks "Next" button */
  const handleNextButton = (): void =>{
    props.goNext();
  }

  /**Handle user selecting a starting date for itinerary*/
  const handleChooseStartDate = (): void => {
    trigggerDateSelection(itineraryData.startTime, handleSetStartDate);
  }

  /**Handle user selecting a end date for itinerary*/
  const handleChoosingEndDate = (): void => {
    trigggerDateSelection(itineraryData.endTime, handleSetEndDate);
  }

  /**Handle user selecting a starting time for itinerary*/
  const handleChoosingStartTime = (): void => {
    triggerTimeSelection(itineraryData.starTime, handleSetStartTime);
  }

  /**Handle user selecting a starting time for itinerary*/
  const handleChoosingEndTime = (): void => {
    triggerTimeSelection(itineraryData.endTime, handleSetEndTime);
  }

  /**Show the user a date selection modal.
   * @param date The current date
   * @param callback The function to execute once the user has selected. Provides a Date() object
   */
  const trigggerDateSelection = async (date: Date, callback: Function): Promise<any> => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let tempDate = date;

        // Update year, month and day component of currently stored date
        date.setFullYear(year)
        date.setMonth(month),
        date.setDate(day);

        callback(tempDate);
      }

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
    
  }

  /**Show the user a time selection modal.
   * @param startDate The current data that needs to be edited
   * @param callback The function to execute once user has selected the date. Provide {hour: number, minute: number}
   */
  const triggerTimeSelection = async (startDate: Date, callback: Function): Promise<any> => {
      try {
        const { action, hour, minute} = await TimePickerAndroid.open({
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          is24Hour: false,
        })

        // Once user has selected time, continue
        if(action === TimePickerAndroid.timeSetAction){

          // Update time
          let newTime = (startDate ? startDate : new Date());
          newTime.setHours(hour, minute);

          callback(newTime);
        }
  
      } catch ({code, message}) {
        console.log("Error ocurred trying to get the time.", code, message);
      }
  }

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
                  <Item floatingLabel style={styles.formItem} onPress={() => handleChooseStartDate()}>
                    <Label>Start Date</Label>
                    <Icon active name='calendar'/>
                    <Input disabled value={itineraryData.startTime.toDateString()}/>
                  </Item>

                  <Item floatingLabel style={styles.formItem} onPress={() => handleChoosingStartTime()}>
                    <Label>Start Time</Label>
                    <Icon active name='clock'/>
                    <Input disabled value={itineraryData.startTime.toTimeString().slice(0, 5)}/>
                  </Item>
                </Form>
                
                {/* Populate end date/time */}
                <Form style={styles.form}>
                  <Item floatingLabel error={itineraryData.endTime < itineraryData.startTime} style={styles.formItem} onPress={() => handleChoosingEndDate()}>
                    <Label>End Date</Label>
                    <Icon active name='calendar'/>
                    <Input disabled value={itineraryData.endTime.toDateString()}/>
                  </Item>

                  <Item floatingLabel error={itineraryData.endTime < itineraryData.startTime} style={styles.formItem} onPress={() => handleChoosingEndTime()}>
                    <Label>End Time</Label>
                    <Icon active name='clock'/>
                    <Input disabled value={itineraryData.endTime.toTimeString().slice(0, 5)}/>
                  </Item>
                </Form>
              </View>
            </View>

          </View>
        </ScrollView>
    );
}