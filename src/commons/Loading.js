import { StyleSheet, ImageBackground, Dimensions } from 'react-native';
import React from 'react';

// import Colors from '../constants/Colors';

// import { AuthContext } from '../../navigation/index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
/* eslint-disable global-require */

const LoadingScreen = () => (
  <ImageBackground
    source={require('../../assets/background/signBackground.png')}
    style={styles.backgroundContainer}
  >
    {/* <ActivityIndicator size="small" color={'#fff'} /> */}
  </ImageBackground>
);
/* eslint-enable global-require */

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: -50,
    height: windowHeight + 80,
    width: windowWidth,
  },
});
