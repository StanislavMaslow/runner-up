import { Platform } from 'react-native';

export function isIOS() {
  return Platform.OS === 'ios';
}
export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
