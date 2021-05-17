import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Header, Left, Button, Icon, Body } from 'native-base'

const Headerd = ({ onPress, children }) => {

  const { MaintenanceStyle, textStyle } = styles

  return (
    <View>
      <Header style={styles.headerStyles}>
          <Left>
            <Button transparent onPress={onPress}>
               <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
                <Text style={styles.txtHeader}>{children}</Text>
          </Body>
        </Header>
        <StatusBar
      backgroundColor="#4d94ff"
      barStyle="light-content"
    />
    </View>
  )
}

const styles = {
  headerStyles: {
    backgroundColor: '#66a3ff'
  },
  txtHeader: {
    fontSize: 16,
    color: '#fff'
  }
}
export {Headerd};
