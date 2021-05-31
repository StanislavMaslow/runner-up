import { ToastAndroid, Platform, AlertIOS } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// TODO set error handling

const notifyMessage = (msg, details) => {
  const message = details ? details[0].message : msg;
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};

const ApiUtils = {
  checkStatus: async (response) => {
    if (response.error) {
      console.log('---- Error catch in api utils', response.error);
      // Alert.alert(response.error.message);
      if (response.error.statusCode === 401) {
        console.log('----Logout');
        await AsyncStorage.removeItem('runnerUpToken');
      }
      notifyMessage(response.error.message, response.error.details);
      throw new Error(response.error);
    } else {
      return response;
    }
  },

  getBaseUrl: () => 'https://runner-up-api.herokuapp.com',
};
export { ApiUtils as default };
