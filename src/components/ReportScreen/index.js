'use strict';

import React, { Component } from 'react';

import { Text } from 'react-native';
import { Container, TabHeading, Tab, Tabs,ScrollableTab } from 'native-base';
import { Headerd, styles } from '../../helper'

import TransactionToday from './transaction.today'
import TransactionDaily from './transaction.daily'
import MutationToday from './mutation.today'
import MutationDaily from './mutation.daily'

export default class ReportScreen extends Component {
  render() {
    return (
       <Container>
         <Headerd onPress={() => this.props.navigation.navigate('Inbox')}>
       <Text>Reports Transaction</Text>
       </Headerd>
        <Tabs renderTabBar={()=> <ScrollableTab style={styles.headerStyles} />}>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>transaksi Hari ini</Text>
              </TabHeading>
            }>
              <TransactionToday />
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>transaksi Bulan ini</Text>
              </TabHeading>
            }>
              <TransactionDaily />
             </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Mutasi Hari ini</Text>
              </TabHeading>
            }>
              <MutationToday />
             </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Mutasi Bulan ini</Text>
              </TabHeading>
            }>
              <MutationDaily />
             </Tab>
        </Tabs>
      </Container>
    );
  }
}

