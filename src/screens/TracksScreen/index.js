import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/Colors';

export default () => (
  <View style={styles.container}>
    <Text style={styles.h4} category="h4">
      tracks
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h4: {
    marginTop: 80,
    color: Colors.light.tint,
  },
});
