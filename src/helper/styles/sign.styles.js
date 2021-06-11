'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const sign = StyleSheet.create({
  formStyles: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
  },
  cardStyles: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    borderRadius: 20,
  },
  itemStyles:{
    borderColor: 'red',
    marginRight: 12,
    marginLeft: 20,
  },
  inputStyles:{
    marginLeft: 20,
    fontFamily: 'roboto'
  },
  iconInaFocus: {
    marginLeft: 12,
    color: 'red'
  },
  iconFocus: {
    marginLeft: 12,
    color: '#8c8c8c'
  },
  iconLabel: {
   marginLeft: 12,
   color: 'red'
  },
  labelFocus: {
    fontFamily: 'roboto',
    color: '#333333'
  },
  labelInaFocus: {
    fontFamily: 'roboto',
    color: 'blue'
  },
  switchStyles: {
    alignSelf:'flex-start',
    marginTop: 13,
    marginLeft: 13
  },
  textSwitchStyles: {
    fontFamily: 'roboto',
    color: '#2c2d2e',
    marginLeft: 62,
    top: -20,
  }

});


export {sign};
