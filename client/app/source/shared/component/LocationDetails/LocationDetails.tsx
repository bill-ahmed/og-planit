import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import styles from './LocationDetailStyles';
import { Modal, FlatList, Dimensions, Image } from 'react-native';
import { PlanitLocation, Address } from '../../../itinerary/models/location';
import {Rating} from 'react-native-ratings';
import CreateRatingStyles from '../../../itinerary/components/ratings/CreateRatingStyles';


export default function LocationDetails(props) {
    const data: PlanitLocation = props.location;
    const [rating, setRating] = useState(0);
    const formRow = (header, text) =>
        <View>
            <Text >
                {header}
            </Text>
            <Text>
                {text}
            </Text>
        </View>
    const imgWidth = Dimensions.get('window').width;
    return (
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.setModal(false)}>
            <View style={styles.container}>
                <Container>
                    {/* Header content */}
                    <Header noShadow>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button transparent onPress={() => props.setModal(false)}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Location Details</Title>
                        </Body>
                        <Right></Right>
                    </Header>

                    {/* Main body content */}
                    <Content>
                        <View style={styles.container}>
                            <Image
                                style={{ width: imgWidth, height: imgWidth / 1.5, marginTop: 0 }}
                                source={{ uri: data.imageURL }}
                            />
                        </View>


                        <View style={styles.bodyContainer}>
                            <View style={styles.titleRating}>
                                {data.Name && <Text style={styles.eventHeader}>{data.Name}</Text>}
                                {data.Ratings &&
                                <Rating
                                    readonly
                                    startingValue={data.Ratings.AveRatings}
                                    imageSize={28}
                                />}
                            </View>
                            
                            <Text style={styles.criticalInfo}>
                                {"Pricing: $" + data.AvgPrice + "\nAccomodation: up to " + data.GroupSize + " people" + 
                                "\nAverage Time Spent: " + data.AvgTimeSpent + " hours" +
                                "\nStart Time: " + data.StartTime.toTimeString() + 
                                "\nEnd Time: " + data.EndTime.toTimeString()}
                            </Text>
                            
                            <Text style={styles.textHeader}>About:</Text>
                            {data.Description && <Text style={styles.textBody}>{data.Description}</Text>}
                            {data.Description && <Text style={styles.textHeader}>Contact information:</Text>}

                            {data.ContactInfo.Email &&
                            <View style={styles.contactInfoContainer}>
                                <Icon name='envelope' style={styles.iconStyle} type="FontAwesome" />
                                <Text style={styles.textBody}> Email: {data.ContactInfo.Email}</Text>
                            </View>}
                            
                            {data.ContactInfo.Phone && <View style={styles.contactInfoContainer}>
                                <Icon name='phone' style={styles.iconStyle} type="FontAwesome" />
                                <Text style={styles.textBody}>  Phone: {data.ContactInfo.Phone}</Text>
                            </View>}
                            
                            {data.Address &&
                            <View style={styles.contactInfoContainer}>
                                <Icon name='map-marker' style={styles.iconStyle} type="FontAwesome" />
                                <Text style={styles.textBody}>   Address: {`${data.Address.Number} ${data.Address.Street}, ${data.Address.City} ${data.Address.Province}, ${data.Address.Country}`}</Text>
                            </View>}
                        </View>


                    </Content>
                </Container>
            </View>
        </Modal>
    );

}