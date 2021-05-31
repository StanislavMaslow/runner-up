import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();
        /*  eslint-disable global-require  */
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'jost-500': require('../../assets/fonts/Jost-Medium.ttf'),
          'jost-300': require('../../assets/fonts/Jost-Light.ttf'),
          'jost-400': require('../../assets/fonts/Jost-Regular.ttf'),
          'jost-bold': require('../../assets/fonts/Jost-Bold.ttf'),
          'jost-bold-italic': require('../../assets/fonts/Jost-BoldItalic.ttf'),
        });
        /*  eslint-enable global-require  */
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
