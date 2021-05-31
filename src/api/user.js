import ApiUtils from './api-utils';

const UserApi = {
  getMeCall(token) {
    const url = `${ApiUtils.getBaseUrl()}/users/me`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(url, options)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .then((parsed) => parsed)
      .catch((err) => {
        console.log('Error on get me', err);
        return null;
      });
  },
};

export default UserApi;
