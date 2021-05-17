import React from 'react'

import { Card, Text } from 'native-base'
import { ScrollView, RefreshControl } from 'react-native'

const RefreshScreen = ({ children, refreshing, onRefresh, style }) => {
  let { contentStyles } = styles;
  return (
    <ScrollView
      style={style}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={["red", "green", "blue", "yellow"]}
        />
    }>
    {children}
    </ScrollView>
    )
}
let styles = {
  contentStyles: {
    backgroundColor: '#eff1f4',
  },
}
export { RefreshScreen }
