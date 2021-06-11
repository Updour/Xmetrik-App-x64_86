'use strict';

import React, { Component } from 'react';

import { View, Text } from 'react-native';
import {
  Container, Header, TabHeading, Content, Tab, Tabs, Icon,
  Left, Button, Body
} from 'native-base';
import { Headerd, styles, Statusbar } from '../../helper'

import WithdrawBalance from './withdraw.balance.js'
import TransferBalance from './transfer.balance.js'

export default class WithdrawTransfer extends Component {
  render() {
    return (
     <Container>
       <Headerd onPress={() => this.props.navigation.navigate('main')}>
        <Text>Transfer & Tark Saldo</Text>
       </Headerd>
         <Tabs>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>Transfer Saldo</Text>
              </TabHeading>
            }>
              <TransferBalance {...this.props} />
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Tarik Saldo</Text>
              </TabHeading>
            }>
              <WithdrawBalance {...this.props} />
             </Tab>
        </Tabs>
    </Container>
    );
  }
}
