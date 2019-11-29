import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import styles from './LocationDetailStyles';
import { Modal, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
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

    const [imageModalOpen, setImageModal] = useState(false);
    const setImageModalOpen = (val: boolean) => {
        setImageModal(val);

    }

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
                    <Content style={styles.backgroundStyle}>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => setImageModalOpen(true)}>
                                <Image
                                    style={{ width: imgWidth, height: imgWidth / 3, }}
                                    source={{ uri: data.imageURL }}
                                />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.bodyContainer}>
                            <View style={styles.eventTitle}>
                                {data.Name && <Text style={styles.eventHeader}>{data.Name}</Text>}
                            </View>
                            
                            <View style={styles.ratingStyle}>
                                <Rating
                                        readonly
                                        startingValue={getRndInteger(1,5)}
                                        imageSize={28}
                                />
                            </View>

                            <Text style={styles.criticalInfo}>
                                {"Pricing: $" + data.AvgPrice}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"Accomodation: up to " + data.GroupSize + " people"}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"Average Time Spent: " + data.AvgTimeSpent + " minutes"}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"Start Date: " + data.StartTime.getFullYear() + "/" + (data.StartTime.getMonth()+1) + "/" + data.StartTime.getDate()}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"Start Time: " + data.StartTime.toTimeString()}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"End Date: " + data.EndTime.getFullYear() + "/" + (data.EndTime.getMonth()+1) + "/" + data.EndTime.getDate()}
                            </Text>
                            <Text style={styles.criticalInfo}>
                                {"End Time: " + data.EndTime.toTimeString()}
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
                                <Icon name='map-marker' style={styles.iconStyle2} type="FontAwesome" />
                                <Text style={styles.textBody}>   Address: {`${data.Address.Number} ${data.Address.Street}, ${data.Address.City} ${data.Address.Province}, ${data.Address.Country}`}</Text>
                            </View>}
                        </View>


                    </Content>
                </Container>
            </View>
            {imageModalOpen &&
                <Modal animationType="fade" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => setImageModal(false)} >
                    <View style={styles.imageModalContainer}>
                            <Button transparent onPress={() => setImageModalOpen(false)}>
                                <Icon name='close' type='Ionicons' />
                            </Button>

                        <Image
                            style={{ width: imgWidth, height: imgWidth }}
                            source={{ uri: data.imageURL }}
                        />
                    </View>
                    
                </Modal>
            }
        </Modal>
    );

    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

}