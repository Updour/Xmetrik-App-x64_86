import React, { Component } from 'react'
import {  Text, TouchableOpacity } from 'react-native'

const Submit = ({ onPress, children }) => {

  const { SubmitStyle, textStyle } = styles

  return (
    <TouchableOpacity onPress={onPress} style={SubmitStyle}>
      <Text style={textStyle}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = {
  SubmitStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0000e6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6ffe6',
    marginLeft: 23,
    marginRight: 23,
    marginTop: 17,
    marginBottom: 8
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'roboto'
  },
}
export {Submit};
