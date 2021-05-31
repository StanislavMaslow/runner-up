/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AuthApi from '../../api/auth';
import Colors from '../../constants/Colors';
import validateEmail from '../../services/validators';
import GreetingComponent from './GreetingComponent';
import SignInBlock from './SignInBlock';
import { useAppContext } from '../../providers/AppProvider';

// import { AuthContext } from '../../navigation/index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default ({ navigation }) => {
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserTokenAction } = useAppContext();

  // const { signIn: signInAction } = React.useContext(AuthContext);

  // New User Logic
  const [viewedOnBoarding, setViewedOnBoarding] = useState(false);
  const [secLoading, setSecLoading] = useState(true);

  const unBoarding = async () => {
    try {
      await AsyncStorage.setItem('@viewedOnBoarding', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnBoarding');

      if (value !== null) {
        setViewedOnBoarding(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSecLoading(false);
    }
  };

  const removeCheckOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnBoarding');
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    Keyboard.dismiss();
    if (!validateEmail(email)) {
      Alert.alert('Invalid email!');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password should NOT be shorter than 8 characters!');
      return;
    }
    try {
      setLoading(true);

      const resp = await AuthApi.signInCall({
        password,
        email,
      });
      setLoading(false);
      setUserTokenAction(resp.token);
    } catch (error) {
      setLoading(false);
      // Alert.alert('Error during login happened. Please try again!');
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={Platform.select({ ios: -100 })}
    >
      {/*  eslint-disable global-require  */}
      <ImageBackground
        source={require('../../../assets/background/signBackground.png')}
        style={styles.backgroundContainer}
      >
        {/*  eslint-enable global-require */}
        {/*! currentUserIsNew */}
        {secLoading ? (
          <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color={Colors.gradientFinish} />
          </View>
        ) : viewedOnBoarding ? (
          <SignInBlock
            email={email}
            setUserEmail={setUserEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            setLoading={setLoading}
            signIn={signIn}
            removeCheckOnBoarding={removeCheckOnBoarding}
            navigation={navigation}
          />
        ) : (
          <GreetingComponent
            setViewedOnBoarding={setViewedOnBoarding}
            unBoarding={unBoarding}
          />
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    marginTop: -23,
    height: windowHeight + 50,
    width: windowWidth,
  },
  activityLoader: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});
