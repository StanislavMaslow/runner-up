import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import LoadingScreen from '../commons/Loading';

import { navigationRef } from '../services/navigation';
import ErrorBoundary from '../errorBoundary/index';
import AppTabs from './TabsNavigator';
import AuthStackScreen from './AuthNavigator';

/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { useAppContext } from '../providers/AppProvider';

export default function Navigation({ colorScheme }) {
  const { store } = useAppContext();
  // const { user } = store;
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState('');

  const bootstrapAsync = async () => {
    setLoading(true);

    try {
      const userToken = await AsyncStorage.getItem('runnerUpToken');
      setToken(userToken);
      setLoading(false);
    } catch (err) {
      throw new Error('-bootstrapAsync failed');
    }
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate
    bootstrapAsync();
  }, [store.userToken]);
  if (loading) {
    <LoadingScreen />;
  }
  return (
    <ErrorBoundary>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        ref={navigationRef}
      >
        {!token ? <AuthStackScreen /> : <AppTabs />}
        {/* {store.userToken == null && !token ? <AuthStackScreen /> : <AppTabs />} */}
      </NavigationContainer>
    </ErrorBoundary>
  );
}
