import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label, Header, Left, Body, Right, Title, Spinner  } from 'native-base';
import { Modal, View, TextInput, Alert, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
import styles from './ResetPasswordStyles';

/**A dialog box to reset user's password */
export default function ResetPassword(props){
    /**Reference to auth object; allow resetting user's password */
    const auth = firebase.auth();

    // Keep track of user's email
    const [emailAddress, setEmailAddress] = useState("");

    const requestPasswordReset = () => {
        auth.sendPasswordResetEmail(emailAddress)
        .then(res => {
            Alert.alert("Successfully reset password. Note that it may take a couple minutes to recieve the reset email.");
            props.closeDialog();
        })
        .catch(err => {
            console.log(err);
            Alert.alert("Error resetting email. " + err);
        })
    }

    /**Update username entered by user */
    const handleEmailChange = (newEmail) => {
        setEmailAddress(newEmail.nativeEvent.text);
    }

    return(
        <Modal animationType="fade" transparent={true} visible={props.open} presentationStyle="fullScreen" onRequestClose={() => props.closeDialog()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{fontSize: 24, marginBottom: 20}}>Reset Password</Text>

                    <Text style={{fontSize: 16}}>
                        Enter your email below to reset your password.
                        A reset link will be sent to your email.
                    </Text>
                    
                    <TextInput style={styles.textInput} 
                        keyboardType="email-address" 
                        value={emailAddress} 
                        onChange={text => handleEmailChange(text)} 
                        placeholder="Email" />

                    <Button primary full transparent style={styles.button} onPress={() => requestPasswordReset()}>
                        <Text style={{color: "#1977B5", fontSize: 20}}>
                            Reset
                        </Text>
                    </Button>
                  

                    <Button light full transparent style={styles.button} onPress={() => props.closeDialog()}>
                        <Text style={{color:'rbg(0,0,0,0.75)', fontSize: 20}}>
                            Cancel
                        </Text>
                    </Button>
                    
                </View>
            </View>
        </Modal>
    );

}