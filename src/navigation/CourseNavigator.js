/* eslint-disable global-require */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SelectSport from '../screens/SelectSportScreen/SelectSport';
import AddCourse from '../screens/CourseFormScreen/AddCourse';

const CourseStack = createStackNavigator();

const CourseStackScreen = () => (
  <CourseStack.Navigator
    initialRouteName="SelectSport"
    screenOptions={{
      tabBarVisible: true,
      headerShown: true,
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerTitleContainerStyle: {
        paddingTop: '15%', // 60px
        marginBottom: 50,
      },
      headerStyle: {
        backgroundColor: '#2A2A2A',
        shadowColor: 'transparent',
        shadowRadius: 0,
        elevation: 0,
        height: 100,
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'italic',
        lineHeight: 32,
        fontFamily: 'jost-500',
      },
    }}
  >
    <CourseStack.Screen
      name="SelectSport"
      component={SelectSport}
      options={{
        headerTransparent: true,
        headerStyle: { height: 80 },
        headerTitleStyle: {
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 32,
          paddingTop: 60,
          fontFamily: 'jost-bold-italic',
        },
        headerTitle: 'Select Sport',
      }}
    />
    <CourseStack.Screen
      name="AddCourse"
      component={AddCourse}
      options={{ headerShown: false }}
    />
  </CourseStack.Navigator>
);

export default CourseStackScreen;
