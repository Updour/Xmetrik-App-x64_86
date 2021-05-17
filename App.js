/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Button, NativeModules } from 'react-native'
// import MainMenuBottomScreen from './apps/components/TabBottomScreen'
// import StackRouterScreen from './apps/components/StackRouterScreen'
/*<StackRouterScreen />*/
import StackScreen from './src'

const App = () => {
  return (
    <StackScreen />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
export default App;
