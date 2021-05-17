'use strict';

import React, { Component } from 'react';

import { View, Text } from 'react-native';
import {
   Container, Content,
} from 'native-base';
import { Headerd, styles, Maintenance, formatPrice } from '../../helper'


export default class AccountScreen extends Component {
  render() {
    return (
       <Container>
        <Headerd onPress={() => this.props.navigation.navigate('Report')}>
       <Text>Profiles</Text>
       </Headerd>
        <Content>
          <Maintenance />
        </Content>
      </Container>
    );
  }
}

