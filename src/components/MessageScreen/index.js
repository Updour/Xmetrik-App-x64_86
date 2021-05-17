'use strict';

import React, { Component } from 'react';

import { View, Text } from 'react-native';
import {
  Container, Header, TabHeading, Content, Tab, Tabs, Icon, Left, Button, Body
} from 'native-base';
import { Headerd, styles, formatPrice } from '../../helper'

import InboxMessage from './inbox.message'
import OutboxMessage from './outbox.message'


export default class MessageScreen extends Component {
  render() {
    return (
     <Container>
       <Headerd onPress={() => this.props.navigation.navigate('Activity')}>
        <Text>Messages</Text>
       </Headerd>
         <Tabs>
           <Tab heading={
            <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Inbox</Text>
            </TabHeading>
            }>
          <OutboxMessage />
          </Tab>
          <Tab heading={
            <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Outbox</Text>
            </TabHeading>
          }>
          <InboxMessage />
          </Tab>
        </Tabs>
    </Container>
    );
  }
}

