import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label } from 'native-base';
import { Modal, View } from 'react-native';

const ENDPOINT = 'http://127.0.0.1:4000';

export default function SignUp(props){

    /**Handle signing up a user */
    const sendSignUpInfo = () => {
        let options = {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: "somemail@something.com",
                password: "mypassword123",
                firstName: "john",
                middleName: "",
                lastName: "Doe",
                age: "",
                phoneNumber: "+14165550000",
                photoURl: 'http://www.example.com/12345678/photo.png'
            })
        }

        fetch(`${ENDPOINT}/createUser`, options)
        .then(resp => resp.json())
        .then(console.log)
        .catch(res => {
            alert("Error ocurred during fetch");
            console.log(res)});
    }

    return(
        <View style={styles.container}>
            <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="pageSheet" onRequestClose={() => alert("Modal closed")}>
                <Container>
                    <Content padder>
                        <Text>
                            Fill out below to get started. All fields with a (*) are required!
                        </Text>
                        <Form>
                            <Item floatingLabel style={styles.inputFields}>
                                <Label>First Name*</Label>
                                <Input/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Middle Name(s)</Label>
                                <Input placeholder=""/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Last Name*</Label>
                                <Input placeholder=""/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Phone Number</Label>
                                <Input keyboardType="phone-pad" placeholder=""/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Email Address*</Label>
                                <Input keyboardType="email-address" placeholder=""/>
                            </Item>

                            <Item floatingLabel style={styles.inputFields}>
                                <Label>Password*</Label>
                                <Input secureTextEntry={true} placeholder=""/>
                            </Item>

                            <Item floatingLabel last style={styles.inputFields}>
                                <Label>Confirm Password*</Label>
                                <Input secureTextEntry={true} placeholder=""/>
                            </Item>

                            <Button style={styles.button} onPress={() => props.setModal(false)}>
                                <Text>SignUp</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            
            </Modal>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    button: {
        margin: 10,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputFields: {
        marginTop: 15,
    }
};