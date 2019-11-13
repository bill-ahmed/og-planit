import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import styles from './LocationDetailStyles';
import { Modal, FlatList, Dimensions,Image } from 'react-native';
import { PlanitLocation, Address } from '../../../itinerary/models/location';



export default function LocationDetails(props) {
    const data: PlanitLocation = props.location;

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
                                style={{width: imgWidth, height: imgWidth/1.5, marginTop: 0}}
                                source={{uri: data.imageURL}}
                            />
                        </View>
                        <Text style={styles.eventHeader}>{data.Name}</Text>
                        <Text style={styles.criticalInfo}>
                            {"Pricing: $" + data.AvgPrice + "\nAverage Time Spent: " + data.AvgTimeSpent + "\nStart Time: " + data.StartTime + "\nEnd Time: " + data.EndTime }
                        </Text>

                        <Text style={styles.textHeader}>About:</Text>
                        <Text style={styles.textBody}>{data.Description}</Text>
                        
                        <Text style={styles.textHeader}>Contact information:</Text>
                        <Text style={styles.textBody}>Email:  + {data.ContactInfo.Email + "\n" + "Phone: " + data.ContactInfo.Phone}</Text>
                        <Text style={styles.textBody}>{`${data.Address.Number} ${data.Address.Street}, ${data.Address.City} ${data.Address.Province}, ${data.Address.Country}`}</Text>
                    </Content>
                    {/* <Content padder>
                        
                        <View style={styles.container}>
                            <Image
                                width={Dimensions.get('window').width}
                                source={{ uri: data.imageURL }} />
                        </View>

                        <Text>`${data.Name}`</Text>
                        <Text>Description:</Text>>
                        <Text>`${data.Description}`</Text>
                    
                        {data.Tags && data.Type && <Text />}
                        {data.Ratings && formRow("Average Rating: ", data.Ratings.AveRatings)}
                        {data.Ratings && <Text />}
                        {data.AvgPrice && formRow("Average Price:", "$" + data.AvgPrice)}
                        {data.AvgPrice && < Text />}
                        {data.StartTime && data.EndTime && formRow("Active From: ", data.StartTime.toLocaleString() + " :")}
                        {data.AvgTimeSpent && <Text style={[styles.h18, styles.Text]}>
                            {"\t\t" + data.EndTime.toLocaleString()}
                        </Text>}
                        {data.StartTime && data.EndTime && data.AvgTimeSpent && <Text />}
                        {data.Address && formRow("Address: ", data.Address.Number + " " + data.Address.Street + ", " + data.Address.City)}
                        {data.Address && <Text />}
                        {data.ContactInfo && formRow("Phone: ", data.ContactInfo.Phone)}
                        {data.ContactInfo && formRow("Email: ", data.ContactInfo.Email)}
                        {data.Type && formRow("Type of Activity: ", data.Type)}
                        {data.Tags && formRow("Tags: ", data.Tags.map((tag, index) => {
                            if ((index + 1) === data.Tags.length) {
                                return tag;
                            } else {
                                return tag + ", "
                            }
                        }, styles.h14))}
                    </Content> */}
                </Container>
            </View>
        </Modal>
    );

}