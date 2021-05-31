import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

export default StyleSheet.create({
  day: {
    margin: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'jost-500',
  },
  txtHeaderDate: {
    color: '#FF8E26',
    fontSize: 16,
    fontFamily: 'jost-400',
    marginHorizontal: 4,
  },
  weekdays: {
    margin: 10,
    color: '#1291FF',
    width: screenWidth / 7 - 8,
    textAlign: 'center',
    fontSize: 16,
  },
  warpDay: {
    width: screenWidth / 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrowIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#3f3f3f',
    borderRadius: 50,
    borderColor: '#636364',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
