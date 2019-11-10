import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body} from 'native-base';
import { Slider } from 'react-native-elements'
import styles from './SelectFiltersStyles';

/**Allow user to select filters when generating an itinerary. */
export default function SelectFilters(props){
    // Keep track of distance user selects
    const [distanceFromLocation, setDistance] = useState(0);

    /**All possible categories for events */
    const [eventCategories, setEventCategories] = useState(["Museums", "Hotels", "Arcades", "Concerts", "Bars"].sort())

    /**Keep track of which categories are selected */
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    const [updateComponent, setUpdateComponent] = useState(true);   // Workaround for component not updating even though another state is

    const itineraryData = props.itineraryInfo;

    /**Update the distance from location */
    const updateDistance = (newDistance: number) => {
        setDistance(newDistance);
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
                    <Text style={styles.heading}>Distance</Text>
                    <Text style={styles.text}>Distance from {itineraryData.location}: {distanceFromLocation} KM</Text>

                    <Slider style={styles.slider} value={distanceFromLocation} onValueChange={(value) => updateDistance(value)} 
                        minimumValue={0} maximumValue={100} step={1}/>

                </View>

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

                {/* Section 3: Miscellaneous options */}
                <View style={styles.otherContainer}>
                    <Text style={styles.heading}>Miscellaneous</Text>
                </View>
            </View>

            {/* Footer content */}
            <View>
                <Text>
                    Next button here
                </Text>
            </View>
        </ScrollView>
    );
}