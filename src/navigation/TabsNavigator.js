import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import CoursesNavigator from './CourseNavigator';
import BoardsScreen from '../screens/BoardsScreen';
import TracksScreen from '../screens/TracksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CourseDetails from '../screens/CourseDetailsScreen/CourseDetails';
import CourseForm from '../screens/CourseFormScreen/AddCourse';
/* eslint-disable global-require */
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
function TabBarIcon({ name, color }) {
  return (
    <Ionicons
      size={30}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  );
}

function CoursesStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarVisible: true,
        headerShown: true,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          tabBarVisible: true,

          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitle: 'Today',
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
          headerLeft: () => (
            <TouchableOpacity
              style={[styles.IconContainer, styles.LeftHeaderIcon]}
            >
              <Image source={require('../../assets/dots.png')} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={[styles.IconContainer, styles.RightHeaderIcon]}
            >
              <Image source={require('../../assets/search.png')} />
            </TouchableOpacity>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerShown: true,
          tabBarVisible: true,

          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitle: 'Details',
          headerTitleContainerStyle: {
            // marginBottom: 20,
            alignSelf: 'center',
          },
          headerStyle: {
            backgroundColor: '#2A2A2A',
            shadowColor: 'transparent',
            shadowRadius: 0,
            elevation: 0,
            height: 70,
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
      />
      <Stack.Screen
        name="EditCourse"
        component={CourseForm}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

const AppTabs = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: Colors.gradientStart,
      keyboardHidesTabBar: true,
      tabStyle: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginBottom: 15,
      },
      style: {
        backgroundTopColor: 'transparent',
        backgroundColor: 'white',
        position: 'absolute',
        flex: 1,
        height: 70,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        shadowColor: '#5bc4ff',
        shadowOpacity: 0,
        shadowOffset: {
          height: 2,
        },
        shadowRadius: 1,
        borderTopWidth: 0,
      },
    }}
  >
    <Tabs.Screen
      name="Home"
      component={CoursesStackScreen}
      options={{
        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
      }}
    />
    <Tabs.Screen
      name="Courses"
      component={CoursesNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="add-circle" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Boards"
      component={BoardsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="map-sharp" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Tracks"
      component={TracksScreen}
      options={{
        tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerTitle: 'Profile',
        tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
      }}
    />
  </Tabs.Navigator>
);

export default AppTabs;

const styles = StyleSheet.create({
  IconContainer: {
    height: 35,
    width: 35,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e3928',
    borderRadius: 12,
  },
  LeftHeaderIcon: {
    marginLeft: 30,
    marginTop: 10,
  },
  RightHeaderIcon: {
    marginRight: 30,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 32,
  },
});
