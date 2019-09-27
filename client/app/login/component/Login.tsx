import React, { useState } from 'react';
import firebase from 'firebase';
import SignUp from './SignUp';
import { AsyncStorage } from 'react-native';
import { Container, Text, Button, Content, Form, Item, Input, Header, Left, Body, Title, Subtitle } from 'native-base';
import { View } from 'react-native';
import styles from './LoginStyles';

export default function Login(props) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    /**Sign in a user with given email and password combo. */
    const signIn = () => {
        setLoading(true);

        // Try logging in via Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {

                setLoading(false);

                /**Once user is successfully authenticated, store their access token via AsyncStorage */
                const setAccessToken = async () => {
                    // Store access token for this user in local storage, for future authentication
                    try {
                        await AsyncStorage.setItem('accessToken', await res.user.getIdToken());
                    } catch (error) {
                        console.log(error);
                    }
                }

                // Put access token in local storage
                setAccessToken().then(() => {
                    props.navigation.navigate('App');
                    alert("Logged in!");
                });

            })
            .catch(resp => {
                alert("Error trying to login. " + resp.message);
                setLoading(false);
            })
            .catch(res => {
                alert("Error loggin in. No additional info can be provided at the moment. Check console log for details.");
                console.log(res);
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Container>
                <Header noLeft>
                    <Left />

                    <Body>
                        <Title>
                            Login
                        </Title>
                        <Subtitle>
                            Login below to continue, or make a new account.
                        </Subtitle>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Input keyboardType="email-address" value={email} onChange={text => setEmail(text.nativeEvent.text)} placeholder="Email" />
                        </Item>

                        <Item floatingLabel>
                            <Input secureTextEntry={true} value={password} onChange={text => setPassword(text.nativeEvent.text)} placeholder="Password" />
                        </Item>

                        <Button disabled={loading} primary rounded full style={styles.button} onPress={() => signIn()}>
                            <Text>Login</Text>
                        </Button>

                        <Button disabled={loading} light rounded full style={styles.button} onPress={() => setSignUpModalOpen(true)}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Form>
                </Content>

                {signUpModalOpen && <SignUp open={signUpModalOpen} setModal={setSignUpModalOpen} />}
            </Container>
        </View>
    );
}