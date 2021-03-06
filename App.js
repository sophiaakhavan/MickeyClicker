import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
import {createUser} from './src/graphql/mutations.js';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();



const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App)
