'use strict';

import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';


import _ from 'lodash'
import { ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { shome, styles } from '../../../helper'

const RecentInbox = ({item, onPress}) => {
  let { txtBold, txtNote, btnBuy, btnTxt } = styles;
  let { in_starttime, in_message } = item;
  let splMessage = _.split(in_message, '.', 3)////
  let rplMessage = _.replace(splMessage, splMessage.slice(-1)[0], 'xxxx')
  let isMessage = _.split(rplMessage, ',', 3).join('.')
  return (
    <View style={shome.crdStyle}>
      <ListItem icon>
        <Left>
          <Button rounded style={{ backgroundColor: "#ff471a" }}>
            <Icon active name="pulse" />
          </Button>
        </Left>
        <Body>
          <Text style={txtBold}>{isMessage}</Text>
          <Text style={txtNote}>{in_starttime}</Text>
        </Body>
        <Right>
          <TouchableOpacity style={btnBuy} onPress={onPress}>
            <Text style={btnTxt}>Beli</Text>
          </TouchableOpacity>
        </Right>
      </ListItem>
    </View>
    )
}

export { RecentInbox }
