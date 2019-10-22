import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { setAccessToken } from '../redux/actions';
import firebase from 'firebase';
import SignUp from './SignUp';
import { Container, Text, Button, Content, Form, Header, Left, Body, Title, Subtitle, Spinner } from 'native-base';
import { View, TextInput, Alert, Image, ScrollView } from 'react-native';
import styles from './LoginStyles';

export default function Login(props){
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const dispatch = useDispatch(); // Connection to redux store

    /**Sign in a user with given email and password combo. */
    const signIn = () => {
        setLoading(true);

        // Try logging in via Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {

            setLoading(false);

            // Grab the access token before continuing
            res.user.getIdToken()
                .then(res => {
                    // Store access token in redux store
                    dispatch(setAccessToken(res));

                    // Go to main screen
                    props.navigation.navigate('App');
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

                <Content contentContainerStyle={styles.content} padder>


                <Form style={{width: '90%', flex: 1, justifyContent: 'center',}}>
                <Image source={require('../assets/earth.png')} style={styles.stretch}/>

                <View style={styles.loginIntro}>
                        <Text style={{fontSize: 40, color: '#FFFFFF'}}>Welcome Back,</Text>
                        <Text style={{fontSize: 20, color: '#FFFFFF'}}>Sign in to continue</Text>
                </View>
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


                        <Text onPress={() => Alert.alert('forgot password')}  style={styles.loginOuttro}>Forgot Password?</Text>



                        <Button disabled={loading} light full style={styles.button} onPress={() => signIn()}>
                            <Text style={{color:'#1977B5', fontSize: 20, marginTop: '14%'}}>Login</Text>
                            {loading && <Spinner style={{marginTop: '5%'}} color="blue"/>}
                        </Button>

                        <Text style={styles.signUp}>Need an account? <Text onPress={() => setModalOpen(true)} style={{color: 'white', textDecorationLine: 'underline'}}>Sign up</Text></Text>

                    </Form>
                </Content>

                {signUpModalOpen && <SignUp open={signUpModalOpen} setModal={setModalOpen}/>}
            </Container>
        </View>
    );
}