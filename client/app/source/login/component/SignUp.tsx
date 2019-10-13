import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label, Header, Left, Body, Right, Title, Spinner  } from 'native-base';
import { Modal, View } from 'react-native';
import styles from './SignUpStyles';

const ENDPOINT = 'http://100.82.203.156:4000';  // MUST BE YOUR IP ADDRESS ON LOCAL NETWORK!!

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

        fetch(`${ENDPOINT}/createUser`, options)
        .then(resp => resp.json())
        .then(resp => {
            alert("Succesfully signed up!You may login now.");
            props.setModal(false);
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
        <View style={styles.container}>
            <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="pageSheet" onRequestClose={() => alert("Modal closed")}>
                <Container>
                    {/* Header content */}
                    <Header>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button disabled={loading} transparent onPress={() => props.setModal(false)}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Make an Account</Title>
                        </Body>

                        <Right />
                    </Header>

                    {/* Main body content */}
                    <Content padder>
                        <Text>
                            Fill out below to get started. All fields with a (*) are required!
                        </Text>
                        <Form>
                            <Item floatingLabel style={styles.inputFields}>
                                <Label>First Name*</Label>
                                <Input value={userInfo.firstName} onChange={(text) => setUserInfo({...userInfo, firstName: text.nativeEvent.text})}/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Middle Name(s)</Label>
                                <Input value={userInfo.middleName} onChange={(text) => setUserInfo({...userInfo, middleName: text.nativeEvent.text})} placeholder=""/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Last Name*</Label>
                                <Input value={userInfo.lastName} onChange={(text) => setUserInfo({...userInfo, lastName: text.nativeEvent.text})}/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Email Address*</Label>
                                <Input keyboardType="email-address" value={userInfo.email} onChange={(text) => setUserInfo({...userInfo, email: text.nativeEvent.text})}/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Password*</Label>
                                <Input secureTextEntry={true} value={userInfo.password} onChange={(text) => setUserInfo({...userInfo, password: text.nativeEvent.text})}/>
                            </Item>

                            <Item floatingLabel last style={styles.inputFields}>
                                <Label>Confirm Password*</Label>
                                <Input secureTextEntry={true} value={userInfo.confirmPassword} onChange={(text) => setUserInfo({...userInfo, confirmPassword: text.nativeEvent.text})}/>
                            </Item>

                            <Button iconRight disabled={validateUserInfo() || loading} style={styles.button} onPress={() => sendSignUpInfo()}>
                                <Text>SignUp</Text>
                                {loading && <Spinner color="blue"/>}
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </Modal>
        </View>
    );
}
