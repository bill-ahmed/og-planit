import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Form, Item, Label, Input} from 'native-base';
import styles from './GeneralInfoStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, Dimensions} from 'react-native';

export default function NewItinerary(props){

  const { navigate } = props.navigation;  // Allow going to other screens in stack

  // Keep track of when itinerary should start and end
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Keep track of name for this itinerary
  const [name, setName] = useState("");

  // Location that user is interested in
  const [location, setLocation] = useState("");

  /**Update name of the itinerary
   * @param name The new name for current itinerary
   */
  const handleSetName=(name)=>{
    setName(name)
  }

  /**Update name of the location
   * @param location The new location
   */
  const handleSetLocation=(name)=>{
    setLocation(location)
  }
  
  /**Callback for when user clicks "Next" button */
  const handleNextButton = (): void =>{

    // Pass all data to next screen
    navigate('FilterSelection', { data: 
      {
        itineraryName: name, 
        itineraryLocation: location, 
        startDate: startDate, 
        endDate: endDate
      } 
    })
  }

  /**Handle user selecting a starting date for itinerary*/
  const handleChooseStartDate = (): void => {
    trigggerDateSelection(startDate, setStartDate);
  }

  /**Handle user selecting a end date for itinerary*/
  const handleChoosingEndDate = (): void => {
    trigggerDateSelection(endDate, setEndDate);
  }

  /**Handle user selecting a starting time for itinerary*/
  const handleChoosingStartTime = (): void => {
    triggerTimeSelection(startDate, setStartDate);
  }

  /**Handle user selecting a starting time for itinerary*/
  const handleChoosingEndTime = (): void => {
    triggerTimeSelection(endDate, setEndDate);
  }

  /**Show the user a date selection modal.
   * @param date The current date
   * @param callback The function to execute once the user has selected. Provides a Date() object
   */
  const trigggerDateSelection = async (date: Date, callback: Function): Promise<any> => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        callback(new Date(year, month, day));
      }

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
    
  }

  /**Show the user a time selection modal.
   * @param startDate The current data that needs to be edited
   * @param callback The function to execute once user has selected the date. Provide {hour: number, minute: number}
   */
  const triggerTimeSelection = (startDate: Date, callback: Function): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const {action, hour, minute} = TimePickerAndroid.open({
          hour: new Date().getSeconds(),
          minute: new Date().getMinutes(),
          is24Hour: false,
        }).then(res => {
          // Once user has selected time, continue
          if(res.action === TimePickerAndroid.timeSetAction){

            // Update time
            let newTime = startDate;
            newTime.setHours(hour, minute);
            callback(newTime);
          }
        });
  
      } catch ({code, message}) {
        console.log("Error ocurred trying to get the time.", code, message);
      }
    })
    
  }

    return(
      <View>
          <View style={{height: '100%'}}>
            {/* Header content */}
            <View style={styles.header}>
                <Button transparent onPress={() => props.navigation.pop()}>
                  <Icon name="arrow-back" />
                </Button>
                
                <Text style={styles.heading}>
                  Create an Itinerary
                </Text>
            </View>

            {/* Main content of page */}
            <View style={styles.content}>
              <Text style={styles.text}>
                Lets start with some general information. Fill out all the fields below to continue.
              </Text>

              {/* Get name and initial location for itinerary */}
              <TextInput style={styles.textInput} keyboardType="default" placeholder="Name" onChange={text => handleSetName(text)}/>

              <TextInput style={styles.textInput} keyboardType="default" placeholder="Loction (e.g. '1265 Military Trail')" onChange={text => handleSetLocation(text)}/>

              {/* Get user to enter start date/time */}
              <View style={styles.selectDateContainer}>
                <Form style={styles.form}>
                  <Item floatingLabel style={styles.formItem} onPress={() => handleChooseStartDate()}>
                    <Label>Start Date</Label>
                    <Icon active name='calendar'/>
                    <Input disabled value={startDate.toDateString()}/>
                  </Item>

                  <Item floatingLabel style={styles.formItem} onPress={() => handleChoosingStartTime()}>
                    <Label>Start Time</Label>
                    <Icon active name='clock'/>
                    <Input disabled value={startDate.toTimeString()}/>
                  </Item>
                </Form>
                
                {/* Populate end date/time */}
                <Form style={styles.form}>
                  <Item floatingLabel style={styles.formItem} onPress={() => handleChoosingEndDate()}>
                    <Label>End Date</Label>
                    <Icon active name='calendar'/>
                    <Input disabled value={endDate.toDateString()}/>
                  </Item>

                  <Item floatingLabel style={styles.formItem} onPress={() => handleChoosingEndTime()}>
                    <Label>End Time</Label>
                    <Icon active name='clock'/>
                    <Input disabled value={endDate.toTimeString()}/>
                  </Item>
                </Form>
              </View>
            </View>

            {/* Footer content */}
            <View style={styles.footer}>
              <Button full transparent iconRight onPress={() => handleNextButton()}>
                <Text style={styles.buttonText}>Next</Text>
                <Icon style={styles.buttonIcon} name='arrow-forward'/>
              </Button>
            </View>

          </View>
        </View>
    );
}