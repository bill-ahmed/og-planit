import React, { useState } from 'react';
import firebase from 'firebase';
import SignUp from './SignUp';
import { AsyncStorage } from 'react-native';
import { Container, Text, Button, Content, Form, Header, Left, Body, Title, Subtitle } from 'native-base';
import { StyleSheet, View, TextInput } from 'react-native';

export default function Login(props){
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
            setAccessToken().then(res => {
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

    /**Update username entered by user */
    const handleUsernameChange = (newEmail) => {
        setEmail(newEmail.nativeEvent.text);
    }

    /**Update password entered by user */
    const handlePasswordChange = (newPass) => {
        setPassword(newPass.nativeEvent.text);
    }

    /**Open or close the signup modal */
    const setModalOpen = (val: boolean) => {
        setSignUpModalOpen(val);
    }

    return(
        <View style={styles.container}>
            <Container>
                <Header noLeft>
                    <Left/>

                    <Body>
                        <Title>
                            Login
                        </Title>
                        <Subtitle>
                            Login below to continue, or make a new account.
                        </Subtitle>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.content} padder>
                    <View style={styles.loginIntro}>
                        <Text style={{fontSize: 40}}>Welcome to Planit!</Text>
                    </View>

                    <Form style={{width: '100%', flex: 1, justifyContent: 'center',}}>

                        <TextInput style={styles.textInput} 
                        keyboardType="email-address" 
                        value={email} 
                        onChange={text => handleUsernameChange(text)} 
                        placeholder="Email" />
                        
                        <TextInput style={styles.textInput} 
                        secureTextEntry={true} 
                        value={password} 
                        onChange={text => handlePasswordChange(text)} 
                        placeholder="Password" />

                        <Button disabled={loading} primary rounded full style={styles.button} onPress={() => signIn()}>
                            <Text>Login</Text>
                        </Button>

                        <Button disabled={loading} light rounded full style={styles.button} onPress={() => setModalOpen(true)}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Form>
                </Content>

                {signUpModalOpen && <SignUp open={signUpModalOpen} setModal={setModalOpen}/>}
            </Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        width: 200,
        marginTop: 30,
        alignSelf: 'center',
    },
    loginIntro: {
        marginTop: 100,
    },
    textInput: {
        borderWidth: 1, 
        borderRadius: 7,
        borderColor: "#BBC0C4", 
        padding: 5,
        margin: 10,
        marginTop: 10,
        marginBottom: 5,
    }
});