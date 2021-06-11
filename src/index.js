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
import EletricScreen from './components/DealingScreen/EletricScreen'
import PlnTokenScreen from './components/DealingScreen/PlnTokenScreen'
import GameScreen from './components/DealingScreen/GameScreen'
import EwalletScreen from './components/DealingScreen/EwalletScreen'
import PostPaidScreen from './components/DealingScreen/PostPaidScreen'

//activity folder
import TopUpScreen from './components/ActivityScreen/topup.screen'
import WithdrawTransfer from './components/ActivityScreen/transferWd.screen'
import CheckUpDownlineScreen from './components/ActivityScreen/checkup.downline.screen'
import RegDownlineScreen from './components/ActivityScreen/reg.downline.screen'
import SettingBonusScreen from './components/ActivityScreen/setting.bonus.screen'

// profiles
import AboutScreen from './components/AccountScreen/about.screen/'
import PolicyScreen from './components/AccountScreen/policy.screen/'
import LockScreen from './components/AccountScreen/lock.screen/'
import CheckingScreen from './components/SignSigupScreen/checking.screen'
import ForgotingScreen from './components/SignSigupScreen/forgoting.screen'

const StackScreen = createStackNavigator({
   sign: { screen: SignScreen },
   check: { screen: CheckingScreen},
   forgot: { screen: ForgotingScreen },

   main: { screen: BottomMenuScreen },
   eletric: { screen: EletricScreen },
   ppob: { screen: PostPaidScreen},
   ewallet: { screen: EwalletScreen },
   game: { screen: GameScreen },
   print: { screen: PrintReceipts },
   prices: { screen: PriceScreen },
   plnt: { screen: PlnTokenScreen },

   bonus: { screen: SettingBonusScreen },
   reg: { screen: RegDownlineScreen },
   checkup: { screen: CheckUpDownlineScreen },
   withdraw: { screen: WithdrawTransfer },
   topup: { screen: TopUpScreen},

   lock: { screen: LockScreen},
   about: { screen: AboutScreen },
   policy: { screen: PolicyScreen },

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
