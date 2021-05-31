import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';

const SignInBlock = ({
  setUserEmail,
  password,
  setPassword,
  loading,
  signIn,
  navigation,
}) => (
  <>
    <View style={styles.screenNameContainer}>
      <Text style={styles.headText}>LOGIN</Text>
    </View>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.formContainer}
    >
      <View style={styles.formTitleContainer}>
        <Text style={styles.formTitle}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserEmail(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.gradientFinish} />
      ) : (
        <TouchableOpacity onPress={() => signIn()}>
          <LinearGradient
            style={styles.submitButton}
            colors={[Colors.gradientFinish, Colors.gradientStart]}
          >
            <Text style={styles.buttontTxt}>Sign in </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.footerTextLink, styles.footerText]}>
            Create account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </>

);

const styles = StyleSheet.create({
  screenNameContainer: {
    // position: 'absolute',
    // top: -50,
    marginLeft: '7%',
    height: 200,
  },
  headText: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 26,
  },
  formContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    bottom: 0,
    flexDirection: 'column',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingTop: '10%',
  },
  formTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontFamily: 'jost-500',
    color: '#000',
  },
  inputContainer: {
    paddingBottom: '5%',
  },
  inputLabel: {
    color: 'gray',
    paddingLeft: '5%',
    marginBottom: 2,
    fontSize: 12,
    fontFamily: 'jost-500',
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
  navRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submit: {
    color: 'white',
  },

  submitButton: {
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 20,

    backgroundColor: 'black',
    borderRadius: 25,
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
    marginTop: 20,
    marginBottom: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTextLink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    marginLeft: 10,
    fontFamily: 'jost-bold',
  },
  footerText: { fontFamily: 'jost-400', fontSize: 14 },
});

export default SignInBlock;
