'use strict';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, Linking } from 'react-native'
import {
  Header, Left, Body, Title, Subtitle, Right,
} from 'native-base';

export default class AuthenticationHeader extends Component {
  render() {
    return (
      <Header span style={styles.headerStyles} >
        <Body>
          <Title style={styles.titleStyles} onPress={ ()=> Linking.openURL('https://xmetrik.biz') }>X-METRIK APP</Title>
          <Subtitle style={styles.subStyles}>www.xmetrik.biz</Subtitle>
        </Body>
        <StatusBar backgroundColor="#0000b3" barStyle="light-content" />
      </Header>
      );
  }
}

const styles = StyleSheet.create({
  headerStyles: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#0000e6'
  },
  titleStyles: {
    alignSelf: 'center',
    fontFamily: 'roboto',
    fontSize: 22,
    fontWeight: '500',
  },
  subStyles: {
    alignSelf: 'center',
    fontFamily: 'roboto',
    fontStyle: 'italic'
  }
});
