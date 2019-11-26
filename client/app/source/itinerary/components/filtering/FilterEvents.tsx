import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Left, Button, Icon, Title, Subtitle, Body, Right } from 'native-base';
import styles from "./FilterEventsStyles";
import {Divider, Input, Slider, ListItem, CheckBox} from "react-native-elements";

/**A component to allow users to filter events by various criteria. */
export default function FilterEvents(props){
    const data = require("./mockCategory.json");
    const [date, setDate] = useState(new Date());
    const getDate = (newDate) => {
        setDate(newDate) 
    }

    const[price, setPrice] = useState(0);
    const getPrice = (newPrice) => {
        setPrice(newPrice);
    }

    const[isChecked, setChecked] = useState([]);
    const getChecked = (newChecked) => {
        setChecked(newChecked);
    }


    return(
        <Container>
            <Header noLeft>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Filtering
                    </Title>
                </Body>
            </Header>

            <ScrollView >

                <Content>
                <Text style={styles.dateHeader}>
                    Date
                </Text>
                <View style={styles.contentDateTime}>
                <Text style={styles.dateBody}>
                    Start Date:
                </Text>
                <DatePicker
                    defaultDate={new Date(2019, 4, 4)}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={styles.dateBody}
                    placeHolderTextStyle={styles.datePlaceholder}
                    onDateChange={this.setDate}
                    disabled={false}
                />
                <Text style={styles.dateBody}>
                    End Date:
                </Text>
                <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"spinner"}
                    placeHolderText="Select date"
                    textStyle={styles.dateBody}
                    placeHolderTextStyle={styles.datePlaceholder}
                    onDateChange={this.setDate}
                    disabled={false}
                />
                </View>
                </Content>
                
                <Divider style = {styles.divider}/>

                <Content>
                <Text style={styles.dateHeader}>
                    Pick your time
                </Text>
                <View>
                <Input
                    placeholder='Start time'
                />
                <Input
                    placeholder='End time'
                />
                </View>
                </Content>

                <Content>
                    <Text style={styles.dateHeader}>
                        Pricing
                    </Text>
                    <View style={styles.contentPricing}>
                        <Slider
                            value={price}
                            onValueChange={newPrice => setPrice(newPrice)}
                            minimumValue={1}
                            maximumValue={2500}
                            step={1}
                        />
                        <Text>Up to ${price}</Text>
                    </View>
                </Content>


                { <Content>
                    <Text style={styles.dateHeader}>
                        Category
                    </Text>
                    <View style={styles.contentCategory}>
                    {data.map(category => {

                        return(
                            <CheckBox checked={category.Type in isChecked}
                                title={category.Type}
                                onPress={() => {
                                    let index = isChecked.indexOf(category.Type)
                                    if(index !== -1){
                                        let temp = isChecked
                                        temp.splice(index, 1)
                                        setChecked(temp)
                                    }
                                    else{
                                        let temp = isChecked
                                        temp.push(category.Type)
                                        setChecked(temp)
                                    }
                                }}
                            />
                        )
                    })}
                    </View>
                </Content> }
            </ScrollView>
      </Container>
    );
}