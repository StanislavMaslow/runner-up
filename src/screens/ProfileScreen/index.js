import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import Constants from 'expo-constants';
// import { AuthContext } from '../../navigation/index';
import { useAppContext } from '../../providers/AppProvider';
import Colors from '../../constants/Colors';

const { version } = Constants.manifest;

const windowHeight = Dimensions.get('window').height;
const ProfileScreen = ({ navigation }) => {
  // const { signOut } = React.useContext(AuthContext);
  const { setUserTokenAction } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  const onPressBack = () => {
    navigation.navigate('Home');
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('runnerUpToken');
    setUserTokenAction('');
  };

  const getAsyncProfile = async () => {
    try {
      setLoading(true);
      const name = await AsyncStorage.getItem('fullName');
      setUserName(name);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAsyncProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative' }}>
        <View style={styles.whiteDecorItem} />
        <View style={styles.grayDecorItem} />
        <TouchableOpacity
          onPress={() => onPressBack()}
          style={styles.iconWrapperContainer}
        >
          <View style={styles.iconWrapperRow}>
            <View style={styles.iconWrapperDots} />
            <View style={styles.iconWrapperDots} />
          </View>
          <View style={styles.iconWrapperRow}>
            <View style={styles.iconWrapperDots} />
            <View style={styles.iconWrapperDots} />
          </View>
        </TouchableOpacity>
        <View style={styles.userDataContainer}>
          {loading && (
            <View style={styles.loadingScreen}>
              <ActivityIndicator size="small" color={Colors.gradientFinish} />
            </View>
          )}
          <View style={styles.userData}>
            {/*  eslint-disable global-require  */}
            <Image
              style={styles.userDataIcon}
              source={require('../../../assets/icons/avatar.png')}
            />
            {/* eslint-disable global-require  */}
            <Text style={styles.userIconText}>{userName}</Text>
          </View>
          <ScrollView style={styles.userNavContainer}>
            <Text style={styles.userText}>My Traking</Text>
            <Text style={styles.userText}>Edit Profile</Text>
            <Text style={styles.userText}>Settings</Text>
            <TouchableOpacity style={styles.logout} onPress={() => logOut()}>
              <Text style={styles.logoutText}>Logout</Text>
              <View>
                <Ionicons
                  style={styles.logoutIcon}
                  name="log-out-outline"
                  size={22}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <Text style={styles.versionCode}>{`v.${version}`}</Text>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    backgroundColor: '#1D1918',
    position: 'relative',
  },
  iconWrapperContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#4A4746',
    marginLeft: 15,
    marginTop: 70,
    marginBottom: 30,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperDots: {
    width: 4,
    height: 4,
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  whiteDecorItem: {
    width: '80%',
    height: '70%',
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 2,
    transform: [{ rotate: '-11.64deg' }],
    left: '99%',
    top: '1%',
  },
  grayDecorItem: {
    width: '80%',
    height: '120%',
    borderTopLeftRadius: 35,
    backgroundColor: '#4A4746',
    position: 'absolute',
    zIndex: 1,
    transform: [{ rotate: '-11.64deg' }],
    left: '106%',
    top: '5%',
  },
  userDataContainer: {
    width: '60%',
    height: '68%',
    marginLeft: 55,
  },
  userData: {
    marginBottom: 60,
  },
  userDataIcon: {
    width: 89,
    height: 89,
    paddingBottom: 20,
    borderColor: 'white',
    borderRadius: 45,
    borderWidth: 5,
  },
  userIconText: {
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'jost-500',
    marginTop: 20,
    fontSize: 24,
  },
  userNavContainer: {
    width: 166,
    minHeight: 300,
    // height: windowHeight,
    // flex: 1,
  },
  userText: {
    color: 'white',
    fontSize: 19,
    lineHeight: 32,
    fontFamily: 'jost-400',
    paddingVertical: '4%',
  },
  logoutText: {
    color: 'white',
    fontSize: 19,
    lineHeight: 32,
    fontFamily: 'jost-400',
  },
  versionCode: {
    position: 'absolute',
    color: 'white',
    bottom: '15%',
    alignSelf: 'center',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '60%',
  },
  logoutIcon: {
    marginLeft: 15,
  },
});
