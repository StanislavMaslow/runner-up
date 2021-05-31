import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import AllProviders from './src/providers';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <AllProviders>
        <Navigation />
        <StatusBar
          animated
          // backgroundColor="transparent"
          barStyle="light-content"
          showHideTransition="slide"
          hidden={false}
        />
      </AllProviders>
    </SafeAreaProvider>
  );
}
