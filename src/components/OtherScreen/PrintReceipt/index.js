'use strict';

import React, { Component } from 'react';

import { View, Text } from 'react-native';
import {
  Container, Header, TabHeading, Content, Tab, Tabs, Icon,
  Left, Button, Body
} from 'native-base';
import { Headerd, styles, Statusbar } from '../../../helper'

import PostPaid from './postpaid.print'
import PreePaid from './preepaid.print'

export default class PrintReceipts extends Component {
  render() {
    return (
     <Container>
       <Headerd onPress={() => this.props.navigation.navigate('main')}>
        <Text>Cetak Struk PLN</Text>
       </Headerd>
         <Tabs>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>Ppob</Text>
              </TabHeading>
            }>
              <PostPaid />
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Non Ppob</Text>
              </TabHeading>
            }>
              <PreePaid />
             </Tab>
        </Tabs>
    </Container>
    );
  }
}
