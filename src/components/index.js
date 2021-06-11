import React from 'react'
import { View } from 'react-native'
import { Badge, Text } from 'native-base'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// component
import DashboardScreen from './DashboardScreen'
import ActivityScreen from './ActivityScreen'
import MessageScreen from './MessageScreen'
import ReportScreen from './ReportScreen'
import AccountScreen from './AccountScreen'

const BottomMenuScreen = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Dashboard'
    })
  },
  Activity: {
    screen: ActivityScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Activities'
    })
  },
  Inbox: {
    screen: MessageScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Messages'
    })
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Reports'
    })
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Profiles'
    })
  }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      let { badgeStyles, iconStyles } = styles;
      if (routeName === 'Dashboard') {
        iconName = `ios-home`;
      } else if (routeName === 'Activity') {
        iconName = `ios-clock`;
      } else if (routeName === 'Inbox') {
        iconName = `ios-mail`;
        } else if (routeName === 'Report') {
          iconName = `ios-stats`;
        } else if (routeName ==='Account') {
          iconName = `ios-contact`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />

        ;
      },
    }),
        swipeEnabled: false,
        tabBarOptions: {
          activeTintColor: '#FF0000',
          inactiveTintColor: '#A1A3A2',
          swipeEnabled: true,
          labelStyle: {
            fontFamily: 'roboto'
          },
        },

      },

      )
  let styles = {
    badgeStyles: {
      scaleX: 0.7,
      scaleY: 0.7,
      position: 'relative',
      top: -15,
      right: -11
    },
    iconStyles: {
      position: 'absolute',
      alignContent: 'center',
      marginLeft: 3
    }
  }
  export default createAppContainer(BottomMenuScreen);
