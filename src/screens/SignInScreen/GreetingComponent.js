import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GradientButton from '../../commons/Button';

const GreetingComponent = (props) => (

  <View style={styles.greetingBlock}>
    <View style={styles.greetingText}>
      <Text style={styles.baseText}>Challenge</Text>
      <Text style={styles.innerText}>YOURSELF</Text>
    </View>

    <View style={styles.greetingButton}>
      <GradientButton
        onPress={() => {
          props.unBoarding();
          props.setViewedOnBoarding(true);
        }}
        title="Start"
      />
    </View>
  </View>

);

const styles = StyleSheet.create({
  baseText: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'jost-300',
    textTransform: 'uppercase',

  },
  innerText: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'jost-500',
  },

  greetingButton: {
    // borderRadius: 25,
    // padding: 12
  },
  greetingText: {
    marginBottom: 87,
  },
  greetingBlock: {
    width: '100%',
    padding: 38,
    // borderWidth: 5,
    // borderColor: "red",
    marginBottom: 140,
  },
});

export default GreetingComponent;
