import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>

);

export default AuthStackScreen;
