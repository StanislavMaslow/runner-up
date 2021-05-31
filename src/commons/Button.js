import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const GradientButton = ({
  onPress, width, height = 50, title, iconName, iconColor, borderRadius = 40,
  alignSelf, fontSize = 20, fontStyle, fontWeight,
  colors = [Colors.gradientFinish, Colors.gradientStart],
}) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles(width, height, borderRadius, alignSelf,
          fontSize, fontStyle, fontWeight).inputButton}
        colors={colors}
      >
        <View>
          <Text style={styles(width, height, borderRadius,
            alignSelf, fontSize, fontStyle, fontWeight).textStyle}
          >
            {title}
          </Text>
          {iconName
            ? (
              <Ionicons
                size={24}
                style={styles.iconStyle}
                name={iconName}
                color={iconColor}
              />
            )
            : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const styles = (width, height, borderRadius,
  alignSelf, fontSize, fontStyle, fontWeight) => StyleSheet.create({
  inputButton: {
    width,
    height,
    borderRadius,
    alignSelf,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textStyle: {
    fontSize,
    fontStyle,
    fontWeight,
    color: 'white',
    fontFamily: 'jost-500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2.2,
  },
});

export default GradientButton;
