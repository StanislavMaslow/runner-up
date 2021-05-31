import AsyncStorage from '@react-native-community/async-storage';

import ApiUtils from './api-utils';

const AuthApi = {
  signInCall(data) {
    const url = `${ApiUtils.getBaseUrl()}/login`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .then(async (parsed) => {
        await AsyncStorage.setItem('runnerUpToken', `${parsed.token}`);
        return parsed;
      })
      .catch((err) => {
        console.log('Error', err.message);
        // return null;
        throw new Error(err);
      });
  },
  signUpCall(data) {
    const url = `${ApiUtils.getBaseUrl()}/signup`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .then(async (parsed) => {
        console.log('----------parsed', parsed);
        return parsed;
      })
      .catch((err) => {
        console.log('Error on signUpCall', JSON.parse(err));
        // return err;
        throw new Error('Error on sign Up');
      });
  },
};

export default AuthApi;
