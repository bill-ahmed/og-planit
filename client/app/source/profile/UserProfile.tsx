import React, { useState } from 'react';
import { Text, View, Thumbnail, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import styles from './UserProfileStyles';
import * as firebase from 'firebase';

export default function UserProfile(props){
    const {navigate} = props.navigation;    // Handle navigations

    // All user data
    const userInfo = firebase.auth().currentUser;
    const name = userInfo.displayName;
    const email = userInfo.email;
    const uid = userInfo.uid

    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            // Navigate to start of application
            navigate('Auth');
        })
        .catch(err => {
            alert("Error logging out. Check console for details");
            console.log(err);
        });
    }

    return(
        <View style={styles.container}>
            <Thumbnail circular large source={require('./assets/user.png')}/>
            <Text style={styles.textHeader}> {name} </Text>
            <Text style={styles.textBody}> {email} </Text>
            <Text style={styles.textBody}> {uid} </Text>

            <Button style={styles.button} danger onPress={() => logout()}>
                <Text>Logout</Text>
            </Button>
        </View>
    );
}