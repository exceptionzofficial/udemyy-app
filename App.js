/**
 * Genii Books - Educational Materials App
 * For 10th, 11th, 12th & NEET Students
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SubscriptionProvider } from './src/context/SubscriptionContext';
import Navigation from './src/navigator/Navigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SubscriptionProvider>
          <StatusBar barStyle="light-content" backgroundColor="#16A085" translucent />
          <Navigation />
        </SubscriptionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
