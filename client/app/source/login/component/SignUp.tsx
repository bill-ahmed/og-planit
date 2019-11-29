import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label, Header, Left, Body, Right, Title, Spinner  } from 'native-base';
import { Modal, View, TextInput, Alert, Image, ScrollView } from 'react-native';
import globalVariables from '../../../../global';   // Store info such as address for back-end
import styles from './SignUpStyles';


export default function SignUp(props){
    // Store user info such as email, password, full name, etc.
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: null,
        photoURL: '',
    });

    // Determine if loading should be trigerred
    const [loading, setLoading] = useState(false);

    /**Handle signing up a user */
    const sendSignUpInfo = () => {
        // Trigger loading
        setLoading(true);

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: userInfo.email,
                password: userInfo.password,
                firstName: userInfo.firstName,
                middleName: userInfo.middleName,
                lastName: userInfo.lastName,
                age: userInfo.age,
                photoURl: 'http://www.example.com/12345678/photo.png'
            })
        }

        fetch(`${globalVariables.ENDPOINT}createUser`, options)
        .then(resp => {
            if(resp.ok){
                alert("Succesfully signed up!You may login now.");
                props.setModal(false);
            } else {
                alert("Error ocurred while creating your account. Please make sure all inputted data is correct.");
                setLoading(false);
            }
        })
        .catch(res => {
            alert("Error ocurred during fetch. Check console log.");
            console.log(res)});
    }

    /**Validate data entered in user info, such as password matching */
    const validateUserInfo = () => {
        if (userInfo.password === userInfo.confirmPassword || userInfo.password === '' || userInfo.confirmPassword === '') {
            return false;
        }
        return true;
    }

    return(
        
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.setModal(false)}>
            <View style={styles.container}>
                <Container>
                    {/* Header content */}
                    <Header noShadow style={styles.header}>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button disabled={loading} transparent onPress={() => props.setModal(false)}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Sign up</Title>
                        </Body>

                        <Right />
                    </Header>

                    {/* Main body content */}
                    <Content style={styles.content} padder>
                        <Text style={{color: 'white'}}>
                            Fill out below to get started. All fields with a (*) are required!
                        </Text>
                        <Form style={{width: '90%', flex: 1, justifyContent: 'center', alignSelf:'center'}}>
                        <View>

                        <TextInput style={styles.textInput} 
                        value={userInfo.firstName} 
                        onChange={(text) => setUserInfo({...userInfo, firstName: text.nativeEvent.text})}
                        placeholder="First Name*" />


                        <TextInput style={styles.textInput} 
                        value={userInfo.middleName} 
                        onChange={(text) => setUserInfo({...userInfo, middleName: text.nativeEvent.text})}
                        placeholder="Middle Name(s)" />


                        <TextInput style={styles.textInput} 
                        value={userInfo.lastName} 
                        onChange={(text) => setUserInfo({...userInfo, lastName: text.nativeEvent.text})}
                        placeholder="Last Name*" />
                        

                        <TextInput style={styles.textInput}
                        keyboardType="email-address" 
                        value={userInfo.email} 
                        onChange={(text) => setUserInfo({...userInfo, email: text.nativeEvent.text})}
                        placeholder="Email Address*" />

                        <TextInput style={styles.textInput} secureTextEntry={true}
                        value={userInfo.password} 
                        onChange={(text) => setUserInfo({...userInfo, password: text.nativeEvent.text})}
                        placeholder="Password*" />

                        <TextInput style={styles.textInput} secureTextEntry={true}
                        value={userInfo.confirmPassword} 
                        onChange={(text) => setUserInfo({...userInfo, confirmPassword: text.nativeEvent.text})}
                        placeholder="Confirm Password*" />

                        <Button iconRight disabled={validateUserInfo() || loading} style={styles.button} onPress={() => sendSignUpInfo()}>
                            <Text style={{color: '#1977B5'}}>SignUp</Text>
                            {loading && <Spinner color="blue"/>}
                        </Button>

                        </View>
                        </Form>
                    </Content>
                </Container>
            </View>
        </Modal>
        
    );
}
