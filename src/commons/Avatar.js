import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Avatar = ({ size = 'small', src }) => (
  <View>
    <Image source={src} style={size === 'medium' ? styles.medium : styles.small} />
  </View>
);

const styles = StyleSheet.create({
  small: {
    height: 46,
    width: 46,

  },
  medium: {
    height: 54,
    width: 54,
  },
});

export default Avatar;
