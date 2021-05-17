import React, { Component } from 'react'
import {  Text, View, Image } from 'react-native'

const Maintenance = ({ onPress, children }) => {
  const { MaintenanceStyle, textStyle } = styles
  return (
    <View onPress={onPress} >
        <Text style={styles.textStyle}>System under Maintenance</Text>
       <Image
          style={{alignSelf: 'center', resizeMode: 'center', height: 400}}
          source={require('../../assets/images/dashboard/ms.jpg')}
        />
    </View>
  )
}

const EmptyData = ({ onPress, children }) => {
  const { MaintenanceStyle, textStyle } = styles
  return (
    <View onPress={onPress} >
        <Text style={styles.textStyles}>Data belum tersedia</Text>
       <Image
          style={{alignSelf: 'center', resizeMode: 'center', height: 400}}
        />
    </View>
  )
}

const styles = {
  textStyle: {
    fontSize: 25,
    paddingTop: 10,
    alignSelf: 'center',
    color: '#d9d9d9',
    fontWeight: '500',
    fontFamily: 'roboto'
  },
  textStyles: {
    fontSize: 25,
    paddingTop: 10,
    alignSelf: 'center',
    color: '#a6a6a6',
    fontWeight: '500',
    fontStyle: 'italic',
    fontFamily: 'roboto'
  },
}
export {Maintenance, EmptyData};
