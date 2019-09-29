import React, { useEffect, useState } from 'react';
import { AppLoading, } from 'expo';
import { Text } from 'native-base';
import { StyleSheet, View, Button } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import styles from './AppStyles'

// Components for Redux and persisting the state
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

/*React navigation */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { AppStack, AuthStack } from './utils/navigationStacks';

/*Configure redux store */
import createReduxStore from './redux/configureStore';

/**Firebase config file; allows authentication, querying firestore, etc. */
const FIREBASE_CONFIG = require('./firebaseConfig.json');

const [STORE, PERSISTOR] = createReduxStore();

/**Main page after initialization */
function Main(props) {
  // Equivalent to this.state
  const [isReady, setReady] = useState(false);
  const { navigate } = props.navigation;  // Hanlde react-navigation to different screens

  // Equivalent to componentDidMount()
  useEffect(() => {
    // Load fonts asynchronously
    async function initFonts() {
      await Font.loadAsync({
        Roboto: require('./resources/Fonts/Roboto.ttf'),
        Roboto_medium: require('./resources/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
        .then((res) => {

          // Initialize Firebase, if it hasn't been already
          if(!isReady){
            firebase.initializeApp(FIREBASE_CONFIG);
          }

          // Continue initialiazing the app
          setReady(true);

        });
    }

    initFonts();

  });

  // If app is ready to be loaded
  if (isReady) {

    return (
      <View style={styles.container}>
        <Button title="Login Page" onPress={() => navigate('Auth')} />
      </View>
    );
  } else {
    return (
      <View>
        <AppLoading />
      </View>
    );
  }
}

/**Initialize the app */
export default function App(props){
  return(
    <Provider store={STORE}>
      <PersistGate loading={null} persistor={PERSISTOR}>
        <Root/>
      </PersistGate>
    </Provider>
  );
}

// Combine landing page with Appstack and Authstack
const Root = createAppContainer(createSwitchNavigator({
  AuthLoading: Main,
  App: AppStack,
  Auth: AuthStack,
  }, {
  initialRouteName: 'AuthLoading',
}));

