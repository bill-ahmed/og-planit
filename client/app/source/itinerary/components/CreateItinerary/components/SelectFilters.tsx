import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body} from 'native-base';
import { Divider, Slider } from 'react-native-elements'
import styles from './SelectFiltersStyles';

/**Allow user to select filters when generating an itinerary. */
export default function SelectFilters(props){
    // Keep track of distance user selects
    const [distanceFromLocation, setDistance] = useState(props.itineraryInfo.maxDistance);
    const [distanceBetweenEvents, setDistanceBetweenEvents] = useState(props.itineraryInfo.maxDistanceBetweenEvents);
    const [price, setPrice] = useState(props.itineraryInfo.budget);
    const [gorupSize, setGroupSize] = useState(props.itineraryInfo.groupSize);

    /**All possible categories for events */
    const [eventCategories, setEventCategories] = useState(["Museums", "Hotels", "Arcades", "Beaches", "Aquariums", "Galleries"].sort())

    /**Keep track of which categories are selected */
    const [categoriesSelected, setCategoriesSelected] = useState(props.itineraryInfo.categories);

    const [updateComponent, setUpdateComponent] = useState(true);   // Workaround for component not updating even though another state is

    const itineraryData = props.itineraryInfo;

    /**Update the distance from location */
    const updateDistance = (newDistance: number) => {
        setDistance(newDistance);
        props.updateItinerary({...itineraryData, maxDistance: newDistance});
    }

    const updateDistanceBetweenEvents = (newDistance: number) => {
        setDistanceBetweenEvents(newDistance); 
        props.updateItinerary({...itineraryData, maxDistanceBetweenEvents: newDistance})
    }

    const updatePrice = (newPrice: number) => {
        setPrice(newPrice); 
        props.updateItinerary({...itineraryData, budget: newPrice})
    }

    const updateGroupSize = (val: number) => {
        setGroupSize(val); 
        props.updateItinerary({...itineraryData, groupSize: val})
    }

    /**Update which check boxes the user has selected for categories */
    const updateCategoriesSelected = (categorySelected: string) => {
        let index = categoriesSelected.indexOf(categorySelected);
        let temp = categoriesSelected;

        // If the category selected is in categoriesSelected, then remove it
        if(index !== -1){
            temp.splice(index, 1);
            setCategoriesSelected(temp);
        } 
        else {
            // Otherwise, app this category to list of selected
            temp.push(categorySelected);
            setCategoriesSelected(temp);
        }
        
        setUpdateComponent(!updateComponent);
        props.updateItinerary({...itineraryData, categories: temp});
    }

    return(
        <ScrollView style={styles.content}>
            {/* Main Content */}
            <View style={styles.filtersIntroduction}>

                {/* Overview text */}
                <View>
                    <Text style={styles.text}>
                        Now for some filters! This will help us give you a more personalized itinerary.
                    </Text>
                    
                    <Text style={styles.subtext}>
                        Don't worry, you can always modify any events we add.
                    </Text>
                </View>
                

                {/* Section 1: Choose distance from location */}
                <View style={styles.distanceContainer}>
                    <Text style={styles.heading}>Distances</Text>

                    {/* Distance from user's city */}
                    <Text style={styles.text}>Distance from City: {distanceFromLocation} KM</Text>
                    <Slider style={styles.slider} thumbTintColor="#1977B5" value={distanceFromLocation} onValueChange={(value) => updateDistance(value)} 
                        minimumValue={0} maximumValue={500} step={1}/>

                    {/* Max distance between events */}
                    <Text style={styles.text}>Max Distance between Events: {distanceBetweenEvents} KM</Text>
                    <Slider style={styles.slider} thumbTintColor="#1977B5" value={distanceBetweenEvents} onValueChange={(value) => updateDistanceBetweenEvents(value)} 
                        minimumValue={0} maximumValue={500} step={1}/>

                </View>

                <Divider/>

                {/* Section 1.5: Choose price range */}
                <View style={styles.distanceContainer}>
                    <Text style={styles.heading}>Price & Group Sizes</Text>

                    {/* Max price for user */}
                    <Text style={styles.text}>Maximum Price: ${price}</Text>
                    <Slider style={styles.slider} thumbTintColor="#1977B5" value={price} onValueChange={(value) => updatePrice(value)} 
                        minimumValue={0} maximumValue={500} step={5}/>

                    {/* max group size for user */}
                    <Text style={styles.text}>Group Size: {gorupSize} {gorupSize === 1 ? "Person" : "People"} </Text>
                    <Slider style={styles.slider} thumbTintColor="#1977B5" value={gorupSize} onValueChange={(value) => updateGroupSize(value)} 
                        minimumValue={0} maximumValue={20} step={1}/>

                </View>

                <Divider/>

                {/* Section 2: Choose possible categories */}
                <View style={styles.categoriesContainer}>
                    <Text style={styles.heading}>Categories</Text>

                    {eventCategories.map((category: string, index: number) => {
                        return(
                            
                            <ListItem key={index}>
                                <TouchableOpacity style={styles.touchableOpacity} onPress={() => updateCategoriesSelected(category)}>
                                    <Body>
                                        <Text> {category} </Text>
                                    </Body>

                                    <CheckBox onPress={() => updateCategoriesSelected(category)} checked={categoriesSelected.indexOf(category) !== -1}/>
                                </TouchableOpacity>
                            </ListItem>
                            
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}