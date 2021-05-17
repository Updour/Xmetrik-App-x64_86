'use strict';

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

// components
import BottomMenuScreen from './components'
import SignScreen from './components/SignSigupScreen/SignScreen'

// other screen
import PrintReceipts from './components/OtherScreen/PrintReceipt'
import PriceScreen from './components/OtherScreen/PriceScreen'

const StackScreen = createStackNavigator({
   sign: { screen: SignScreen },
   main: { screen: BottomMenuScreen },
   prices: { screen: PriceScreen },
   print: { screen: PrintReceipts },

}, {
    headerMode: 'none',
    transitionConfig
})

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        // outputRange: [-width, 0], if left
        outputRange: [width, 0], //if right
        extrapolate: 'clamp'
    });

      return {
        transform: [{ translateX }]
    }
    }
  }
}
export default createAppContainer(StackScreen)
