import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import AuthApi from '../../api/auth';
import validateEmail from '../../services/validators';

const windowHeight = Dimensions.get('window').height;

export default ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const signUp = async () => {
    if (!email || !validateEmail(email)) {
      Alert.alert('Invalid email!');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password should NOT be shorter than 8 characters!');
      return;
    }

    try {
      setLoading(true);
      await AuthApi.signUpCall({
        firstName,
        lastName,
        password,
        email,
        phone,
      });
      setLoading(false);
      Alert.alert('Successfully registered. Please sign in!');
      navigation.navigate('SignIn');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error during registration happened. Please try again!');
    }
  };

  const onPressBack = () => {
    navigation.navigate('SignIn');
  };

  const onPressSign = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: -100 })}
    >
      {/*  eslint-disable global-require  */}
      <ImageBackground
        source={require('../../../assets/background/signBackground.png')}
        style={styles.image}
      >
        {/*  eslint-enable global-require */}
        <View style={styles.header}>
          <View style={styles.navRow}>
            <TouchableOpacity
              onPress={onPressBack}
              style={styles.backIconContainer}
            >
              <Icon
                name="arrow-back"
                backgroundColor="#3b5998"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressSign}>
              <Text style={styles.submit}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.screenNameContainer}>
            <Text style={styles.headText}>Create Account</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <ScrollView
          style={styles.scrollableContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputBlock}>
            <Text style={styles.inputLable}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFirstName(text)}
              label="Fist Name"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLable}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLastName(text)}
              label="Last Name"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLable}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              label="Password"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLable}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              label="Email"
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.inputLable}>Phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhone(text)}
              label="Phone number"
            />
          </View>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.gradientFinish} />
          ) : (
            <TouchableOpacity onPress={signUp}>
              <LinearGradient
                style={styles.submitButton}
                colors={[Colors.gradientFinish, Colors.gradientStart]}
              >
                <Text style={styles.buttontTxt}>Sign Up </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Or create an account using social media
            </Text>
            <View style={styles.footerIconBlock}>
              {/*  eslint-disable global-require  */}

              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/facebook.png')}
              />
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/instagram.png')}
              />
              <Image
                style={styles.footerIcon}
                source={require('../../../assets/icons/google.png')}
              />
              {/*  eslint-enable global-require  */}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    position: 'relative',
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    height: '15%',
    marginTop: 60,
    width: '100%',
    zIndex: 1,
  },

  image: {
    resizeMode: 'contain',
    width: '100%',
    height: windowHeight + 50,
    marginTop: -40,
  },
  navRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backIconContainer: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    color: 'white',
    fontFamily: 'jost-500',
  },
  screenNameContainer: {
    marginLeft: '7%',
  },
  headText: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 26,

    fontFamily: 'jost-500',
  },
  scrollableContainer: {
    marginBottom: 40,
    paddingTop: 50,
  },
  formContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '80%',
    bottom: -40,
    paddingHorizontal: '10%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    flexDirection: 'column',
    zIndex: 2,
    alignSelf: 'flex-end',
  },
  inputBlock: {
    paddingBottom: '5%',
  },
  input: {
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    fontFamily: 'jost-500',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
  },
  inputLable: {
    color: 'gray',
    paddingLeft: '5%',
    marginBottom: 2,
    fontSize: 12,
    fontFamily: 'jost-500',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontTxt: {
    color: 'white',
    fontFamily: 'jost-500',
    textAlign: 'center',
    fontSize: 18,
  },
  footer: {
    width: '100%',
    marginTop: '15%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  footerText: {
    fontFamily: 'jost-400',
    fontSize: 14,
    textAlign: 'center',
  },
  footerIconBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 80,
  },
  footerIcon: {
    margin: 5,
    width: 50,
    height: 50,
  },
});
