import React, {useEffect, useState} from 'react';
import { AppLoading, } from 'expo';
import { Text } from 'native-base';
import { StyleSheet, View, Button } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/Login';
import Home from './screens/Home';

const FIREBASE_CONFIG = require('./firebaseConfig.json');

function Main(props) {
  // Equivalent to this.state
  const [isReady, setReady] = useState(false);
  const { navigate } = props.navigation;  // Hanlde react-navigation to different screens

  // Equivalent to componentDidMount()
  useEffect(() => {
    // Load fonts asynchronously
    async function initFonts(){
      await Font.loadAsync({
        Roboto: require('./resources/Fonts/Roboto.ttf'),
        Roboto_medium: require('./resources/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      // Continue initialiazing the app
      setReady(true);

      // Initialize Firebase
      firebase.initializeApp(FIREBASE_CONFIG);
    }

    initFonts();

  });

  // If app is ready to be loaded
  if(isReady){
    
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title="Login Page" onPress={() => navigate('Auth')}/>
      </View>
    );
  } else{
    return (
      <View>
        <AppLoading/>
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null, // Remove all headers
    }
  },
  Auth: { 
    screen: Login,
    navigationOptions: {
      header: null, // Remove all headers
    }
   },
  });

const AuthStack = createStackNavigator({ 
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null,   // Remove all headers
    }
  } 
});

const App = createAppContainer(createSwitchNavigator({
  AuthLoading: Main,
  App: AppStack,
  Auth: AuthStack,
  },
  {
  initialRouteName: 'AuthLoading',
  }));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
