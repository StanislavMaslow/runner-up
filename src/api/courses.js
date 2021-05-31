import ApiUtils from './api-utils';

const CoursesApi = {
  getAll(token) {
    const url = `${ApiUtils.getBaseUrl()}/courses`;
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
      .then(async (parsed) => parsed)
      .catch((err) => {
        console.log('Error', err);
        return null;
      });
  },
  getCourseById(token, id) {
    const url = `${ApiUtils.getBaseUrl()}/courses/${id}`;
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
      .then(async (parsed) => parsed)
      .catch((err) => {
        console.log('Error', err);
        return null;
      });
  },
  async createCourse(data, token, navigation) {
    const url = `${ApiUtils.getBaseUrl()}/courses`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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
        navigation.navigate('Home');
        return parsed;
      })
      .catch((err) => {
        console.log('Error on  add course', err);
        return null;
      });
  },

  async deleteCourse(token, navigation, id) {
    const url = `${ApiUtils.getBaseUrl()}/courses/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(url, options)
      .then(async (response) => ApiUtils.checkStatus(response))
      .then(async (parsed) => {
        navigation.navigate('Home');
        return parsed;
      })
      .catch((err) => {
        console.log('Error', err);
        return null;
      });
  },
  async editCourse(data, token, navigation, id) {
    const url = `${ApiUtils.getBaseUrl()}/courses/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then(async (response) => ApiUtils.checkStatus(response))
      .then(async (parsed) => {
        navigation.navigate('Home');
        return parsed;
      })
      .catch((err) => {
        console.log('Error', err);
        return null;
      });
  },
  async getCoursesResults(token) {
    const url = `${ApiUtils.getBaseUrl()}/results`;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(url, option)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .then(async (parsed) => parsed)
      .catch((err) => {
        console.log('Getting courses results Error', err);
      });
  },
  async getCoursesResultsWeekly(token, period) {
    const url = `${ApiUtils.getBaseUrl()}/results?period={${period}}}`;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(url, option)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .then(async (parsed) => parsed)
      .catch((err) => {
        console.log('Getting courses results Error', err);
      });
  },
  async getCoursesResultsAllTime(token, period) {
    const url = `${ApiUtils.getBaseUrl()}/results?period=${period}`;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(url, option)
      .then(async (response) => {
        let parsed = null;
        parsed = await response.json();
        return ApiUtils.checkStatus(parsed);
      })
      .catch((err) => {
        console.log('Getting courses results Error', err);
      });
  },

};

export default CoursesApi;
