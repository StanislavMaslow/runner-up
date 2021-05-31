import React, { useReducer } from 'react';
import createCtx from '../services/createCtx';

const [useCtx, Provider] = createCtx();

const initialState = {
  userToken: null,
  user: {
    username: '',
    email: '',
    id: '',
  },
  course: {
    creatorId: '',
    creatorName: '',
    title: '',
    desc: '',
    startTime: '',
    startPoint: '',
    endPoint: '',
    price: '',
    duration: '',
    distance: '',
    distanceMetricSystem: '',
    rating: 0,
    eventType: '',
    startCoordinates: {},
    finishCoordinates: {},
    waypoints: '',
  },
  courses: [],
};

const setUserTokenAction = (dispatch) => (userToken) => {
  dispatch({
    type: 'set-token',
    payload: { userToken },
  });
};

const getMeAction = (dispatch) => (user) => {
  dispatch({
    type: 'get-me',
    payload: { user },
  });
};

const setUserAction = (dispatch) => (user) => {
  dispatch({
    type: 'set-user',
    payload: { user },
  });
};

const setCoursesAction = (dispatch) => (courses) => {
  // const arr = courses.data;

  // arr.map((notification) => {
  //   if (!notification.read) {
  //     unread++;
  //   }
  // });

  dispatch({
    type: 'set-courses',
    payload: { courses },
  });
};

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'set-token':
      return { ...store, userToken: action.payload.userToken };
    case 'set-user':
      return { ...store, user: action.payload.user };
    case 'get-me':
      return { ...store, user: action.payload.user };
    case 'set-courses':
      return { ...store, courses: action.payload.courses };

    default:
      return store;
  }
};

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setUserTokenAction: setUserTokenAction(dispatch),
    getMeAction: getMeAction(dispatch),
    setUserAction: setUserAction(dispatch),
    setCoursesAction: setCoursesAction(dispatch),
  };

  return <Provider value={{ store, ...actions }}>{children}</Provider>;
}

export { useCtx as useAppContext, AppProvider };
