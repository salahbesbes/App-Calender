/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import RootNavigation from './src/RootNavigation';
import AppStateProvider from './stateProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeProvider } from 'react-native-elements';
const App = () => {
  return (
    <AppStateProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </AppStateProvider>
  );
};

export default App;
